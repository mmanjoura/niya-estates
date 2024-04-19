import React from 'react'

const PropertyInfoHeader = () => {
  return (
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
  )
}

export default PropertyInfoHeader