import React, { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';

import userData from '../../../helpers/data/userData';

import './ProfileDetail.scss';

const ProfileDetail = ({ match }) => {
  const [user, setUser] = useState({});
  const [merchant, setMerchant] = useState({});
  const [market, setMarket] = useState({});
  const [isMounted, setIsMounted] = useState(false);

  const getCurrentUser = useCallback(() => {
    const { userId } = match.params;
    userData.getUserById(userId)
      .then((response) => {
        if (isMounted) {
          const currentUser = response.data;
          setUser(currentUser);
          setMerchant(currentUser.merchant);
          setMarket(currentUser.merchant.market);
        }
      })
      .catch((err) => console.error('There was an issue getting this user:', err));
  }, [match.params, isMounted]);

  useEffect(() => {
    setIsMounted(true);
    getCurrentUser();
    return () => setIsMounted(false);
  }, [getCurrentUser]);

  return (
    <div className="ProfileDetail">
        <h1 className="mt-3 display-4">Profile Details</h1>
        <div className="px-0 col-10 m-auto container card">
            <div className="row card-body">
                <div className="col-2">
                    <img className="my-3 card-img-top" src={merchant.image} alt={merchant.name} />
                    <p className="lead m-0">Reputation: 4,567</p>
                </div>
                <div className="text-left col-6">
                    <div>
                        <h3>{user.first_name} {user.last_name}</h3>
                        <h4>{user.username}</h4>
                        <p className="lead">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
                <div className="text-left col-4">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Email: {user.email}</li>
                        <li class="list-group-item">Date Joined: {user.date_joined}</li>
                        <li class="list-group-item">Organization: {merchant.company_name}</li>
                        <li class="list-group-item">Phone Number: {merchant.phone_number}</li>
                    </ul>
                </div>
            </div>
            <div className="p-3 card-footer d-flex align-items-center justify-content-start">
                <Link className="mx-2 btn btn-warning">Update</Link>
                <button className="mx-2 btn btn-danger">Delete</button>
            </div>
        </div>
    </div>
  );
};

export default ProfileDetail;
