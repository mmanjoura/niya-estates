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


func Create(c *gin.Context) {
	var newProperty models.Property

	if err := c.ShouldBindJSON(&newProperty); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	property_type := strings.ToUpper(c.Query("PropertyType"))

	if property_type == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Property Type required"})
		return

	}

	_, err := common.GetPropertyTypeId(property_type)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := database.Database.DB

	result, err := db.ExecContext(c, `
			INSERT INTO properties (
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
			)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,	
		newProperty.AgentID,	
		newProperty.PropertyType,
		newProperty.Img,
		newProperty.Status,
		newProperty.Name,
		newProperty.Location,
		newProperty.Description,
		newProperty.Bedroom,
		newProperty.Bathroom,
		newProperty.Area,
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
