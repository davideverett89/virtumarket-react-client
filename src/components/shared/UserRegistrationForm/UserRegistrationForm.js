import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';

import UserRoleDropDown from '../UserRoleDropDown/UserRoleDropDown';
import DropDown from '../DropDown/DropDown';

import useSimpleAuth from '../../../helpers/data/authData';
import marketData from '../../../helpers/data/marketData';

import './UserRegistrationForm.scss';

const UserRegistrationForm = ({ setAuthed, route }) => {
  const [markets, setMarkets] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const companyName = useRef();
  const profileImage = useRef();
  const boothImage = useRef();
  const phoneNumber = useRef();
  const bio = useRef();
  const { register } = useSimpleAuth();

  const getAllMarkets = useCallback(() => {
    marketData.getMarkets()
      .then((allMarkets) => {
        if (isMounted) {
          setMarkets(allMarkets);
        }
      })
      .catch((err) => console.error('There was an issue getting all markets:', err));
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
    getAllMarkets();
    return () => setIsMounted(false);
  }, [isMounted, getAllMarkets]);

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      username: username.current.value,
      bio: bio.current.value,
      email: email.current.value,
      password: password.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      profile_image: profileImage.current.value,
      phone_number: phoneNumber.current.value,
    };
    if (selectedRole === 'merchant') {
      newUser.market_id = parseInt(selectedId, 10);
      newUser.company_name = companyName.current.value;
      newUser.booth_image = boothImage.current.value;
    }
    register(newUser, selectedRole)
      .then((res) => {
        if (res[0] === true) {
          setAuthed(true);
          route(res[1], res[2], res[3]);
        }
      })
      .catch((err) => console.error('There was an issue with registering a new user:', err));
  };

  return (
    <div className="UserRegistrationForm">
        <form className="col-6 mx-auto mb-3 text-left">
            <div className="form-group">
                <label className="mr-2" htmlFor="account_type">Select Account Type:</label>
                <UserRoleDropDown selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
            </div>
            {
                selectedRole === 'merchant'
                  ? (
                <React.Fragment>
                  <div className="form-group">
                      <label htmlFor="company_name">Company Name:</label>
                      <input ref={companyName} type="text" className="form-control" id="company_name" placeholder="Enter Company Name" required/>
                  </div>
                  <div className="form-group">
                    <label className="mr-2" htmlFor="market_type">Select Market:</label>
                    <DropDown resources={markets} selectedId={selectedId} setSelectedId={setSelectedId} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="booth-image">Booth Image:</label>
                    <input ref={boothImage} type="text" className="form-control" id="booth-image" placeholder="Paste Image URL" required/>
                  </div>
                </React.Fragment>
                  )
                  : ('')
            }
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input ref={username} type="text" className="form-control" id="username" placeholder="Enter New Username" required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input ref={email} type="text" className="form-control" id="email" placeholder="Enter New Email" required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input ref={password} type="password" className="form-control" id="password" placeholder="Enter New Password" required/>
            </div>
            <div className="form-group">
                <label htmlFor="first_name">First Name:</label>
                <input ref={firstName} type="text" className="form-control" id="first_name" placeholder="Enter First Name" required/>
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Last Name:</label>
                <input ref={lastName} type="text" className="form-control" id="last_name" placeholder="Enter Last Name" required/>
            </div>
            <div className="form-group">
                <label htmlFor="profile-image">Profile Image:</label>
                <input ref={profileImage} type="text" className="form-control" id="profile-image" placeholder="Paste Image URL" required/>
            </div>
            <div className="form-group">
                <label htmlFor="phone_number">Phone Number:</label>
                <input ref={phoneNumber} type="text" className="form-control" id="phone_number" placeholder="Enter Phone Number" required/>
            </div>
            <div className="form-group">
                <label htmlFor="bio">Phone Number:</label>
                <textarea ref={bio} name="bio" className="form-control" id="bio" placeholder="Tell Us About Yourself..." required/>
            </div>
            <button type="button" className="btn btn-success" disabled={selectedRole === '' || (selectedRole === 'merchant' && selectedId === 0)} onClick={handleRegister}>Register</button>
        </form>
    </div>
  );
};

export default UserRegistrationForm;
