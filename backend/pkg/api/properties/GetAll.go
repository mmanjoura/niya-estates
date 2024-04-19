package properties

import (
	"database/sql"
	"net/http"
	"time"

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

	rows, err := db.QueryContext(c, `SELECT id,
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
	updated_at,
	COUNT(*) OVER()
	FROM Properties   ORDER BY id DESC `+
		database.FormatLimitOffset(limit, offset))

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		property, err := scanProperty(rows)

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
	var n int

	err := rows.Scan(&property.ID,
		&property.AgentID,
		&property.PropertyType,
		&property.ListingType,
		&property.Img,
		&property.Status,
		&property.Name,
		&property.Location,
		&property.Description,
		&property.Bedroom,
		&property.Bathroom,
		&property.LivingArea,
		&property.LandArea,
		&property.ConstructionArea,
		&property.Price,
		(*time.Time)(&property.CreatedAt),
		(*time.Time)(&property.UpdatedAt),
		&n,
	)

	return property, err
}
