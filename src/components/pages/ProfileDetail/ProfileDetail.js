import React, { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';
import MarketCard from '../../shared/MarketCard/MarketCard';
import UtilityModal from '../../shared/UtilityModal/UtilityModal';

import userData from '../../../helpers/data/userData';

import './ProfileDetail.scss';

const ProfileDetail = ({ match }) => {
  const [user, setUser] = useState({});
  const [merchant, setMerchant] = useState({});
  const [consumer, setConsumer] = useState({});
  const [market, setMarket] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const getCurrentUser = useCallback(() => {
    const { userId } = match.params;
    userData.getUserById(userId)
      .then((response) => {
        if (isMounted) {
          const currentUser = response.data;
          setUser(currentUser);
          if (currentUser.merchant !== null) {
            setMerchant(currentUser.merchant);
            setMarket(currentUser.merchant.market);
          } else {
            setConsumer(currentUser.consumer);
            setPaymentMethods(currentUser.consumer.paymentmethods);
          }
        }
      })
      .catch((err) => console.error('There was an issue getting this user:', err));
  }, [match.params, isMounted]);

  useEffect(() => {
    setIsMounted(true);
    getCurrentUser();
    return () => setIsMounted(false);
  }, [getCurrentUser]);

  const editLink = `/accounts/edit/${user.id}`;

  return (
    <div className="ProfileDetail ">
        <h1 className="mt-3 display-2">Profile Details</h1>
        <div className="px-0 col-12 m-auto container card">
            <div className="row card-body">
                <div className="col-2">
                    <img className="my-3 card-img-top" src={merchant.id ? merchant.profile_image : consumer.profile_image} alt={user.username} />
                    <p className="lead m-0">Reputation: {Math.floor(Math.random() * 5000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                </div>
                <div className="text-left col-6">
                    <div>
                        <h3>{user.first_name} {user.last_name}</h3>
                        <h4>{user.username}</h4>
                        <p className="lead">{merchant.id ? merchant.bio : consumer.bio}</p>
                    </div>
                </div>
                <div className="text-left col-4">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Email: {user.email}</li>
                        <li className="list-group-item">Date Joined: {user.date_joined}</li>
                        {
                          merchant.id
                            ? (<li className="list-group-item">Organization: {merchant.company_name}</li>)
                            : (<li className="list-group-item">Favorite Merchant: Dave's Farm Fresh Goods</li>)
                        }
                        <li className="list-group-item">Phone Number: {merchant.id ? merchant.phone_number : consumer.phone_number}</li>
                    </ul>
                </div>
            </div>
            <div className="p-3 card-footer d-flex align-items-center justify-content-start">
                <Link to={editLink} className="mx-2 btn btn-warning">Update</Link>
                {
                  consumer.id
                    ? (
                    <UtilityModal
                      isDelete={false}
                      modalTitle={'Payment Methods'}
                      className={'btn btn-primary'}
                      buttonLabel={'View Payment Types'}
                    >
                      {
                        paymentMethods.length === 0
                          ? (<h3>No Payment Methods On Record</h3>)
                          : (
                            paymentMethods.map((paymentMethod) => (
                            <ul key={paymentMethod.id} className="mx-2 my-3 border border-black list-group">
                              <li className="list-group-item">Merchant: {paymentMethod.merchant_name}</li>
                              <li className="list-group-item">Account Number: {paymentMethod.account_number}</li>
                              <li className="list-group-item">Exp. Date: {paymentMethod.expiration_date}</li>
                              <li className="list-group-item"><button className="btn btn-danger">Delete</button></li>
                            </ul>
                            ))
                          )
                      }
                    </UtilityModal>
                    )
                    : (
                      ''
                    )
                }
            </div>
        </div>
        {
          merchant.id
            ? (
            <div className="my-3 container card col-12">
              <h2 className="display-4">Active Market</h2>
              <MarketCard market={market} />
            </div>
            )
            : ('')
        }
    </div>
  );
};

export default ProfileDetail;
