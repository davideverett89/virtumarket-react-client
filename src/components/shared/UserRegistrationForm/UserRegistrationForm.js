import React, { useState } from 'react';

import UserRoleDropDown from '../UserRoleDropDown/UserRoleDropDown';

import './UserRegistrationForm.scss';

const UserRegistrationForm = () => {
  const [selectedRole, setSelectedRole] = useState('');
  return (
    <div className="UserRegistrationForm">
        <h1>Register</h1>
        <form className="col-6 m-auto">
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter New Username" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" placeholder="Enter New Email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="text" className="form-control" id="password" placeholder="Enter New Password" />
            </div>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input type="text" className="form-control" id="first_name" placeholder="Enter First Name" />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" className="form-control" id="last_name" placeholder="Enter Last Name" />
            </div>
            <div className="form-group">
                <label htmlFor="company_name">Company Name</label>
                <input type="text" className="form-control" id="company_name" placeholder="Enter Company Name" />
            </div>
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="text" className="form-control" id="image" placeholder="Paste Image URL" />
            </div>
            <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input type="text" className="form-control" id="phone_number" placeholder="Password" />
            </div>
            <div className="form-group">
                <label htmlFor="phone_number">Select Your Role</label>
                <UserRoleDropDown selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
            </div>
            <button type="button" className="btn btn-success" disabled={selectedRole === ''}>Register</button>
        </form>
    </div>
  );
};

export default UserRegistrationForm;
