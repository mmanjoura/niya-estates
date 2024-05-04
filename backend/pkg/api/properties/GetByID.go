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
	err = db.QueryRowContext(c, `SELECT properties.id,
	properties.user_id,
	properties.title,
	properties.address,
	properties.city,				
	properties.property_type,
	properties.listing_type,
	properties.price,
	properties.living_area,
	properties.bedroom,
	properties.bathroom,
	properties.parking_lots
	properties.construction_area,
	properties.land_area,				
	properties.year_built,
	properties.short_description,
	properties.long_description,
	properties.youtube_video,
	properties.google_map,
	properties.status,
	users.avatar_url,
	properties.created_at,
	properties.updated_at
	FROM Properties INNER JOIN users ON properties.user_id = users.id
	WHERE properties.ID = ?`, propertyID).
		Scan(&property.ID,
			&property.UserID,
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
			&property.AvatarURL,
			&property.CreatedAt,
			&property.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error while getting property": "property not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": property})
}
