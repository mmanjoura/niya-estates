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
			year_built,
			short_description,
			long_description,
			youtube_video,
			google_map,
			status,
			created_at,
			updated_at
	FROM Properties WHERE ID = ?`, propertyID).
		Scan(&property.ID,
			&property.AgentID,
			&property.Title,
			&property.Address,
			&property.City,
			&property.PropertyType,
			&property.ListingType,
			&property.Price,
			&property.LivingArea,
			&property.Bedroom,
			&property.Bathroom,
			&property.ParkingLots,
			&property.ConstructionArea,
			&property.LandArea,
			&property.YearBuilt,
			&property.ShortDescription,
			&property.LongDescription,
			&property.YoutubeVideo,
			&property.GoogleMap,
			&property.Status,
			&property.CreatedAt,
			&property.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error while getting property": "property not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": property})
}
