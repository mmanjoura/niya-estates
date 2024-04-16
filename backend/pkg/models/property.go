package models

import "time"

type Property struct {
	ID               int       `json:"id"`
	AgentID          string    `json:"agent_id"`
	PropertyType     string    `json:"property_type"`
	ListingType      string    `json:"listing_type"`
	Img              string    `json:"img"`
	Status           string    `json:"status"`
	Name             string    `json:"name"`
	Location         string    `json:"location"`
	Description      string    `json:"description"`
	Bedroom          string    `json:"bedroom"`
	Bathroom         string    `json:"bathroom"`
	LivingArea       string    `json:"living_area"`
	LandArea         string    `json:"land_area"`
	ConstructionArea string    `json:"construction_area"`
	Price            string    `json:"price"`
	Amenities        Amenities `json:"amenities"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

type Amenities struct {
	ID                int  `json:"id"`
	Garden            bool `json:"garden"`
	Internet          bool `json:"internet"`
	Pool              bool `json:"pool"`
	Jacuzzi           bool `json:"jacuzzi"`
	VideoSurveillance bool `json:"video_surveillance"`
	Cinema            bool `json:"cinema"`
	LaundryRoom       bool `json:"laundry_room"`
}

type PropertyImage struct {
	ID         int    `json:"id"`
	PropertyID int    `json:"property_id"`
	Img        string `json:"img"`
}
