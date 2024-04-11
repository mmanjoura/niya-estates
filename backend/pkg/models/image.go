package models

import (
	"time"
)

type Image struct {
	ID         int       `json:"id"`
	PageName string       `json:"page_name"`
	ImageSize string       `json:"image_size"`
	Image        string    `json:"image"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

