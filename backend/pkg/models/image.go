package models

import (
	"time"
)

type Image struct {
	ID         int         `json:"id"`
	PropertyID int         `json:"property_id"`
	ImageSizeID int         `json:"image_size_id"`
	Location string 		`json:"location"`
	Image      string      `json:"image"`
	CreatedAt  time.Time   `json:"created_at"`
	UpdatedAt  time.Time   `json:"updated_at"`
}

type ImageSize struct {
	ID       int    `json:"id"`
	Location string `json:"location"`
	Width    int    `json:"width"`
	Height   int    `json:"height"`
}
