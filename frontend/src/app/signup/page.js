"use client"

import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  const confirmInputType = isConfirmPasswordVisible ? 'text' : 'password';
  const inputType = isPasswordVisible ? 'text' : 'password';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setIsPasswordMatch(false);    
      console.log(isPasswordMatch);

      return;
    }
    
    const res = await fetch(baseURL+'/auth/register', {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name,
        email,
        password,
        phone_number,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      console.log(data);
      window.location.href = "/signin";
    }
  }

  return (
    <Layout>
      {/* Start Main Content */}

      <form className="register-form" onSubmit={handleSubmit}> 
   
 
      <div className="main-content">
  
        <div className="border-bottom py-3">
          <div className="container">
            {/* Start Back To Search */}
            <Link
              href="/"
              className="align-items-center d-flex fw-medium text-primary"
            >
              <i className="fa-solid fa-chevron-left me-1" />
              Back To Home
            </Link>
            {/* /. End Back To Search */}
          </div>
        </div>
        <div className="py-5">
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-sm-10 col-lg-10">
                <div className="align-items-center g-4 row">
                  <div className="col-lg-6 col-xl-5 text-center">
                    {/* Start Header Text */}
                    <div className="text-center mb-4">
                      <h3 className="fw-semibold">Sign up your your <span className="underline position-relative text-primary">account!</span></h3>
                      <p className="text-muted text-center mb-0">
                        Start your 15-day trial, no credit card required
                      </p>
                    </div>
                    {/* /.End Header Text */}
                    {/* Start Social Button Wrapper */}
                    <div className="d-grid gap-3 mb-3">
                      {/* Start Social login Button */}
                      <Link
                        className="align-items-center bg-grey btn btn-lg d-flex linkedin-btn position-relative text-start"
                        href="#"
                      >
                        <img src="assets/img/linkdin.svg" alt="" />
                        <span className="ms-3">Sign up with LinkedIn</span>
                      </Link>
                      {/* /.End Social login Button */}
                      {/* Start Social login Button */}
                      <Link
                        className="bg-grey btn btn-lg google-btn d-flex align-items-center position-relative text-start"
                        href="#"
                      >
                        <img src="assets/img/google.svg" alt="" />
                        <span className="ms-3">Sign up with Google</span>
                      </Link>
                      {/* Start Social login Button */}
                    </div>
                    {/* /.End Social Button Wrapper */}
                    {/* Start Text */}
                    <p>
                      We won't post anything without your permission and your
                      personal details are kept private
                    </p>
                    {/* /.End Text */}
                    {/* Start Divider */}
                    <div className="align-items-center d-flex my-4">
                      <hr className="flex-grow-1 m-0" />
                      <span className="fs-16 fw-bold px-3 text-dark">Or</span>
                      <hr className="flex-grow-1 m-0" />
                    </div>
                    {/* /.End Divider */}
                      {isPasswordMatch === false && (
                        <div className="alert alert-danger" role="alert">
                          Passwords do not match
                        </div>
                      )
                      }

                      {/* Start Form Group */}
                      <div className="form-group mb-4">
                    
                        <label className="required">Full Name</label>
                        <input type="text" className="form-control" required onChange={ e => setFullName(e.target.value)}/>
                      </div>
                      {/* /.End Form Group */}
                      {/* Start Form Group */}
                      <div className="form-group mb-4">
                        <label className="required">Enter Email</label>
                        <input type="email" className="form-control" required onChange={ e => setEmail(e.target.value)}/>
                      </div>
                      <div className="form-group mb-4">
                        <label className="required">Phone Number</label>
                        <input type="text" className="form-control" required onChange={ e => setPhoneNumber(e.target.value)}/>
                      </div>
                      {/* /.End Form Group */}
                      {/* Start Form Group */}
                      <div className="form-group mb-4">
                        <label className="required">Password</label>
                        <input
                          id="password"
                          type={inputType}
                          className="form-control password"
                          autoComplete="off"
                          required onChange={ e => setPassword(e.target.value)}
                        />
                        <i
                          className={`toggle-password ${isPasswordVisible ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'
                            }`}
                          onClick={togglePasswordVisibility}
                        ></i>
                      </div>
                      {/* /.End Form Group */}
                      {/* Start Form Group */}
                      <div className="form-group mb-4">
                        <label className="required">Confirm Password</label>
                        <input
                          id="confirmPassword"
                          type={confirmInputType}
                          className="form-control c-password"
                          autoComplete="off"
                          required onChange={ e => setConfirmPassword(e.target.value)}
                        />
                         <i
                          className={`toggle-password ${isConfirmPasswordVisible ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'
                            }`}
                          onClick={toggleConfirmPasswordVisibility}
                        ></i>
                      </div>
                      {/* /.End Form Group */}
                      {/* Start Checkbox */}
                      <div className="form-check mb-4 text-start">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault"> By signing up, you agree to the <Link href="terms-conditions" className="text-decoration-underline">terms of service</Link> </label>
                      </div>
                      {/* /.End Checkbox */}
                      {/* Start Button */}
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100"
                      >
                        Sign Up
                      </button>
                      {/* End Button */}
                
                    {/* Start Bottom Text */}
                    <div className="bottom-text text-center mt-3"> Already have an account? <Link href="signin" className="fw-medium text-decoration-underline">Sign In</Link> </div>
                    {/* /.End Bottom Text */}
                  </div>
                  <div className="col-lg-6 col-xl-7 order-lg-first pe-xl-5">
                    {/* Start Image */}
                    <img
                      src="assets/img/png-img/login.png"
                      alt=""
                      className="img-fluid"
                    />
                    {/* /.End Image */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      </form>
      {/* /. End Main Content */}
    </Layout>
  );
};
