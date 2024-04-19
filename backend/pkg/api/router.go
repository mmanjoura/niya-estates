package api

import (
	"time"


	"github.com/mmanjoura/niya-estates/backend/pkg/api/storage"
	"github.com/mmanjoura/niya-estates/backend/pkg/api/properties"
	"github.com/mmanjoura/niya-estates/backend/pkg/api/users"
	"github.com/mmanjoura/niya-estates/backend/pkg/api/database"

	"github.com/mmanjoura/niya-estates/backend/pkg/auth"
	"github.com/mmanjoura/niya-estates/backend/pkg/middleware"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

// InitRouter initializes the routes for the API
func InitRouter() *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(middleware.Cors())
	r.Use(middleware.RateLimiter(rate.Every(1*time.Minute), 600)) // 60 requests per minute

	v1 := r.Group("/api/v1")
	{
		// Google Cloud Storage
		v1.POST("/uploadImage", storage.UploadImagesHandler)
		
		// Auth routes
		v1.POST("/auth/login",  auth.LoginHandler)
		v1.POST("/auth/register", auth.RegisterHandler)
		v1.POST("/auth/logout", auth.Logout)
		v1.GET("/auth/account", users.Account)

		// Properties routes
		v1.GET("/properties", properties.GetAll)
		v1.POST("/properties", properties.Create)

		// Download database
		v1.GET("/dumpdb", func(c *gin.Context) {
			database.BackUp(c)
		})


	}


	return r
}
