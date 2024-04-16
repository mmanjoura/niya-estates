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
			updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		updatedProperty.AgentID,
		updatedProperty.PropertyType,
		updatedProperty.ListingType,
		updatedProperty.Img,
		updatedProperty.Status,
		updatedProperty.Name,
		updatedProperty.Location,
		updatedProperty.Description,
		updatedProperty.Bedroom,
		updatedProperty.Bathroom,
		updatedProperty.LivingArea,
		updatedProperty.LandArea,
		updatedProperty.ConstructionArea,
		updatedProperty.Price,
		time.Now(),
		time.Now())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error while updating itinerary": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Tour updated successfully"})
}
