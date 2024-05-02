package properties

import (
	"net/http"
	"time"

	"github.com/mmanjoura/niya-estates/backend/pkg/database"
	"github.com/mmanjoura/niya-estates/backend/pkg/models"

	"github.com/gin-gonic/gin"

)


func Create(c *gin.Context) {
	var newProperty models.Property

	if err := c.ShouldBindJSON(&newProperty); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	propertyAmenities := newProperty.Amenities

	//Get listing type given listype id
	var listingType string
	err := database.Database.DB.QueryRow("SELECT name FROM listingTypes WHERE id = ?", newProperty.ListingType).Scan(&listingType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	newProperty.ListingType = listingType

	// Get property type given property type id
	var propertyType string
	err = database.Database.DB.QueryRow("SELECT name FROM propertyTypes WHERE id = ?", newProperty.PropertyType).Scan(&propertyType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	newProperty.PropertyType = propertyType
	


	db := database.Database.DB

	result, err := db.ExecContext(c, `
			INSERT INTO properties (
				user_id,
				title,
				address,
				city,				
				property_type,
				listing_type,
				price,
				living_area,
				bedroom,
				bathroom,
				parking_lots,
				construction_area,
				land_area,	
				year_built,			
				short_description,
				long_description,
				youtube_video,
				google_map,
				status,
				created_at,
				updated_at
			)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,	
		newProperty.UserID,	
		newProperty.Title,
		newProperty.Address,
		newProperty.City,
		newProperty.PropertyType,
		newProperty.ListingType,
		newProperty.Price,
		newProperty.LivingArea,
		newProperty.Bedroom,
		newProperty.Bathroom,
		newProperty.ParkingLots,
		newProperty.ConstructionArea,
		newProperty.LandArea,
		newProperty.YearBuilt,
		newProperty.ShortDescription,
		newProperty.LongDescription,
		newProperty.YoutubeVideo,
		newProperty.GoogleMap,
		newProperty.Status,
			
		time.Now(),
		time.Now())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	id, err := result.LastInsertId()
	newProperty.ID = int(id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	amenity, err := db.ExecContext(c, `
			INSERT INTO amenities ( property_id,
									garden,
									pool,
									jacuzzi,
									video_surveillance,
									alarm_system,
									elevator,
									playground,
									tennis_court,
									golf_course,
									doorman,
									internet,
									television,
									gym,
									furnished,
									heater,
									air_conditioning
			)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,	
		id,
		propertyAmenities.Garden,
		propertyAmenities.Pool,
		propertyAmenities.Jacuzzi,
		propertyAmenities.VideoSurveillance,
		propertyAmenities.AlarmSystem,
		propertyAmenities.Elevator,
		propertyAmenities.Playground,
		propertyAmenities.TennisCourt,
		propertyAmenities.GolfCourse,
		propertyAmenities.Doorman,
		propertyAmenities.Internet,
		propertyAmenities.Television,
		propertyAmenities.Gym,
		propertyAmenities.Furnished,
		propertyAmenities.Heater,
		propertyAmenities.AirConditioning,
	)
		if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
		}
		id, _ = amenity.LastInsertId()
		newProperty.Amenities.Id = int(id)

		if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
		}

	c.JSON(http.StatusOK, gin.H{"data": newProperty})
}
