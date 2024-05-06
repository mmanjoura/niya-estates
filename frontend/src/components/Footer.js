import Link from "next/link";
import ScrollTop from "./scroll-top";
import GetIntouch from "./get-in-touch";

export default function Footer() {
    return (
        <>
            {/* Start Footer */}
            <ScrollTop />
            <footer className="main-footer footer-dark background-image" data-image-src="assets/img/wall-sketch.png">
                <div className="container pt-4">
                    {/* Start Card Contact */}
                    <GetIntouch />
                    {/* .End Card Contact  */}
                    <div className="row">
                        <div className="col-6 col-sm-4 col-md-4 col-lg col-xl-2 py-3 py-md-5">
                        
                            {/* /Start Social Icon */}
                            <ul className="list-unstyled social-icon">
                                <li>
                                    <Link href="#" className="align-items-center d-flex">
                                        <div className="align-items-center bg-primary d-flex d-inline-block fs-19 icon-wrap justify-content-center me-3 rounded-2 text-center text-white inst"><i className="fab fa-instagram"></i></div>Instagram
                                    </Link>
                                </li>                 
                            </ul>
                            {/* /.End Social Icon */}
                        </div>

                        <div className="col-6 col-sm-6 col-md-6 col-lg-auto col-xl-2 py-3 py-md-5">
                
                            {/* /Start Footer Link  */}
                            <ul className="list-unstyled social-icon">
                                <li>
                                <Link href="#" className="align-items-center d-flex">
                                        <div className="align-items-center bg-primary d-flex d-inline-block fs-19 icon-wrap justify-content-center me-3 rounded-2 text-center text-white twi"><i className="fab fa-twitter"></i></div>Twitter
                                    </Link>
                                </li>
                            </ul>

                            {/* /.End Footer Link  */}
                        </div>
                        <div className="col-6 col-sm-4 col-md-4 col-lg-auto col-xl-2 py-3 py-md-5">
                      
                            {/* /Start Footer Link  */}
                            <ul className="list-unstyled social-icon">
                                <li>
                                <Link href="#" className="align-items-center d-flex">
                                        <div className="align-items-center bg-primary d-flex d-inline-block fs-19 icon-wrap justify-content-center me-3 rounded-2 text-center text-white dri"><i className="fab fa-dribbble"></i></div>Dribbble
                                    </Link>
                                </li>
                            </ul>
                            {/* /.End Footer Link  */}

                        </div>
                        <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 py-3 py-md-5 d-lg-none d-xl-block">
                      
                            {/* /Start Footer Link  */}

                            <ul className="list-unstyled social-icon">
                                <li>
                                <Link href="#" className="align-items-center d-flex">
                                        <div className="align-items-center bg-primary d-flex d-inline-block fs-19 icon-wrap justify-content-center me-3 rounded-2 text-center text-white fb"><i className="fab fa-facebook-f"></i></div>Facebook
                                    </Link>
                                </li>
                            </ul>
                            {/* /.End Footer Link */}
                        </div>
                        <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 py-3 py-md-5 d-lg-none d-xl-block">
          
                            {/* /Start Footer Link  */}

                            <ul className="list-unstyled social-icon">
                                <li>
                                <Link href="#" className="align-items-center d-flex">
                                        <div className="align-items-center bg-primary d-flex d-inline-block fs-19 icon-wrap justify-content-center me-3 rounded-2 text-center text-white whatsapp"><i className="fa-brands fa-whatsapp"></i></div>WhatsApp
                                    </Link>
                                </li>
                            </ul>
                            {/* /.End Footer Link */}
                        </div>

                    </div>
                    <hr className="mb-0 mt-4" />
                    <div className="py-4">
                        {/* Start Sub Footer Nav */}

                        {/*  /. End Sub Footer Nav */}
                        <div className="align-items-center row mb-2">
                            {/* Start Footer Logo */}
                            <div className="col-sm-auto footer-logo mb-3 mb-sm-0">
                                <img className="footer-logo__dark" src="assets/img/new/logo-white-transparent.svg" alt="" />
                            </div>
                            {/* /.End Footer Logo  */}
                            {/* Start Copy Rights Text */}
                            <div className="col-sm-auto copy">© 2024 Niya-Estates - All Rights Reserved</div>
                            {/* /.End Copy Rights Text */}
                        </div>
                    </div>
                </div>
            </footer>
            {/* /.End Footer */}
        </>
    );
}
