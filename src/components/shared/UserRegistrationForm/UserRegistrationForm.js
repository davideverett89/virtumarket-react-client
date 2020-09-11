import React, { useState, useRef } from 'react';

import UserRoleDropDown from '../UserRoleDropDown/UserRoleDropDown';

import useSimpleAuth from '../../../helpers/data/authData';

import './UserRegistrationForm.scss';

const UserRegistrationForm = ({ setAuthed }) => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const companyName = useRef();
  const image = useRef();
  const phoneNumber = useRef();
  const [selectedRole, setSelectedRole] = useState('');
  const { register } = useSimpleAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      company_name: companyName.current.value,
      image: image.current.value,
      phone_number: phoneNumber.current.value,
    };
    if (selectedRole === 'merchant') {
      newUser.market_id = 1;
    }
    register(newUser, selectedRole)
      .then(() => {
        console.log('New user was registered!');
        setAuthed(true);
      })
      .catch((err) => console.error('There was an issue with registering a new user:', err));
  };

  return (
    <div className="UserRegistrationForm">
        <h1>Register</h1>
        <form className="col-6 m-auto">
            <div className="form-group">
                <label htmlFor="phone_number">Select Your Role</label>
                <UserRoleDropDown selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
            </div>
            {
                selectedRole === 'merchant'
                  ? (
                <div className="form-group">
                    <label htmlFor="company_name">Company Name</label>
                    <input ref={companyName} type="text" className="form-control" id="company_name" placeholder="Enter Company Name" />
                </div>
                  )
                  : ('')
            }
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input ref={username} type="text" className="form-control" id="username" placeholder="Enter New Username" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input ref={email} type="text" className="form-control" id="email" placeholder="Enter New Email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input ref={password} type="text" className="form-control" id="password" placeholder="Enter New Password" />
            </div>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input ref={firstName} type="text" className="form-control" id="first_name" placeholder="Enter First Name" />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input ref={lastName} type="text" className="form-control" id="last_name" placeholder="Enter Last Name" />
            </div>
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input ref={image} type="text" className="form-control" id="image" placeholder="Paste Image URL" />
            </div>
            <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input ref={phoneNumber} type="text" className="form-control" id="phone_number" placeholder="Password" />
            </div>
            <button type="button" className="btn btn-success" disabled={selectedRole === ''} onClick={handleRegister}>Register</button>
        </form>
    </div>
  );
};

export default UserRegistrationForm;
