package properties

import (
	"net/http"
	"strings"
	"time"

	"github.com/mmanjoura/niya-estates/backend/pkg/common"
	"github.com/mmanjoura/niya-estates/backend/pkg/database"
	"github.com/mmanjoura/niya-estates/backend/pkg/models"

	"github.com/gin-gonic/gin"
)

func UpdateByID(c *gin.Context) {
	var updatedProperty models.Property
	db := database.Database.DB

	id := strings.ToUpper(c.Query("id"))
	propertyType := strings.ToUpper(c.Query("property_type"))

	_, err := common.GetPropertyTypeId(propertyType)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = db.ExecContext(c, `DELETE FROM properties WHERE id = ?`, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error while deleting properties": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&updatedProperty); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = db.ExecContext(c, `
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
				parking_lots
				construction_area,
				land_area,				
				description,
				created_at,
				updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		updatedProperty.AgentID,
		updatedProperty.Title,
		updatedProperty.Address,
		updatedProperty.City,
		updatedProperty.PropertyType,
		updatedProperty.ListingType,
		updatedProperty.Price,
		updatedProperty.LivingArea,
		updatedProperty.Bedroom,
		updatedProperty.Bathroom,
		updatedProperty.ParkingLots,
		updatedProperty.ConstructionArea,
		updatedProperty.LandArea,
		updatedProperty.Description,
		time.Now(),
		time.Now())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error while updating itinerary": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Tour updated successfully"})
}
