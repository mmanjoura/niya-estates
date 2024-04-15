package models

import "time"

type Property struct {
	ID          int       `json:"id"`
	AgentID     int       `json:"agent_id"`
	PropertyType string    `json:"property_type"`
	Img         string    `json:"img"`
	Status      string    `json:"status"`
	Name        string    `json:"name"`
	Location    string    `json:"location"`
	Description string    `json:"description"`
	Bedroom     string    `json:"bedroom"`
	Bathroom    string    `json:"bathroom"`
	Area        string    `json:"area"`
	Price       string    `json:"price"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type PropertyFeature struct {
	ID         int    `json:"id"`
	PropertyID int    `json:"property_id"`
	Feature    string `json:"feature"`
}

type PropertyImage struct {
	ID         int    `json:"id"`
	PropertyID int    `json:"property_id"`
	Img        string `json:"img"`
}
