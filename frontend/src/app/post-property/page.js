'use client';
import Layout from "@/components/Layout";
import Link from "next/link";
import ProtectAdminRoute from "@/components/utils/ProtectAdminRoute";
import LoadingSpinner from '@/components/spinners/LoadingSpinner';
import { useEffect, useState } from "react";
import { BreadCrumbs } from "@/components/common/bread-crumb";
import Herro from "@/components/common/herro";
import Profile from "@/components/properties/profile";
import PropertyInfoHeader from "@/components/properties/propertyInfoHeader";
import PropertyInfo from "@/components/properties/propertyInfo";

export default function PostProperty() {

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [property_type, setPropertyType] = useState("");
  const [listing_type, setListingType] = useState("");
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [amenities, setAmenities] = useState({

    Garden : false,
    Pool : false,
    Jacuzzi : false,
    Video_Surveillance : false,
    Alarm_System : false,
    Elevator : false,
    Playground : false,
    Tennis_Court : false,
    Golf_Course : false,
    Doorman : false,
    Internet : false,
    Television : false,
    Gym : false,
    Furnished : false,
    Heater : false,
    Air_Conditioning : false,

  });
  const [formData, setFormData] = useState({
    agent_id: user?.user_id,
    title: '',
    address: '',
    city: '',
    property_type: '',
    listing_type: '',   
    price: '',
    living_area: '',
    bedroom: '',
    bathroom: '',
    parking_lots: '',
    construction_area: '',
    land_area: '',
    description: '',
    youtube_video: '',
    status: '',
    amenities: '',
  });

  useEffect(() => {
    setUser(ProtectAdminRoute());

  }, [property_type, listing_type, amenities, formData]);

  const handlePropetyTypeChange = (e) => {
    setPropertyType(e);

  };
  const handleListingTypeChange = (e) => {
    setListingType(e);

  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setAmenities(prevState => ({
      ...prevState,
      [id]: checked
    }));
  };


  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.agent_id = user?.user_id;
    formData.property_type = property_type;
    formData.listing_type = listing_type;
    formData.amenities = amenities;
    const res = await fetch(baseURL + '/properties', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        agent_id: formData.agent_id,
        title: formData.title,
        address: formData.address,
        city: formData.city,
        property_type: formData.property_type,
        listing_type: formData.listing_type,
        price: formData.price,
        living_area: formData.living_area,
        bedroom: formData.bedroom,
        bathroom: formData.bathroom,
        parking_lots: formData.parking_lots,
        construction_area: formData.construction_area,
        land_area: formData.land_area,
        description: formData.description,
        youtube_video: formData.youtube_video,
        status: formData.status,
        amenities: formData.amenities,
      }),
    });
    const body = await res.json();
    setTimeout(() => {
      document.getElementById("SubmitForm").reset();
      // setLoading(false);
    }
      , 1000);

  };



  return (

    <Layout>
      {/* Start Main Content */}

      <div className="main-content">
        <div className="border-bottom py-3">
          <div className="container">

            {/* Start Breadcrumbs */}
            <BreadCrumbs />
            {/* End Breadcrumbs */}
          </div>
        </div>
        <div className="container py-1">
          <div className="row">

            <div className="col-md-9">
              <div className="py-4">
                <div className="row justify-content-center g-4">
                  <form className="col-lg-12"  >
                    {/* Your form content goes here */}
                    {/* Omitted for brevity */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="container py-4">
            <Herro />
            <div className="row justify-content-center g-4">
              <form className="col-lg-8" id="SubmitForm" >
                <Profile user={user} />

                <div className="row gx-3 gy-4">
                  <PropertyInfoHeader />
                  <PropertyInfo onSubmit={handleChange} onPropertyChange={handlePropetyTypeChange} onListingTypeChange={handleListingTypeChange} />
                  <div className="col-md-12">
                    <div className="fw-medium text-dark mb-3">
                      Property amenities
                    </div>
                    <div className="row gx-3 gy-2">
                      {Object.entries(amenities).map(([key, value]) => (
                        <div className="col-sm-6 col-md-4" key={key}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={key}
                              checked={value}
                              onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor={key}>
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-12">
                  </div>
                </div>
                <div className="mt-5">
                  {/* Start Button */}
                  <button onClick={handleSubmit}
                    type="submit"
                    className="btn btn-primary btn-lg d-inline-flex hstack gap-2"
                  >
                    <span>Submit for approval</span>
                    <span className="vr" />
                    <i className="fa-arrow-right fa-solid fs-14" />
                  </button>
                  {/* /.End Button */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  );
}