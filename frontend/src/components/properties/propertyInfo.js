'use client';
import { useState } from "react";

const PropertyInfo = ({ onSubmit,  onPropertyChange, onListingTypeChange }) => {
  const [formData, setFormData] = useState({  

    agent_id: "",
    title: "",
    address: "",
    city: "",
    property_type: "",
    listing_type: "",
    price: "",
    living_area: "",
    bedroom: "",
    bathroom: "",
    parking_lots: "",
    construction_area: "",
    land_area: "",
    description: "",
    youtube_video: "",
    status: "",
    amenities: "",

  });



  const handlePropetyTypeChange = (e) => { 
    onPropertyChange(e.target.value)
    console.log("Child component", e.target.value)  
    
  };
  
  const handleListingTypeChange = (e) => {
    console.log("Child component", e.target.value)
    onListingTypeChange(e.target.value)

  };

  const handleChange = (e) => {
    onSubmit(e)
  };

  return (
    <div className="row gx-3 gy-4">
      <div className="col-md-12">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">Listing title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Property listing title"
            name="title"
            required
            onChange={handleChange}
          />
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-6">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">Address</label>
          <input
            className="form-control"
            required
            name="address"
            onChange={handleChange}
          />
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-6">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">City</label>
          <input
            className="form-control"
            required
            name="city"
            onChange={handleChange}

          />
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-6">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">Type of the property</label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handlePropetyTypeChange}

          >
            <option value={0}>Select</option>
            <option value={1}>Apartment</option>
            <option value={2}>House</option>
            <option value={3}>Commercial</option>
            <option value={4}>Land</option>
          </select>
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-6">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">Type of the listing</label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleListingTypeChange}                          >
            <option value={0}>Select</option>
            <option value={1}>For Rent</option>
            <option value={2}>For Sale</option>
          </select>
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-12">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">Listing price</label>
          <input
            type="number"
            className="form-control"
            placeholder="ex. €10,000"
            required
            name="price"
            onChange={handleChange}

          />
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-4">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">Living area</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g. 1200 &#x33A1;"
            required=""
            name="living_area"
            onChange={handleChange}
          />
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-4">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">Bedrooms</label>
          <input
            type="number"
            className="form-control"
            required
            name="bedroom"
            onChange={handleChange}
          />
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-4">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">Bathrooms</label>
          <input
            type="number"
            className="form-control"
            required
            name="bathroom"
            onChange={handleChange}
          />
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-4">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">Parking lots</label>
          <input
            type="number"
            className="form-control"
            required
            name="parking_lots"
            onChange={handleChange}
          />
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-4">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">Construction Area</label>
          <input
            type="number"
            className="form-control"
            placeholder="ex. 4795 sqm / &#x33A1;"
            required
            name="construction_area"
            onChange={handleChange}

          />
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-4">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">Land area</label>
          <input
            type="number"
            className="form-control"
            placeholder="ex. 4795 sqm / &#x33A1;"
            required
            name="land_area"
            onChange={handleChange}

          />
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-12">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">
            Listing Description
          </label>
          <textarea
            className="form-control"
            placeholder="Please enter up to 240 characters."
            rows={4}
            required
            name="description"
            onChange={handleChange}

          />
        </div>
        {/* /.End Form Group */}
      </div>
      <div className="col-md-12">
        {/* Start Form Group */}
        <div className="form-group">
          <label className="required">
            Youtube Video URL
          </label>
          <input
            type="text"
            name="youtube_video"
            className="form-control"
            placeholder="ex. 4795 sqft"
            onChange={handleChange}

          />
        </div>
        {/* /.End Form Group */}
      </div>


    </div>
  )
}

export default PropertyInfo