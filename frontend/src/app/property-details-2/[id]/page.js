'use client';
import Layout from "@/components/Layout";
import PopUpImageGalleryThree from "@/components/magnetic-pop-up-properti-details-three";
import PopUpImageGalleryTwo from "@/components/magnific-pop-up-gallery-two";
import PropertySticky from "@/components/property-sticky";
import Link from "next/link";
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import SameArea from "@/components/same-area";

export default function PropertyDetailsTwo({ params }) {
    const [properties, setProperties] = useState(null)
 
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        axios.get(`${baseURL}/properties`).then((response) => {
            setProperties(response?.data);
        
        });
    }, []);

 if (!properties) {
        return null
    }

    let property = properties?.data?.find((property) => property.id == params.id);
    if (!property) {
        return null
    }
  



 
    return (
        <Layout>
            {/* Start Main Content */}
            <div className="main-content">
                <div className="breadcrumb-wrap border-0 py-3">
                    <div className="container">
                        {/* Start Breadcrumbs */}
                        <div className="row gy-2 gx-4 gx-md-5">
                            <div className="col-auto">
                                {/* Start Back To Search */}
                                <Link
                                    href="properties-list"
                                    className="align-items-center d-flex fw-medium text-primary"
                                >
                                    <i className="fa-solid fa-chevron-left me-1" />
                                    Back To Search
                                </Link>
                                {/* /. End Back To Search */}
                            </div>
                            <h4 className="border-start col-auto fs-18 fw-semibold mb-0 page-title text-capitalize">
                                Entire villa hosted by Wayan
                            </h4>
                            <div className="border-start col-auto">
                                <ol className="align-items-center breadcrumb fw-medium mb-0">
                                    <li className="breadcrumb-item d-flex align-items-center">
                                        <Link href="#" className="text-decoration-none">

                                            <i className="fa-solid fa-house-chimney-crack fs-18" />
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item d-flex align-items-center">

                                        <Link
                                            href="property-details-2"
                                            className="text-decoration-none"
                                        >
                                            Property details two
                                        </Link>
                                    </li>
                                    <li
                                        className="breadcrumb-item d-flex align-items-center active"
                                        aria-current="page"
                                    >
                                        {property?.title}
                                    </li>
                                </ol>
                            </div>
                        </div>
                        {/* End Breadcrumbs */}
                    </div>
                </div>

            
            {/* Start Masonry */}
              <PopUpImageGalleryThree property = {property}/>
                {/* /. End Masonry */}
                {/* Start Sticky Property */}
                <PropertySticky property = {property}/>
                {/* End Sticky Property */}
                {/* Start Galary Items */}
          
                {/*Related Articles*/}
                <div className="border-top py-5">
                    <div className="container py-4">
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                {/* Start Section Header Title */}
                                <div className="section-header text-center mb-5">
                                    {/* Start Section Header title */}
                                    <h2 className="h1 fw-semibold mb-3 section-header__title text-capitalize">More <span className="underline position-relative text-primary">available </span> in the same area </h2>
                                    {/* /.End Section Header Title */}
                                    {/* Start Section Header Sub Title */}
                                    <div className="sub-title fs-16">

                                        Our guests always travel the world in style. Mention @Kempinski
                                        <br className="d-none d-lg-block" /> on Instagram for a chance
                                        to be featured!
                                    </div>
                                    {/* /.End Section Header Sub Title */}
                                </div>
                                {/*/. End Section Header */}
                            </div>
                        </div>
                        {/* Start Card */}
                        {/* Start Card */}
                        <SameArea />

                    </div>
                </div>
            </div>
            {/* /. End Main Content */}


        </Layout>

    );
}