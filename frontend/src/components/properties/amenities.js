import React from 'react';

const Amenities = ({ amenities }) => {
    return (
      <div className="row g-4">
        {Object.entries(amenities).slice(2).map(([amenity, available]) => (
          available && (
            <div key={amenity} className="col-auto col-lg-3">
              <div className="d-flex align-items-center text-dark">
                <div className="flex-shrink-0">
                  {getAmenityIcon(amenity)}
                </div>
                <div className="flex-grow-1 fs-16 fw-medium ms-3">
                  {getAmenityLabel(amenity)}
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    );
  };
  

const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'garden':
        return <i className="fa-solid fa-fan fs-18" />;
      case 'pool':
        return <i className="fa-solid fa-swimming-pool fs-18" />;
      case 'jacuzzi':
        return <i className="fa-solid fa-hot-tub fs-18" />;
      case 'video_surveillance':
        return <i className="fa-solid fa-video-camera fs-18" />;
      case 'alarm_system':          
        return <i className="fa-solid fa-light-emergency-on" />;
      case 'elevator':
        return <i className="fa-solid fa-elevator fs-18" />;
      case 'playground':
        return <i className="fa-solid fa-playground fs-18" />;
      case 'tennis_court':
        return <i className="fa-solid fa-tennis-ball" />;
      case 'golf_course':
        return <i className="fa-solid fa-golf-ball fs-18" />;
      case 'doorman':
        return <i className="fa-solid fa-door-open fs-18" />;
      case 'internet':
        return <i className="fa-solid fa-wifi fs-18" />;
      case 'television':
        return <i className="fa-solid fa-tv fs-18" />;
      case 'gym':
        return <i className="fa-solid fa-dumbbell fs-18" />;
      case 'furnished':
        return <i className="fa-solid fa-couch fs-18" />;
      case 'heater':
        return <i className="fa-solid fa-temperature-high fs-18" />;
      case 'air_conditioning':
        return <i className="fa-solid fa-snowflake fs-18" />;
      case 'covered_parking':
        return <i className="fa-solid fa-car fs-18" />;
      case 'kitchen_appliances':
        return <i className="fa-solid fa-utensils fs-18" />;
      // Add more cases for other amenities...
      default:
        return null;
    }
  };
  
  const getAmenityLabel = (amenity) => {
    switch (amenity) {
      case 'garden':
        return 'Garden';
      case 'pool':
        return 'Pool';
      case 'jacuzzi':
        return 'Jacuzzi';
      case 'video_surveillance':
        return 'Video Surveillance';
      case 'alarm_system':
        return 'Alarm System';
      case 'elevator':
        return 'Elevator';
      case 'playground':
        return 'Playground';
      case 'tennis_court':
        return 'Tennis Court';
      case 'golf_course':
        return 'Golf Course';
      case 'doorman':
        return 'Doorman';
      case 'internet':
        return 'Internet';
      case 'television':
        return 'Television';
      case 'gym':
        return 'Gym';
      case 'furnished':
        return 'Furnished';
      case 'heater':
        return 'Heater';
      case 'air_conditioning':
        return 'Air Conditioning';
      case 'covered_parking':
        return 'Covered Parking';
      case 'kitchen_appliances':
        return 'Kitchen Appliances';
      // Add more cases for other amenities...
      default:
        return null;
    }
  };
  

export default Amenities;
