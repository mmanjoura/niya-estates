'use client';
import Link from 'next/link';
import React from 'react';
import FeaturesPropertiesData from "../data/features-properties.json"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default  function FeaturesProperties() {
  const [properties, setProperties] = useState(null)

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios.get(`${baseURL}/properties`).then((response) => {
      setProperties(response?.data);
    });
  }, []);
  console.log("List of Properties", properties)
  if (!properties) {
    return null
  }

  function financial(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
    


  return (
    <>
      {/* Start Featured Properties Section */}
      <div className="py-5">
        <div className="container py-4">

          {/* Start Card */}
          {
             properties?.data?.slice(0, 3).map((featuresProperty) => {
              return (
                  <div
                    className=" card mb-4 overflow-hidden bg-grey border-0 shadow rounded-3"
                    data-aos="fade-up"
                    data-aos-delay={300}
                    key={featuresProperty.id}
                  >
                    <Link href={`/property-details-2/${featuresProperty.id}`} className="card-link" />
                    <div className="card-body p-0">
                      <div className="g-0 row">
                        <div className="bg-white col-lg-5 col-md-6 col-xl-3 position-relative">
                          <div className="card-image-hover overflow-hidden position-relative h-100">
                            {/* Start Image */}
                          <img
                            src={featuresProperty?.images
                              ?.filter(img => img.location === 'product_list' && img.default_image === 1)
                              .map(img => img.image)[0]}
                            alt=""
                            className="h-100 w-100 object-fit-cover"
                          />
                            {/* /. End Image */}
                            {/* Start Tag */}
                            <div className={`bg-${featuresProperty?.listing_type === 'For Sale' ? 'primary' : 'white'} card-property-badge d-inline-block end-1 fs-13 fw-semibold position-absolute property-tags px-2 py-1 rounded-3 text-${featuresProperty?.listing_type === 'For Sale' ? 'white' : 'primary'}  top-1`}>
                              {featuresProperty?.listing_type}
                            </div>
                            {/*  /. End Tag */}
                          </div>
                        </div>
                        <div className="bg-white col-lg-7 col-md-6 col-xl-6 p-3 p-lg-4 p-md-3 p-sm-4">
                          <div className="d-flex flex-column h-100">
                            <div className="mb-4">
                              {/* Start Property Name */}
                              <h6 className="fs-23 mb-2">      {featuresProperty?.title}</h6>
                              {/* /.End Property Name */}
                              <div className="fs-16">
                                <i className="fa-solid fa-location-dot" />
                                <span>  {featuresProperty?.address}</span>
                              </div>
                              {/* Start Property Description */}
                              <div className="mt-3">
                                {featuresProperty?.short_description.substring(0, 240)}
                                <span style={{ color: '#0a73c0'}}>  View More</span>
                              </div>
                              {/* /.End Property Description */}
                            </div>
                            {/* Start Card Property Facilities */}
                            <div className="border card-property-facilities gap-2 hstack mt-auto p-3 pt-3 rounded-3 text-center">
                              <div className="">
                                <i className="fa-solid fa-bed text-dark me-1" />
                                <span>{featuresProperty?.bedroom} bedroom</span>
                              </div>
                              <span className="vr" />
                              <div className="">
                                <i className="fa-solid fa-bath text-dark me-1" />
                                <span>{featuresProperty?.bathroom} bathroom</span>
                              </div>
                              <span className="vr" />
                              <div className="">
                                <i className="fa-solid fa-vector-square text-dark me-1" />
                                <span>{featuresProperty.living_area} sqm</span>
                              </div>
                            </div>
                            {/* /. End Card Property Facilities */}
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-xl-3 p-3 p-lg-4 p-md-3 p-sm-4">
                          <div className="row h-100 align-items-center justify-content-center gap-2">
                            {/* Start price */}
                            <div className="col col-xl-12">
                              <div className="align-items-sm-center d-sm-flex d-xl-block">
                                <div className="d-flex justify-content-center align-items-end card-property-price flex-row gap-1">
                                  <h2 className="m-0 fw-semibold text-primary">€{financial(featuresProperty?.price)}</h2>
                                  {/* <div> /month</div> */}
                                </div>
                                <div className="flex-grow-1 mt-2 ms-sm-3 ms-xl-0 mt-xl-2 text-center">
                                  <strong className="small fw-semibold">(incl. VAT)</strong>
                                  {/* <div className="small">Per booking</div> */}
                                </div>
                              </div>
                            </div>
                            {/* /.End price */}
                            {/* Start button */}
                            <div className="col-auto d-flex flex-wrap gap-1 justify-content-center position-relative z-1">
                              <button
                                type="button"
                                className="border-0 btn btn-outline-default btn-sm fw-medium shadow-sm"
                              >
                                <i className="fa fa-phone fs-14 me-1" />
                                Call
                              </button>
                              <button
                                type="button"
                                className="border-0 btn btn-outline-default btn-sm fw-medium shadow-sm"
                              >
                                <i className="fa fa-user-tie fs-14 fs-e me-1" />
                                Email
                              </button>
                              <button
                                type="button"
                                className="border-0 btn btn-outline-default btn-sm fw-medium shadow-sm"
                              >
                                <i className="fa fa-phone fs-14 me-1" />
                                WhatsApp
                              </button>
                            </div>
                            {/* /.End button */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
             
              )
            })

          }
          {/* /.End Card */}

        </div>
      </div>
      {/* /.End Featured Properties Section */}

    </>
  );
}
async function getFeaturesProperties() {
  const res = await fetch('https://findhusly.vercel.app/api/features-properties')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}