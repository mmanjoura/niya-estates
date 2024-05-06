'use client';
import Layout from "@/components/Layout";
import Dropdown from "@/components/form-control-two";
import GooglePropertyMapsComponent from "@/components/property-map";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PropertyList() {
  const [properties, setProperties] = useState(null)

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  function financial(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  useEffect(() => {
    axios.get(`${baseURL}/properties`).then((response) => {
      setProperties(response?.data);
    });
  }, []);
  console.log("List of Properties", properties)
  if (!properties) {
    return null
  }
  return (
    <>
      <Layout>
        {/* Start Main Content */}
        <div className="main-content">
          <div className="border-bottom py-3">
            <div className="container">
              {/* Start Breadcrumbs */}
              <div className="row gy-2 gx-4 gx-md-5">
                <h4 className="col-auto fs-18 fw-semibold mb-0 page-title text-capitalize">
                  Properties List
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
                      Properties List
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
                    <h2 className="h1 fw-semibold mb-3 section-header__title text-capitalize">Explore Properties in Morocco with,
                      <span className="underline position-relative text-primary"> Niya Estates</span></h2>
                    {/* /.End Section Header Title */}
                    {/* Start Section Header Sub Title */}

                    {/* /.End Section Header Sub Title */}
                  </div>
                  {/*/. End Section Header */}
                </div>
              </div>
              {/* Start Search Form */}
              <div className="search-form__wrap z-1 position-relative mb-5 properties-search">
                {/* Start Main Search Content */}
                <Dropdown />
                {/* /.End Main Search Content */}
              </div>
              {/* /.End Search Form */}
              {/* Start Toolbox  */}
              <div className="d-flex flex-wrap align-items-center mb-4 gap-2">
                <h5 className="fw-semibold text-capitalize mb-0 col">
                  ({properties?.data?.length}) Result For All Listing
                </h5>
                {/* Start Button Group */}
                <div
                  className="btn-group ms-auto"
                  role="group"
                  aria-label="Basic example"
                >
                  <Link
                    href="properties-grid"
                    className="btn btn-outline-default btn-sm"
                  >
                    <i className="fa-solid fa-border-all" />
                  </Link>
                  <Link
                    href="properties-list"
                    className="btn btn-outline-default btn-sm active"
                  >
                    <i className="fa-solid fa-table-list" />
                  </Link>
                </div>
                {/* End Button Group */}
              </div>
              {/* /.End Toolbox  */}
              <div className="row g-4">
                {properties?.data?.map((property, index) => (
                  <div className="col-xl-6" key={index}>
                    {/* Start Card */}
                    <div className="card mb-4 overflow-hidden bg-grey border-0 shadow rounded-3">
                      <Link href={`property-details-2/${property.id}`} className="card-link" />
                      <div className="card-body p-0">
                        <div className="g-0 row">
                          <div className="bg-white col-lg-5 col-md-6 col-xl-5 position-relative">
                            <div className="card-image-hover overflow-hidden position-relative h-100">
                              {/* Start Image */}
                              <img
                                src={property?.images.filter(img => img.location === 'product_list' && img.default_image === 1).map(img => img.image)[0]}
                                alt=""
                                className="h-100 w-100 object-fit-cover"
                              />
                              {/* /. End Image */}
                              {/* Start Tag */}
                              <div className="bg-primary card-property-badge d-inline-block end-1 fs-13 fw-semibold position-absolute property-tags px-2 py-1 rounded-3 text-white top-1">
                                {property?.listing_type}
                              </div>
                              {/*  /. End Tag */}
                            </div>
                          </div>
                          <div className="bg-white col-lg-7 col-md-6 col-xl-7 p-3 p-lg-4 p-md-3 p-sm-4">
                            <div className="d-flex flex-column h-100">
                              <div className="mb-4">
                                {/* Start Price */}
                                <div className="d-flex align-items-end card-property-price flex-row gap-1 mb-2">
                                  <h2 className="m-0 fw-semibold text-primary">
                                    €{financial(property?.price)}
                                  </h2>
                                </div>
                                {/* /. End Price */}
                                {/* Start Property Name */}
                                <h6 className="fs-23 mb-2">
                                  {property?.title}
                                </h6>
                                {/* /.End Property Name */}
                                <div className="fs-16">
                                  <i className="fa-solid fa-location-dot" />
                                  <span style={{ paddingLeft: '5px' }}>
                                    {property?.address}
                                  </span>

                                </div>
                                {/* Start Property Description */}
                                <div className="mt-3">
                                {property?.short_description.substring(0, 100) + '...'  }
                                </div>
                                {/* /.End Property Description */}
                              </div>
                              {/* Start Card Property Facilities */}
                              <div className="border card-property-facilities gap-2 hstack mt-auto p-3 pt-3 rounded-3 text-center">
                                <div className="">
                                  <i className="fa-solid fa-bed text-dark me-1" />
                                  <span>{property?.bedroom} bedroom</span>
                                </div>
                                <span className="vr" />
                                <div className="">
                                  <i className="fa-solid fa-bath text-dark me-1" />
                                  <span>{property?.bathroom} bathroom</span>
                                </div>
                                <span className="vr" />
                                <div className="">
                                  <i className="fa-solid fa-vector-square text-dark me-1" />
                                  <span>{property.living_area} sqm</span>
                                </div>
                              </div>
                              {/* /. End Card Property Facilities */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.End Card */}
                  </div>
                ))}
              </div>
              {/* Start Pagination*/}
              <nav className="align-items-center border-top d-flex flex-wrap justify-content-center justify-content-sm-between pagination mt-5">
                <ul className="list-unstyled m-0 pages mt-3">
                  <li className="active">
                    <Link href="#">1</Link>
                  </li>
                  <li>
                    <Link href="#">2</Link>
                  </li>
                  <li>
                    <Link href="#">3</Link>
                  </li>
                  <li>
                    <Link href="#">4</Link>
                  </li>
                  <li>...</li>
                  <li>
                    <Link href="#">12</Link>
                  </li>
                </ul>
                <div className="ms-3 ms-sm-0 mt-3">
                  <Link className="btn btn-primary btn-sm" href="#">
                    Next
                    <i className="fa-solid fa-arrow-right ms-2" />
                  </Link>
                </div>
              </nav>
              {/* End Pagination*/}
            </div>
          </div>
        </div>
        {/* /. End Main Content */}
      </Layout>
    </>
  );


}