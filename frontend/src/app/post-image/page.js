'use client';
import Layout from "@/components/Layout";
import Link from "next/link";
import ProtectAdminRoute from "@/components/utils/ProtectAdminRoute";
import LoadingSpinner from '@/components/spinners/LoadingSpinner';
import { useState } from "react";

export default function PostProperty() {
  const user = ProtectAdminRoute();

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const [showHide, setShowHide] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const newImages = [];
    const maxSize = 2800; // in pixels

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width > maxSize || img.height > maxSize) {
            setError(
              `Image ${file.name} exceeds the maximum size of ${maxSize}px.`
            );
          } else if (
            !["image/png", "image/jpeg", "image/webp"].includes(file.type.toLowerCase())
          ) {
            setError(
              `Image ${file.name} is not a valid file type. Only PNG and JPEG are allowed.`
            );
          } else {
            newImages.push(reader.result);
            if (newImages.length === fileList.length) {
              setImages([...images, ...newImages]);
              setError("");
            }
          }
        };
        img.onerror = () => {
          setError(`Image ${file.name} could not be loaded.`);
        };
        img.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
    setFiles(fileList);
  };
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  const handleUpload = () => {
    const formData = new FormData();
    setLoading(true);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    fetch(baseURL + '/uploadImage?image=' + imageType.imageType + '&category=' + imageType.category + '&id=' + selectedOption + '&slide_width=' + slide_width + '&slide_height=' + slide_height + '&gallery_width=' + gallery_width + '&gallery_height=' + gallery_height, {
      method: 'POST',
      credentials: 'include',
      body: formData

    })
      .then(response => response.json())
      .catch(error => console.error('Error uploading images:', error));

    setTimeout(() => {
      setLoading(false);
      document.getElementById("SubmitForm").reset();
    }
      , 1000);


  };

  return (

    <Layout>
      {/* Start Main Content */}

      <div className="main-content">   
      <div className="border-bottom py-3">
          <div className="container">
            {/* Start Breadcrumbs */}
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
            {/* End Breadcrumbs */}
          </div>
        </div> 
        <div className="py-5">
          <div className="container py-4">           
            <div className="row justify-content-center g-4">         
              <form className="col-lg-8" >
                <div className="shadow p-4 p-sm-5 rounded-4">
                  <div className="align-items-sm-center border-bottom d-sm-flex mb-5 pb-4">
                    {/* Dropdownlist of Properties */}

                    <div className="form-group">

                      <select
                        className="form-select"
                        aria-label="Default select example"
         
                      >
                        <option value="">Select Your Property</option>
                        <option value={1}>Apartment</option>
                        <option value={2}>House</option>
                        <option value={3}>Commercial</option>
                        <option value={4}>Land</option>
                      </select>
                    </div>
                  </div>
                  <div className="row gx-3 gy-4">

                    <div className="col-md-12">
                      {/* Start Form Group */}
                      <div className="form-group">
                      <p className="mb-0 mt-2">
                        PNG, JPG or WEBP no bigger than w800 x h600 px.
                        <br />     <br />
                      </p>

                        <input
                          type="file"
                          id="bannerUpload"
                          multiple
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handleFileChange}
                        />
                        <br />     <br />
                      </div>
                      {/* /.End Form Group */}
                    
                    </div>
                    <div className="row row-cols-4">
                      {images.map((image, index) => (
                        <div key={index} className="col">
                          <div className="position-relative mb-4">
                            <img src={image} alt="Property" className="img-fluid" />
                            <button
                              type="button"
                              className="btn-close position-absolute top-0 end-0"
                              onClick={() => handleRemoveImage(index)}
                            />
                            <div className="size-40 bg-white rounded-4 flex-center cursor-pointer">
                              <i className="icon-trash text-16" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* /.End Form Group */}

                  </div>
                  <div className="row gx-3 gy-4">

                    <div className="col-md-12">

                    </div>
                    <div className="col-md-12">

                    </div>
                    {/* /.End Form Group */}

                  </div>
                </div>

                <div className="mt-5">
                  {/* Start Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg d-inline-flex hstack gap-2"
                  >
                    <span>Upload Images</span>
                    <span className="vr" />
                    <i className="fa-arrow-right fa-solid fs-14" />
                  </button>
                  {/* /.End Button */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </Layout>

  );
}