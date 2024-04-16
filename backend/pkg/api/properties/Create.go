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

	db := database.Database.DB

	result, err := db.ExecContext(c, `
			INSERT INTO properties (
				agent_id,
				property_type,
				listing_type,
				img,
				status,
				name,
				location,
				description,
				bedroom,
				bathroom,
				living_area,
				land_area,
				construction_area,
				price,
				created_at,
				updated_at
			)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,	
		newProperty.AgentID,	
		newProperty.PropertyType,
		newProperty.ListingType,
		newProperty.Img,
		newProperty.Status,
		newProperty.Name,
		newProperty.Location,
		newProperty.Description,
		newProperty.Bedroom,
		newProperty.Bathroom,
		newProperty.LivingArea,
		newProperty.LandArea,
		newProperty.ConstructionArea,
		newProperty.Price,		
		time.Now(),
		time.Now())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	id, _ := result.LastInsertId()
	newProperty.ID = int(id)

	c.JSON(http.StatusOK, gin.H{"data": newProperty})
}
