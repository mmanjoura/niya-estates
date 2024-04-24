package properties

import (
	"net/http"
	"strconv"

	"github.com/mmanjoura/niya-estates/backend/pkg/database"

	"github.com/gin-gonic/gin"
)

func DeleteByID(c *gin.Context) {
	propertyId, err := strconv.Atoi(c.Param("id"))
	db := database.Database.DB

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid property ID"})
		return
	}

	_, err = db.ExecContext(c, `DELETE FROM properties WHERE ID = ?`, propertyId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error while deleting Faq": err.Error()})
		return
	}
	_, err = db.ExecContext(c, `DELETE FROM amenities WHERE property_id = ?`, propertyId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error while deleting Faq": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "properties deleted successfully"})
}
