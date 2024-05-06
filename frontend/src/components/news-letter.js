import React from 'react'

const NewsLetter = () => {
  return (
    <div className="bg-primary newslatter position-relative py-5 mx-3 mx-xl-5 rounded-4 position-relative overflow-hidden">
    <div className="container p-4 position-relative z-1">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          {/* Start Section Header Title */}
          <div className="section-header text-center mb-5" data-aos="fade-down">
            {/* Start Subtitle */}
            <div className="bg-white d-inline-block fw-medium mb-3 rounded-pill section-header__subtitle text-capitalize text-primary">
              Our Latest news about construction in Morocco
            </div>
            {/* /. End Subtitle */}
            {/* Start Section Header title */}
            <h2 className="h1 fw-semibold mb-3 section-header__title text-capitalize text-white">
              Want to join us?
            </h2>
            {/* /.End Section Header Title */}
            {/* Start Section Header Sub Title */}
            <div className="sub-title fs-16 text-white">

             Be the first to be notified of our latest articles and news. 
              <br className="d-none d-lg-block" /> Subscribe to our newsletter.
            </div>
            {/* /.End Section Header Sub Title */}
          </div>
          {/*/. End Section Header */}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <div className="row g-4 align-items-end newslatter-form">
            <div className="col-sm">
              {/* Start Form Group */}
              <div className="form-group">
                <label className="text-white bg-primary fw-semibold">
                  Full Name
                </label>
                <input type="text" className="form-control bg-transparent" />
              </div>
              {/* /. End Form Group */}
            </div>
            <div className="col-sm">
              {/* Start Form Group */}
              <div className="form-group">
                <label className="text-white bg-primary">Enter Email</label>
                <input type="email" className="form-control bg-transparent" />
              </div>
              {/* /. End Form Group */}
            </div>
            <div className="col-sm-auto">
              {/* Start Button */}
              <button type="button" className="btn btn-lg btn-light w-100">
                Join Now
              </button>
              {/* /. End Button */}
            </div>
          </div>

        </div>
      </div>
    </div>
    <div className="card-sketch">
      <img
        src="assets/img/png-img/house-sketch.png"
        alt=""
        className="card-sketch-image"
      />
    </div>
  </div>
  )
}

export default NewsLetter