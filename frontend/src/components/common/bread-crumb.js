import React from 'react'
import Link from "next/link";

export const BreadCrumbs = () => {

  return (
    <div className="row gy-2 gx-4 gx-md-5">
      <div className="border-start col-auto">
        <ol className="align-items-center breadcrumb fw-medium mb-0">
          <li className="breadcrumb-item d-flex align-items-center">
            <Link href="/post-property" className="text-decoration-none">
              <i className="fa-solid fa-house-chimney-crack fs-18" style={{ padding: '0 15px' }} />
              Add Property
            </Link>
          </li>
        </ol>
      </div>
      <div className="border-start col-auto">
        <ol className="align-items-center breadcrumb fw-medium mb-0">
          <li className="breadcrumb-item d-flex align-items-center">
            <Link href="post-image" className="text-decoration-none">
              <i className="fa-solid fa-circle fs-18" style={{ padding: '0 15px' }}></i>
              Upload Images
            </Link>
          </li>
        </ol>
      </div>
      <div className="border-start col-auto">
        <ol className="align-items-center breadcrumb fw-medium mb-0">
          <li className="breadcrumb-item d-flex align-items-center">
            <Link href="post-image" className="text-decoration-none">
              <i className="fa-solid fa-database fs-18" style={{ padding: '0 15px' }}></i>
              Datagase Backup
            </Link>
          </li>
        </ol>
      </div>
    </div>
  )
}
