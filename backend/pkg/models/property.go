package models

import "time"

type Property struct {
	ID               int       `json:"id"`
	AgentID          string    `json:"agent_id"`
	Title            string    `json:"title"`
	Address          string    `json:"address"`
	City             string    `json:"city"`
	PropertyType     string    `json:"property_type"`
	ListingType      string    `json:"listing_type"`
	Price            string    `json:"price"`
	LivingArea       string    `json:"living_area"`
	Bedroom          string    `json:"bedroom"`
	Bathroom         string    `json:"bathroom"`
	ParkingLots      string    `json:"parking_lots"`
	ConstructionArea string    `json:"construction_area"`
	LandArea         string    `json:"land_area"`
	Description      string    `json:"description"`
	Amenities        Amenities `json:"amenities"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

type Amenities struct {	
	Id				int  `json:"id"`
	PropertyID       int  `json:"property_id"`
	Garden            bool `json:"garden"`	
	Pool              bool `json:"pool"`
	Jacuzzi           bool `json:"jacuzzi"`
	VideoSurveillance bool `json:"video_surveillance"`
	AlarmSystem       bool `json:"alarm_system"`	
	Elevator          bool `json:"elevator"`
	Playground        bool `json:"playground"`
	TennisCourt       bool `json:"tennis_court"`
	GolfCourse        bool `json:"golf_course"`
	Doorman           bool `json:"doorman"`
	Internet          bool `json:"internet"`
	Television        bool `json:"television"`
	Gym               bool `json:"gym"`
	Furnished         bool `json:"furnished"`
	Heater            bool `json:"heater"`
	AirConditioning   bool `json:"air_conditioning"`

}

type PropertyImage struct {
	ID         int    `json:"id"`
	PropertyID int    `json:"property_id"`
	Img        string `json:"img"`
}
