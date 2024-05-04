import React, { useEffect } from 'react';
import 'magnific-popup/dist/magnific-popup.css';
import $ from 'jquery'; // Ensure jQuery is imported

function PopUpImageGalleryThree({ property }) {

    const [showAllGallery, setShowAllGallery] = React.useState(false);
    const [numImages, setNumImages] = React.useState(3);

    useEffect(() => {
        // Initialize Magnific Popup on your gallery
        $('.grid-images-item-wrap').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true, // Enable gallery mode
                navigateByImgClick: true, // Allow navigation by clicking on the image

            }
        });
        $('.popup-youtube').magnificPopup({
            type: 'iframe',
        });
        $('#browse-gallery-link').on('click', function () {

            try {
                // Get the gallery items
                const galleryItems = getPropertyImages(property);
                $.magnificPopup.open({
                    items: galleryItems,
                    gallery: {
                        enabled: true
                    },
                    type: 'image'
                });
            } catch (error) {
                console.error('Error opening gallery', error);
            }

       
        });
    }, [property?.images, numImages]);

    // Function to get the image items for Magnific Popup gallery
    const getPropertyImages = (property) => {
        return property?.images
            ?.filter(img => img?.location === 'product_details')
            .map(image => ({
                src: image?.image,
                title: image?.title // You can adjust this to match your image data structure
            }));
    };

    return (
        <>
            <div className="position-relative">
                {/* Start Header Masonry */}
                <div className="header-masonry header-masonry_full position-relative">
                    <div className="header-masonry-grid zoom-gallery grid-container">
                        {/* Gallery Section for Current Images */}
                        {property?.images
                            ?.filter(img => img?.location === 'product_details')
                            .slice(0, numImages) // Limit to the specified number of images
                            .map((image, index) => (
                                <a
                                    key={index}
                                    href={image?.image}
                                    className="grid-images-item-wrap overflow-hidden position-relative h-100 w-100 d-block grid-item"
                                >
                                    <img
                                        src={image?.image}
                                        alt=""
                                        className="h-100 w-100 object-fit-cover"
                                    />
                                </a>
                            ))
                        }
                    </div>
                </div>
                {/* /. End Header Masonry */}
                <div className="container position-relative">
                    <div className="header-share align-items-center bg-dark d-flex gap-2 flex-wrap g-3 header-btn-group p-3 p-lg-4 mt-3 mt-md-0 rounded-4 bottom-1">
                        <button type="button" className="btn btn-sm btn-primary">
                            <i className="fa-solid fa-share-nodes me-2" />
                            Share
                        </button>

                        <a href="#" id="browse-gallery-link" className="btn btn-sm btn-primary" >
                            <i className="fa-solid fa-image me-2" />
                            Browse Gallery {property?.images ?.filter(img => img?.location === 'product_details').length} images
                        </a>
                        {/* End Product Images Slider */}
                        <div className="product-video-btn">
                            <a
                                className="popup-youtube d-flex align-items-center justify-content-center"
                                href="http://www.youtube.com/watch?v=0O2aH4XLbto"
                            >
                                <div className="btn-video bg-primary text-white d-flex align-items-center justify-content-center rounded-pill me-2">
                                    {" "}
                                    <i className="fa-solid fa-video" />{" "}
                                </div>{" "}
                                <span className="text-white fw-medium">Watch video</span>
                            </a>
                        </div>
                        {/* /.End of product video button */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PopUpImageGalleryThree;
