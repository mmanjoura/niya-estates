package properties

import (
	"net/http"
	"strconv"

	"github.com/mmanjoura/niya-estates/backend/pkg/database"
	"github.com/mmanjoura/niya-estates/backend/pkg/models"

	"github.com/gin-gonic/gin"
)

func GetByID(c *gin.Context) {
	propertyID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid property ID"})
		return
	}

	db := database.Database.DB

	var property models.Property
	err = db.QueryRowContext(c, `SELECT id,
			agent_id,
			property_type,
			img,
			status,
			name,
			location,
			description,
			bedroom,
			bathroom,
			area,
			money,
			created_at,
			updated_at
	FROM Properties WHERE ID = ?`, propertyID).
		Scan(&property.ID,
			&property.AgentID,
			&property.PropertyType,
			&property.Img,
			&property.Status,
			&property.Name,
			&property.Location,
			&property.Description,
			&property.Bedroom,
			&property.Bathroom,
			&property.Area,			
			&property.Price,
			&property.CreatedAt,
			&property.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error while getting property": "property not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": property})
}
