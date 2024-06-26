package models

import (
	"time"
)

type Property struct {
	ID               int       `json:"id"`
	UserID          string    `json:"user_id"`
	Title            string    `json:"title"`
	Address          string    `json:"address"`
	City             string    `json:"city"`
	PropertyType     string    `json:"property_type"`
	ListingType      string    `json:"listing_type"`
	UserType         string    `json:"user_type"`
	Price            string    `json:"price"`
	LivingArea       string    `json:"living_area"`
	Bedroom          string    `json:"bedroom"`
	Bathroom         string    `json:"bathroom"`
	ParkingLots      string    `json:"parking_lots"`
	ConstructionArea string    `json:"construction_area"`
	LandArea         string    `json:"land_area"`
	YearBuilt        string    `json:"year_built"`
	ShortDescription string    `json:"short_description"`
	LongDescription  string    `json:"long_description"`
	Profile          string    `json:"profile"`
	YoutubeVideo     string    `json:"youtube_video"`
	GoogleMap        string    `json:"google_map"`
	Status           string    `json:"status"`
	Amenities        Amenities `json:"amenities"`
	Images           []Image   `json:"images"`
	AvatarURL        string    `json:"avatar_url"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

type Amenities struct {
	Id                int  `json:"id"`
	PropertyID        int  `json:"property_id"`
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
