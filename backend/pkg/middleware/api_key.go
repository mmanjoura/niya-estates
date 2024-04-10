package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mmanjoura/niya-estates/backend/pkg/database"
)

func APIKeyAuth() gin.HandlerFunc {

	return func(c *gin.Context) {

		config := database.Database.Config
		apiKey := c.GetHeader("X-API-Key")
		if apiKey == config["JWT-API-KEY"] {

			c.Next()
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			c.Abort()
		}
	}
}
