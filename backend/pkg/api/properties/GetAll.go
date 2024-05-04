package properties

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/mmanjoura/niya-estates/backend/pkg/api/images"
	"github.com/mmanjoura/niya-estates/backend/pkg/common"
	"github.com/mmanjoura/niya-estates/backend/pkg/database"
	"github.com/mmanjoura/niya-estates/backend/pkg/models"

	"github.com/gin-gonic/gin"
)

func GetAll(c *gin.Context) {
	db := database.Database.DB
	
	offset ,limit  := common.GetPaginationParams(c)
	properties, err := RetrieveProperties(c, db, limit, offset)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error while retreiving properties": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": properties})
}

func RetrieveProperties(c *gin.Context, db *sql.DB, limit, offset int) ([]models.Property, error) {

	properties := []models.Property{}

	rows, err := db.QueryContext(c, `SELECT properties.id,
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
	properties.parking_lots,
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
	FROM Properties inner join users on properties.user_id = users.id
	
	ORDER BY properties.id DESC `+
		database.FormatLimitOffset(limit, offset))

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		property, err := scanProperty(rows)

		// we now need to ge the amenities
		amenities, err := RetrieveAmenities(c, db, property.ID)
		property.Amenities = amenities

		// we now need to get the images
		images, err := images.RetrieveImages(c, db, property.ID)
		property.Images = images



	

		if err != nil {
			return nil, err
		}

		if property.ID != 0 {

			properties = append(properties, property)
		}
	}
	defer rows.Close()

	return properties, nil
}

func scanProperty(rows *sql.Rows) (models.Property, error) {
	property := models.Property{}

	err := rows.Scan(&property.ID,
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
		&property.YoutubeVideo ,
		&property.GoogleMap,
		&property.Status,
		&property.AvatarURL,
		(*time.Time)(&property.CreatedAt),
		(*time.Time)(&property.UpdatedAt),
	)

	return property, err
}

func RetrieveAmenities(c *gin.Context, db *sql.DB, propertyId int) (models.Amenities, error) {
	
	amenities := models.Amenities{}

	rows, err := db.QueryContext(c, `SELECT id,
		property_id,
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
		FROM amenities WHERE property_id = $1`, propertyId)

	if err != nil {
		return amenities, err
	}

	for rows.Next() {
		err := rows.Scan(&amenities.Id,
			&amenities.PropertyID,
			&amenities.Garden,
			&amenities.Pool,
			&amenities.Jacuzzi,
			&amenities.VideoSurveillance,
			&amenities.AlarmSystem,
			&amenities.Elevator,
			&amenities.Playground,
			&amenities.TennisCourt,
			&amenities.GolfCourse,
			&amenities.Doorman,
			&amenities.Internet,
			&amenities.Television,
			&amenities.Gym,
			&amenities.Furnished,
			&amenities.Heater,
			&amenities.AirConditioning,
		)

		if err != nil {
			return amenities, err
		}
	}
	defer rows.Close()

	return amenities, nil
}

