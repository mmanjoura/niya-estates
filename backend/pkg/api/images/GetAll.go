package images

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/mmanjoura/niya-estates/backend/pkg/models"

	"github.com/gin-gonic/gin"
)

// GetAll 			godoc

func GetAll(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{"data": nil})
}

func RetrieveImages(c *gin.Context, db *sql.DB, propertyId int) ([]models.Image, error) {

	Images := []models.Image{}

	rows, err := db.QueryContext(c, `SELECT ID,
			property_id,
			image_size_id,
			image,
			Created_At,
			Updated_At,
			COUNT(*) OVER()
			FROM images WHERE property_id = $1 ORDER BY ID DESC `, propertyId)
		


	if err != nil {
		return nil, err
	}

	for rows.Next() {
		image, err := scanImages(rows)

		if err != nil {
			return nil, err
		}

		// we need Image Sizes now
		location , err := RetrieveImageLocation(c, db, image.ImageSizeID)
		if err != nil {
			return nil, err
		}
		image.Location = location
		

		if image.ID != 0 {

			Images = append(Images, image)
		}
	}
	defer rows.Close()

	return Images, nil
}


func scanImages(rows *sql.Rows) (models.Image, error) {
	image := models.Image{}
	var n int

	err := rows.Scan(&image.ID,
		&image.PropertyID,
		&image.ImageSizeID,
		&image.Image,
		(*time.Time)(&image.CreatedAt),
		(*time.Time)(&image.UpdatedAt),
		&n,
	)

	return image, err
}

func RetrieveImageLocation(c *gin.Context, db *sql.DB, imageSizeId int) (string, error) {

	var location string
	err := db.QueryRowContext(c, `SELECT location FROM imageSizes WHERE ID = $1`, imageSizeId).Scan(&location)

	if err != nil {
		return "", err
	}
	return location, nil

}

