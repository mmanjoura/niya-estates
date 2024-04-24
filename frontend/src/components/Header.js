
"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
    { href: '/properties-list?property-type=buy', text: 'Buy' },
    { href: '/properties-list?property-type=rent', text: 'Rent' },
    { href: '/properties-list?property-type=new', text: 'New Houses' },
    { href: '/properties-list?property-type=commercial', text: 'Commercial' },
  

    { href: '/#', text: 'Property Management' },
    { href: '/#', text: 'Valuation & Advisory' },
    { href: '/post-property', text: 'Sell your House' },
    { href: '/#', text: 'Notary & Law' },

    { href: '/post-property', text: 'List Property' },
    { href: '/post-agent', text: 'Register as Agent' },
    { href: '/post-image', text: 'Add Property Images' },
    { href: '/backup', text: 'Backup Database' },
  
   
    { href: '/properties-list?property-type=commercial', text: 'Commercial' },


    { href: '/properties-list', text: 'Properties List' },
    { href: '/properties-grid', text: 'Properties Grid' },
    { href: '/property-details', text: 'Property Details 1' },
    { href: '/property-details-2', text: 'Property Details 2' },
    { href: '/about', text: 'About Us' },
    { href: '/agent-list', text: 'Agents List' },
    { href: '/agent-grid', text: 'Agents Grid' },
    { href: '/agent-details', text: 'Agent Details' },
    { href: '/post-property', text: 'Post Property' },
    { href: '/locations', text: 'Locations' },
    { href: '/contact', text: 'Contact Us' },
    { href: '/blog-1', text: 'Blog 1' },
    { href: '/blog-2', text: 'Blog 2' },
    { href: '/blog-details', text: 'Blog Details' },
    { href: '/signin', text: 'Sign In' },
    { href: '/signup', text: 'Sign Up' },
    { href: '/forgot-password', text: 'Forgot Password' },
    { href: '/two-factor-auth', text: 'Two factor authentication' },
    { href: '/terms-conditions', text: 'Terms & Conditions' },
    { href: '/not_found', text: '404 Page' },
    { href: '/505', text: '505 Page' },
    { href: '/style-guide', text: 'Style Guide' },
  ];
  
export default function Header() {
    const [hasLogo, setHasLogo] = useState(false);
    const [userType, setUserType] = useState(null);
    const [fullName, setFullName] = useState(null);
    
    const path=usePathname()
    
    console.log("User Type", userType)

    function handleLogoutClick() {
    //   remove user info from local storage
        window.localStorage.removeItem('user_type');
        window.localStorage.removeItem('full_name');
      }

    useEffect(() => {
        setUserType(window.localStorage.getItem('user_type'));
        setFullName(window.localStorage.getItem('full_name'));
        const handleScroll = () => {
            const scroll = window.scrollY;
            if (scroll >= 81) {
                setHasLogo(true);
            } else {
                setHasLogo(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            {/* Start Topbar */}
            <div className="topbar d-none d-lg-block topbar-bg bg-primary text-white">
                <div className="container">
                    <div className="row align-items-center position-relative z-1">
                        <div className="col-md-4 col-lg-3 col-xl-3">
                            <Link href="/" className="headerLogo"><img src="assets/img/new/logo-white-transparent.svg"  alt="" /></Link>
                        </div>
                        <div className="col-md-8 col-lg-9 col-xl-8 d-none d-md-block">
                            <div className="d-flex justify-content-end">
                                {/* You can add translation here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /.End Topbar */}
            {/* Start Navbar */}
            <div className={hasLogo ? 'has-logo navbar-wrap sticky-top' : 'no-logo navbar-wrap sticky-top'}>
                <div className="container-lg nav-container position-relative">
                    <nav className="custom-navbar navbar navbar-expand-lg">
                        {/* Start Navbar Brand */}
                        <Link className="border-end navbar-brand pe-3 pe-sm-4 py-0" href="/">
                            <img className="logo-dark" src="assets/img/new/logo-blue-transparent.svg" alt="" height="40px"/>
                            <img className="logo-white" src="assets/img/new/logo-white-transparent.svg" alt="" />
                        </Link>
                        {/* End Navbar Brand */}
                        {/* Start Navbar Collapse */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* Start Navbar Collapse Header */}
                            <div className="align-items-center border-bottom d-flex d-lg-none justify-content-between mb-3 navbar-collapse__header pb-3">
                                {/* Start Brand Logo For Mobile */}
                                <div className="collapse-brand flex-shrink-0">
                                    <Link href="/"><img src="assets/img/new/logo-blue-transparent.svg" alt="" /></Link>
                                </div>
                                {/* End Brand Logo For Mobile */}
                                {/* Start Collapse Close Button */}
                                <div className="flex-grow-1 ms-3 text-end">
                                    <button type="button" className="bg-transparent border-0 collapse-close p-0 position-relative" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span></span> <span></span>
                                    </button>
                                </div>
                                {/* End Collapse Close Button */}
                            </div>
                            {/* End Navbar Collapse Header */}
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Properties
                                    </Link>
                                    <ul className="dropdown-menu">
                                    {
                                                    links?.slice(0,4).map((link)=>{
                                                        return(
                                                            <Link key={`${link.href}${link.text}`} href={link.href} className={`dropdown-item col-6 ${path === link.href ? '' : ''}`}>
                                                                    {link.text}
                                                            </Link>
                                                      
                                                            
                                                        )
                                                    })
                                                  }
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Services
                                    </Link>
                                    <ul className="dropdown-menu">
                                    {
                                                    links?.slice(5,8).map((link)=>{
                                                        return(
                                                            <Link key={`${link.href}${link.text}`} href={link.href} className={`dropdown-item col-6 ${path === link.href ? '' : ''}`}>
                                                                    {link.text}
                                                            </Link>
                                                      
                                                            
                                                        )
                                                    })
                                                  }
                                    </ul>
                                </li>
                                <li className="nav-item"><Link className="nav-link" href="properties-list?property-type=new">New Houses</Link></li>
                            
                                <li className="nav-item"><Link className="nav-link" href="contact">Contact</Link></li>
                                {/* Show admin link if the user is user */}
                                {userType &&   
                                      <li className="nav-item dropdown">
                                      <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                      Dashboard
                                      </Link>
                                      <ul className="dropdown-menu">
                                      {
                                                      links?.slice(8,12).map((link)=>{
                                                          return(
                                                              <Link key={`${link.href}${link.text}`} href={link.href} className={`dropdown-item col-6 ${path === link.href ? '' : ''}`}>
                                                                      {link.text}
                                                              </Link>
                                                        
                                                              
                                                          )
                                                      })
                                                    }
                                      </ul>
                                  </li>
                                }                             
                            
                                </ul>
                        
                        </div>
                        {/*  /. End Navbar Collapse */}
                        <div className="d-flex gap-1 ms-lg-5">
                
                            {/* Start Cart Button */}
                         
                            {userType &&   <Link href="/" data-bs-toggle="modal" data-bs-target="#cartEmpty" className="align-items-center btn cart-button d-none d-xl-flex ms-2 ms-lg-0">
                                <i className="fa-solid fa-house"></i>
                                <span className="ms-2">{fullName}</span>
                                <span className="align-items-center cart-quantity d-flex fw-bold justify-content-center ms-2 rounded-circle">0</span>
                            </Link>
                            }                        
                      
                         
                            {/* For Mobile */}
                            <Link href="/" className="btn btn-primary d-none d-sm-inline-block d-xl-none"><i className="fa-solid fa-house"></i></Link>
                            {/*  /. End Cart Button */}
                            {/* Start Login & Signup Button */}
                            {userType ?
                            <Link href="signin" className="btn btn-primary btn-login hstack gap-2" onClick={handleLogoutClick}>
                                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                <div className="vr d-none d-sm-inline-block"></div>
                                <span className="d-none d-sm-inline-block">Logout</span>
                            </Link>
                            :
                            <Link href="signin" className="btn btn-primary btn-login hstack gap-2">
                                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                <div className="vr d-none d-sm-inline-block"></div>
                                <span className="d-none d-sm-inline-block">Login / Signup</span>
                            </Link>
                            }

                        
    
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            {/*  /. End Navbar Toggler Buton */}
                        </div>
                    </nav>
                </div>
                {/* /.End of navbar */}
            </div>
            {/* /.End of navbar */}
            {/* Start Cart Empty Modal */}
            <div
                className="modal fade"
                id="cartEmpty"
                tabIndex={-1}
                aria-labelledby="cartEmptyLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="cartEmptyLabel">
                                Your Cart
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <p className="py-5 text-center">No items found.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* /.End Cart Empty Modal */}
        </>
    );
}
