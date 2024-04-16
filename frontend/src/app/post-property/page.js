'use client';
import Layout from "@/components/Layout";
import Link from "next/link";
import ProtectAdminRoute from "@/components/utils/ProtectAdminRoute";
import LoadingSpinner from '@/components/spinners/LoadingSpinner';
import { useEffect, useState } from "react";

export default function PostProperty() {


  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [agent_id, setAgentId] = useState("");
  const [property_type, setPropertyType] = useState("");
  const [listing_type, setListingType] = useState("");
  const [img, setImg] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [parking_lots, setParkingLots] = useState("");
  const [living_area, setLivingArea] = useState("");
  const [land_area, setLandArea] = useState("");
  const [construction_area, setConstructionArea] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(ProtectAdminRoute());
    setAgentId(user?.user_id);
  }, []);

  const [amenities, setAmenities] = useState({
    garden: false,
    internet: false,
    pool: false,
    jacuzzi: false,
    video_surveillance: false,
    cinema: false,
    laundry_room: false
  });

  const handlePropetyTypeChange = (e) => {
    setPropertyType(e.target.value);
    setAgentId(user?.user_id);
    setStatus("active");

  };
  const handleListingTypeChange = (e) => {
    setListingType(e.target.value);

  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setAmenities(prevState => ({
      ...prevState,
      [id]: checked
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(baseURL + '/properties', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id,
        property_type,
        listing_type,
        img,
        status,
        name,
        location,
        description,
        bedroom,
        bathroom,
        living_area,
        parking_lots,
        living_area,
        land_area,
        construction_area,
        price,
        amenities

      }),
    });
    const body = await res.json();
    setTimeout(() => {
      document.getElementById("SubmitForm").reset();
      setLoading(false);
      setShowHide(false)
    }
      , 1000);

  };

  return (

    <Layout>
      {/* Start Main Content */}
      {loading && <LoadingSpinner />}
      <div className="main-content">
        <div className="border-bottom py-3">
          <div className="container">
            {/* Start Breadcrumbs */}
            <div className="row gy-2 gx-4 gx-md-5">
              <h4 className="col-auto fs-18 fw-semibold mb-0 page-title text-capitalize">
                Post Property
              </h4>
              <div className="border-start col-auto">
                <ol className="align-items-center breadcrumb fw-medium mb-0">
                  <li className="breadcrumb-item d-flex align-items-center">
                    <Link href="/" className="text-decoration-none">
                      <i className="fa-solid fa-house-chimney-crack fs-18" />
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item d-flex align-items-center active"
                    aria-current="page"
                  >
                    Post Property
                  </li>
                </ol>
              </div>
            </div>
            {/* End Breadcrumbs */}
          </div>
        </div>
        <div className="py-5">
          <div className="container py-4">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                {/* Start Section Header Title */}
                <div className="section-header text-center mb-5">
                  {/* Start Section Header title */}
                  <h2 className="h1 fw-semibold mb-3 section-header__title text-capitalize">Post a property for <span className="underline position-relative text-primary">sale</span> or rent</h2>
                  {/* /.End Section Header Title */}
                  {/* Start Section Header Sub Title */}
                  <div className="sub-title fs-16">
                    It is a long established fact that a reader will be distracted
                    by the
                    <br className="d-none d-lg-block" /> readable content of a page
                    when looking at its layout.
                  </div>
                  {/* /.End Section Header Sub Title */}
                </div>
                {/*/. End Section Header */}
              </div>
            </div>
            <div className="row justify-content-center g-4">
              <form className="col-lg-8" id="SubmitForm" onSubmit={handleSubmit}>
                <div className="shadow p-4 p-sm-5 rounded-4 mb-4">
                  <div className="align-items-sm-center border-bottom d-sm-flex mb-5 pb-4">
                    <div className="d-flex flex-shrink-0 gap-1">
                      <span className="fw-semibold text-dark">01/</span>
                      <div
                        className="icon-box align-items-center bg-soft-primary d-flex justify-content-center mb-2 rounded-circle"
                      >
                        <i className="fa-solid fa-user fs-3 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="fw-semibold">{user?.full_name}</h5>
                      <p className="mb-0">
                        There are many variations of passages of Lorem Ipsum
                        <br className="d-none d-lg-block" /> available, but the
                        majority have
                      </p>
                    </div>
                  </div>
                  <div className="row gx-3 gy-4">
                    <div className="col-md-6">
                      {/* Start Form Group */}
                      <div className="form-group">

                        <input
                          type="text"
                          className="form-control"
                          disabled
                          value={user?.full_name}
                        />
                      </div>
                      {/* /.End Form Group */}
                    </div>
                    <div className="col-md-6">
                      {/* Start Form Group */}
                      <div className="form-group">

                        <input
                          type="email"
                          className="form-control"
                          value={user?.email}
                          disabled
                        />
                      </div>
                      {/* /.End Form Group */}
                    </div>
                    <div className="col-md-6">
                      {/* Start Form Group */}
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          value={user?.phone_number}
                          disabled
                        />
                      </div>
                      {/* /.End Form Group */}
                    </div>
                  </div>
                </div>
                <div className="shadow p-4 p-sm-5 rounded-4">
                  <div className="align-items-sm-center border-bottom d-sm-flex mb-5 pb-4">
                    <div className="d-flex flex-shrink-0 gap-1">
                      <span className="fw-semibold text-dark">02/</span>
                      <div
                        className="icon-box align-items-center bg-soft-primary d-flex justify-content-center mb-2 rounded-circle"
                      >
                        <i className="fa-solid fa-house-chimney fs-3 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="fw-semibold">
                        Information about the property
                      </h5>
                      <p className="mb-0">
                        There are many variations of passages of Lorem Ipsum
                        <br className="d-none d-lg-block" /> available, but the
                        majority have
                      </p>
                    </div>
                  </div>
                  <div className="row gx-3 gy-4">
                    <div className="col-md-12">
                      {/* Start Form Group */}
                      <div className="form-group">
                        <label className="required">Listing title</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Property listing title"
                          required
                          onChange={e => setName(e.target.value)}
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
                          onChange={e => setLocation(e.target.value)}
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
                          value={property_type}
                          onChange={handlePropetyTypeChange}

                        >
                          <option value="">Select</option>
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
                          value={listing_type}
                          onChange={handleListingTypeChange}                          >
                          <option value="">Select</option>
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
                          placeholder="ex. $10,000"
                          required
                          onChange={e => setPrice(e.target.value)}
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
                          placeholder="e.g. 1200 sqft"
                          required=""
                          onChange={e => setLivingArea(e.target.value)}
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
                          onChange={e => setBedroom(e.target.value)}
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
                          onChange={e => setBathroom(e.target.value)}
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
                          onChange={e => setParkingLots(e.target.value)}
                        />
                      </div>
                      {/* /.End Form Group */}
                    </div>
                    <div className="col-md-4">
                      {/* Start Form Group */}
                      <div className="form-group">
                        <label className="required">Construction sqft.</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="ex. 4795 sqft"
                          required
                          onChange={e => setConstructionArea(e.target.value)}

                        />
                      </div>
                      {/* /.End Form Group */}
                    </div>
                    <div className="col-md-4">
                      {/* Start Form Group */}
                      <div className="form-group">
                        <label className="required">Land sqft.</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="ex. 4795 sqft"
                          required
                          onChange={e => setLandArea(e.target.value)}
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
                          onChange={e => setDescription(e.target.value)}
                        />
                      </div>
                      {/* /.End Form Group */}
                    </div>

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
                      {/* Start Form Group */}
                      <div className="form-group">
                        <label className="required">Listing images</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ex. drive.google.com/..."
                          required=""
                        />
                      </div>
                      {/* /.End Form Group */}
                      <p className="mb-0 mt-2">
                        Please share a Google Drive or Imgur link of your listing
                        images
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  {/* Start Button */}
                  <button
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