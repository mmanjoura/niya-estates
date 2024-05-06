"use client"
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Link from "next/link";

var $ = require("jquery");
if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}

// This is for Next.js. On Rect JS remove this line
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});



const Carousel = () => {


    return (
        <div className="angled bg-white py-5 wrapper lower-start">
          <div className="container py-4">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                {/* Start Section Header Title */}
      
                {/*/. End Section Header */}
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12 d-flex justify-content-center">
                <div className="col-md-3">
                  <img
                    src="assets/img/brands/prestigia_0.jpg"
                    className="img-fluid w-80"
                    alt=""
                    width={220}
                    height={164}
                  />
                  <div className="bottom-0 opacity-0 position-absolute start-0 thumb-content top-0 w-100 z-1">
                    {/* Thumbnail content */}
                  </div>
                </div>
                <div className="col-md-3">
                  <img
                    src="./assets/img/brands/alliances_0.jpg"
                    className="img-fluid w-80"
                    alt=""
                    width={220}
                    height={164}
                  />
                  <div className="bottom-0 opacity-0 position-absolute start-0 thumb-content top-0 w-100 z-1">
                    {/* Thumbnail content */}
                  </div>
                </div>
                <div className="col-md-3">
                  <img
                    src="assets/img/brands/Alomrane_0.jpg"
                    className="img-fluid w-80"
                    alt=""
                    width={220}
                    height={164}
                  />
                  <div className="bottom-0 opacity-0 position-absolute start-0 thumb-content top-0 w-100 z-1">
                    {/* Thumbnail content */}
                  </div>
                </div>
                <div className="col-md-3">
                  <img
                    src="assets/img/brands/Chaabi_0.jpg"
                    className="img-fluid w-80"
                    alt=""
                    width={220}
                    height={164}
                  />
                  <div className="bottom-0 opacity-0 position-absolute start-0 thumb-content top-0 w-100 z-1">
                    {/* Thumbnail content */}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
      
};
export default Carousel;
