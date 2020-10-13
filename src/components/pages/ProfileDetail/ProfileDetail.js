import React, { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';
import MarketCard from '../../shared/MarketCard/MarketCard';
import UtilityModal from '../../shared/UtilityModal/UtilityModal';

import userData from '../../../helpers/data/userData';

import './ProfileDetail.scss';
import paymentMethodData from '../../../helpers/data/paymentMethodData';

const ProfileDetail = ({ match }) => {
  // Initializing an empty object to state to hold the value of the requested user object.
  const [user, setUser] = useState({});
  // Initializing an empty object in state to hold the respective values of the merchant object nested within the requested user object.
  const [merchant, setMerchant] = useState({});
  // Initializing an empty object in state to hold the respective values of the consumer object nested within the requested user object.
  const [consumer, setConsumer] = useState({});
  // Initializing an empty object in state to hold the value of the request users current market.
  const [market, setMarket] = useState({});
  // Initializing an empty array in state to hold mutiple objects from the paymentMethods collection.
  const [paymentMethods, setPaymentMethods] = useState([]);
  // Boolean state variable to determine if component is mounted.
  const [isMounted, setIsMounted] = useState(false);

  // Function that saves the userId from the router url params,
  // calls the function that makes the API call to get a single user object,
  // passes in the needed userId,
  // and sets the response to the respective state variables.
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

  // When the component mounts, sets the respective state variable to true, and calls the functions to request the necessary data.
  // Sets the repective value back to false upon unmount to prevent data leak.
  useEffect(() => {
    setIsMounted(true);
    getCurrentUser();
    return () => setIsMounted(false);
  }, [getCurrentUser]);

  // Event handler function that accepts a paymentMethodId as an argument
  // and then calls the function that make a delete request to the /paymentmethods API route,
  // passes in the needed paymentMethodId, and then calls the current user object again.
  const handleDeletePaymentMethod = (paymentMethodId) => {
    paymentMethodData.deletePaymentMethod(paymentMethodId)
      .then(() => {
        getCurrentUser();
      })
      .catch((err) => console.error('There was an issue deleting this payment method:', err));
  };

  const editLink = `/accounts/edit/${user.id}`;

  return (
    <div className={`ProfileDetail ${merchant.id ? '' : 'd-flex flex-column justify-content-center align-items-center'}`}>
        <div className="my-5 px-0 col-9 mx-auto container card profile-card">
            <div className="row card-body">
                <div className="col-2">
                    <img className="card-img-top" src={merchant.id ? merchant.profile_image : consumer.profile_image} alt={user.username} />
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
                      buttonClassName={'btn btn-success'}
                      buttonLabel={'View Payment Types'}
                      getCurrentUser={getCurrentUser}
                    >
                      {
                        paymentMethods.length === 0
                          ? (<h3>No Payment Methods On Record</h3>)
                          : (
                            paymentMethods.map((paymentMethod) => (
                            <ul key={paymentMethod.id} className="mx-2 my-3 border border-dark list-group">
                              <li className="list-group-item">Merchant: {paymentMethod.merchant_name}</li>
                              <li className="list-group-item">Account Number: {paymentMethod.account_number}</li>
                              <li className="list-group-item">Exp. Date: {paymentMethod.expiration_date}</li>
                              <li className="list-group-item"><button className="btn btn-danger" onClick={() => handleDeletePaymentMethod(paymentMethod.id)}>Delete</button></li>
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
          merchant.id && market.id
            ? (
            <div className="my-5 container card col-9 mx-auto active-market">
              <h2 className="display-4">Active Market</h2>
              <MarketCard market={market} fromConsumer={false} />
            </div>
            )
            : ('')
        }
    </div>
  );
};

export default ProfileDetail;
