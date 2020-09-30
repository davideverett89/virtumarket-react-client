import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import GoodCard from '../GoodCard/GoodCard';

import merchantData from '../../../helpers/data/merchantData';
import goodData from '../../../helpers/data/goodData';

import './MerchantDashboard.scss';

const MerchantDashboard = ({ match, authed }) => {
  // Initialzing an empty object in state to hold the value of the request merchant object.
  const [merchant, setMerchant] = useState({});
  // Initializing an empty array in state to hold mutiple objects from the goods collection.
  const [goods, setGoods] = useState([]);
  // Boolean state variable to determine if component is mounted.
  const [isMounted, setIsMounted] = useState(false);
  // Boolean value to determine if the component is rendering while the current user is a merchant or not.
  const [userIsMerchant, setUserIsMerchant] = useState(false);

  // Function that saves the merchantId from the router url params,
  // calls the function that makes the request for a single merchant object from the /merchants API route,
  // and then sets the respective variables in state.
  const getMerchant = useCallback(() => {
    const { merchantId } = match.params;
    merchantData.getMerchantById(merchantId)
      .then((response) => {
        if (isMounted) {
          const currentMerchant = response.data;
          setMerchant(currentMerchant);
          setGoods(currentMerchant.goods);
          const { path } = match;
          const subPath = '/home';
          if (path.includes(subPath)) {
            setUserIsMerchant(true);
          }
        }
      })
      .catch((err) => console.error('There was an issue getting this merchant:', err));
  }, [isMounted, match]);

  // When the component mounts, sets the respective state variable to true, and calls the functions to request the necessary data.
  // Sets the repective value back to false upon unmount to prevent data leak.
  useEffect(() => {
    setIsMounted(true);
    getMerchant();
    return () => setIsMounted(false);
  }, [authed, isMounted, getMerchant]);

  // Event handler function that accepts a goodId as an argument,
  // and then calls the function that makes the delete request to the /goods API route,
  // passing in the needed goodId.
  const handleDelete = (goodId) => {
    goodData.deleteGood(goodId)
      .then(() => {
        getMerchant();
      })
      .catch((err) => console.error('There was an issue deleting this good:', err));
  };

  return (
<div className="MerchantDashboard good-container col-12 d-flex flex-column justify-content-center align-items-center" >
  <img className="col-12 img-fluid booth-image p-0" src={merchant.booth_image} alt={merchant.company_name} />
  <div className="py-2 merchant-jumbo col-12 mx-auto jumbotron jumbotron-fluid my-3 d-flex flex-row align-items-center justify-content-center">
      <div className="mr-5 image-container col-2">
        <img id="profile_image" className="border border-dark profile-image rounded-circle img-fluid" src={merchant.profile_image} alt={merchant.company_name} />
      </div>
      <h1 className="rounded ml-5 mt-3 display-4 col-6 offset-4 p-2 bg-white border border-dark">{merchant.company_name}</h1>
  </div>
  <div className="col-12 booth container-fluid mb-3 p-0">
    <div className="p-3 mb-3 col-12 good-container d-flex flex-wrap justify-content-center align-items-start">
        {
          goods.length === 0
            ? (
            <h3 className="middle align-middle display-4">This Booth Is Empty!</h3>
            )
            : goods.map((good) => (
            <GoodCard key={good.id} good={good} handleDelete={handleDelete} userIsMerchant={userIsMerchant} isBasket={false} />
            ))
        }
    </div>
  </div>
</div>
  );
};

MerchantDashboard.propTypes = {
  authed: PropTypes.bool,
};

export default MerchantDashboard;
