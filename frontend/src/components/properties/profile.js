import React from 'react';

const Profile = ({ user }) => {
  if (!user) {
    return null; // Render nothing if user is undefined
  }

  return (
    <div className="shadow p-4 p-sm-5 rounded-4 mb-4">
      <div className="align-items-sm-center border-bottom d-sm-flex mb-5 pb-4">
        <div className="d-flex flex-shrink-0 gap-1">
          <span className="fw-semibold text-dark">01/</span>
          <div className="icon-box align-items-center bg-soft-primary d-flex justify-content-center mb-2 rounded-circle">
            <i className="fa-solid fa-user fs-3 text-primary" />
          </div>
        </div>
        <div className="flex-grow-1 ms-3">
          <h5 className="fw-semibold">{user.full_name}</h5>
          <p className="mb-0">
            There are many variations of passages of Lorem Ipsum
            <br className="d-none d-lg-block" /> available, but the majority have
          </p>
        </div>
      </div>
      <div className="row gx-3 gy-4">
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              disabled
              value={user.full_name || ''} // Ensure value is defined
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              value={user?.email || ''} // Ensure value is defined
              disabled
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={user?.phone_number || ''} // Ensure value is defined
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
