
import Header from "@/components/Header";
import Carousel from "@/components/corousel";
import FeaturesProperties from "@/components/feature-properties";
import FooterWhite from "@/components/footer-white";

import { BreadCrumbs } from "@/components/common/bread-crumb";
import Hero from "@/components/home/hero";

import Link from "next/link";
import Layout from "@/components/Layout";
import NewsLetter from "@/components/news-letter";

export default function HomeTwo() {
  return (
    <>
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

          {/* Start Hero Header Two */}
          <Hero />
          {/* /.End Hero Header Two */}


          {/* Start Features Properties */}
          <FeaturesProperties />
          {/* /. End Features Properties */}
          {/* Start Articles Section */}
          <div className="py-5 border-top">
            <div className="container pb-5">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  {/* Start Section Header Title */}
                  <div className="section-header text-center mb-5" data-aos="fade-down">
                    {/* Start Subtitle */}
                    <div className="bg-soft-primary d-inline-block fw-medium mb-3 rounded-pill section-header__subtitle text-capitalize text-primary">
                      What is currently happening
                    </div>
                    {/* /. End Subtitle */}
                    {/* Start Section Header title */}
                    <h2 className="h1 fw-semibold mb-3 section-header__title text-capitalize">Browse our latest <span className="underline position-relative text-primary">projects</span> & news</h2>
                    {/* /.End Section Header Title */}
                    {/* Start Section Header Sub Title */}
                    <div className="sub-title fs-16">
                      Discover what Morocco has to offer. Explore the rich and diverse experiences waiting for you in this beautiful country before 2030.
                    </div>

                    {/* /.End Section Header Sub Title */}
                  </div>
                  {/*/. End Section Header */}
                </div>
              </div>
              <Carousel />
            </div>
          </div>
          {/* /. End Articles Section */}
          {/* Start Newslatter */}
          <NewsLetter />
          {/* /.End Newslatter */}
        </div>
      </ Layout>

    </>
  );
}


