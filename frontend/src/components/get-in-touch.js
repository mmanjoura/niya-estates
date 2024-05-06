import React from 'react'
import Link from 'next/link'

const GetIntouch = () => {
  return (
    <div className="card-contact bg-primary mb-4 mt-5 py-5 px-4 px-md-5 position-relative overflow-hidden rounded-3 shadow-lg" data-aos="fade-down">
    <div className="row align-items-center position-relative z-1">
        <div className="col-md-10 col-lg-8 col-xl-6">
            <h2 className="display-6 fw-bold mb-0 mb-4 text-capitalize text-white">Are you looking to buy or sell a property? Get in touch today</h2>
            <div className="row g-4 align-items-center">
                <div className="col-auto">
                    <button type="button" className="btn btn-outline-default border-0">
                        <i className="fas fa-mobile"></i>
                        <span>(212) 89 616 5272</span>
                    </button>
                </div>
                <div className="col-auto">
                    <Link href="#" className="border-bottom fs-17 l-spacing-1 text-white">
                        <i className="fas fa-envelope fs-15"></i>
                        <span>info@niyaestates.com</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    {/* Start Card Background Image */}
    <div className="card-sketch">
        <img src="assets/img/png-img/house-sketch.png" alt="" className="card-sketch-image" />
    </div>
    {/* /.End Card Background Image */}
</div>
  )
}

export default GetIntouch