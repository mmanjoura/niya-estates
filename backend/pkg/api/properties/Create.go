package properties

import (
	"net/http"
	"time"

	"github.com/mmanjoura/niya-estates/backend/pkg/database"
	"github.com/mmanjoura/niya-estates/backend/pkg/models"

	"github.com/gin-gonic/gin"
	"fmt"
)


func Create(c *gin.Context) {
	var newProperty models.Property

	if err := c.ShouldBindJSON(&newProperty); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	propertyAmenities := newProperty.Amenities
	fmt.Println(propertyAmenities)

	db := database.Database.DB

	result, err := db.ExecContext(c, `
			INSERT INTO properties (
				agent_id,
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
				description,
				youtube_video,
				status,
				created_at,
				updated_at
			)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,	
		newProperty.AgentID,	
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
		newProperty.Description,
		newProperty.YoutubeVideo,
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
