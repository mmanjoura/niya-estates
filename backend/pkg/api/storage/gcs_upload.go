package storage

import (
	"context"
	"database/sql"
	"fmt"
	"image"
	"io"
	"net/http"
	"strconv"
	"strings"

	"cloud.google.com/go/storage"
	"github.com/disintegration/imaging"
	"github.com/gin-gonic/gin"
	"github.com/mmanjoura/niya-estates/backend/pkg/common"
	"github.com/mmanjoura/niya-estates/backend/pkg/database"
	models "github.com/mmanjoura/niya-estates/backend/pkg/models"
)

// Constants for configuration keys
const (
	googleBucketNameKey = "GOOGLE-BUCKET-NAME"
	googleProjectIDKey  = "GOOGLE-PROJECT-ID"
)

// UploadImagesHandler handles image uploads.
func UploadImagesHandler(c *gin.Context) {
	// Retrieve configuration information from the database
	config := database.Database.Config
	bucketName := config[googleBucketNameKey]
	projectID := config[googleProjectIDKey]
	db := database.Database.DB

	propertyID, err := strconv.Atoi(c.Query("propertyId"))
	fullName := c.Query("fullName")
	if err != nil || propertyID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or missing ID"})
		return
	}

	// Replace spaces with underscores
	fullName = strings.ReplaceAll(fullName, " ", "_")
	propertyIDStr := strconv.Itoa(propertyID)

	// Parse multipart form for file uploads
	if err := c.Request.ParseMultipartForm(500000); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx := context.Background()

	// Create a new Cloud Storage client
	client, err := storage.NewClient(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create Cloud Storage client"})
		return
	}
	defer client.Close()

	// Create a handle for the Cloud Storage bucket
	bucket := client.Bucket(bucketName)

	// Check if the bucket exists, create it if not
	if _, err := bucket.Attrs(ctx); err != nil {
		if err == storage.ErrBucketNotExist {
			if err := bucket.Create(ctx, projectID, nil); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create bucket"})
				return
			}
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get bucket"})
			return
		}
	}

	// Retrieve uploaded files from the request
	files := c.Request.MultipartForm.File["files"]
	if len(files) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No files were uploaded"})
		return
	}

	// Process each uploaded file
	for _, file := range files {
		// Check if we already big image for this product
		bigImageExist, _ := checkBigImageExist(db, propertyID)

		// Convert the multipart file into io.Reader
		fileReader, err := common.FileHeaderToReader(file)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Decode the multipart file into an image
		img, _, err := image.Decode(fileReader)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Get the sizes of the images to be created
		imageSizes := getImageSizes(db)
		if imageSizes == nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get image sizes"})
			return
		}

		// Iterate over the image sizes and create a new image for each size
		for _, imageSize := range imageSizes {

			// If the big image already exists, skip the big image continue with the rest
			if imageSize.ID == 10 && bigImageExist {
				continue
			}

			// Resize the image to the specified size
			resizedImage, err := ImageResize(img, imageSize.Width, imageSize.Height)

			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			filePath := fullName + "/W" + strconv.Itoa(imageSize.Width) + "H" + strconv.Itoa(imageSize.Height) + "_" + imageSize.Location + "_" + propertyIDStr + "_" + file.Filename

			// Create a new object in the bucket
			obj := bucket.Object(filePath)

			imgReader, err := common.ImageToReader(resizedImage)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			if err := uploadFileToStorage(ctx, obj, imgReader); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			img := fmt.Sprintf("https://storage.googleapis.com/%s/%s", bucketName, filePath)

			// finally insert the image into the database
			if err := insertImage(db, propertyID, imageSize.ID, img); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

		}
	}
}

// Create a private member that returns a slice of ImageSizes
func getImageSizes(db *sql.DB) []models.ImageSize {

	// Query the database for all image sizes
	rows, err := db.Query("SELECT * FROM imageSizes")
	if err != nil {
		fmt.Println("Error querying the database: ", err)
		return nil
	}
	defer rows.Close()

	imageSizes := []models.ImageSize{}
	for rows.Next() {
		var imageSize models.ImageSize
		if err := rows.Scan(&imageSize.ID, &imageSize.Location, &imageSize.Width, &imageSize.Height); err != nil {
			fmt.Println("Error scanning the database: ", err)
			return nil
		}
		imageSizes = append(imageSizes, imageSize)
	}

	// Create a slice of ImageSizes
	return imageSizes
}

func ImageResize(img image.Image, width, height int) (image.Image, error) {

	// find the current size of the image
	bounds := img.Bounds()
	imgWidth := bounds.Dx()
	imgHeight := bounds.Dy()

	if imgWidth <= 800 || imgHeight <= 600 {
		return nil, fmt.Errorf("Invalid size: %dx%d", imgWidth, imgHeight, "The size should be between 800 and 600")
	}

	croppedImage := imaging.CropAnchor(img, 800, 600, imaging.Center)
	img = imaging.Resize(croppedImage, width, height, imaging.Lanczos)

	return img, nil
}

func uploadFileToStorage(ctx context.Context, obj *storage.ObjectHandle, img io.Reader) error {
	w := obj.NewWriter(ctx)

	// Convert img into io.reader

	if _, err := io.Copy(w, img); err != nil {
		return fmt.Errorf("Failed to upload file: %w", err)
	}

	if err := w.Close(); err != nil {
		return fmt.Errorf("Failed to close writer: %w", err)
	}

	return nil
}

// Insert the new image into the database
func insertImage(db *sql.DB, propertyID, imageSizeID int, image string) error {
	_, err := db.Exec("INSERT INTO images (property_id, image_size_id, image) VALUES ($1, $2, $3)", propertyID, imageSizeID, image)
	if err != nil {
		return err
	}
	return nil
}

// Check if the big image already exists in image table
func checkBigImageExist(db *sql.DB, propertyID int) (bool, error) {
	var bigImage string
	err := db.QueryRow("SELECT image FROM images WHERE property_id = $1 AND image_size_id = 10", propertyID).Scan(&bigImage)
	if err != nil {
		return false, err
	}
	return true, nil
}
