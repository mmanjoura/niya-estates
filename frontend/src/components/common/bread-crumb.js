import React from 'react'
import Link from "next/link";

export const BreadCrumbs = () => {
  return (
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
  )
}
