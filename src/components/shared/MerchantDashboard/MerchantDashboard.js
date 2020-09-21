import React, { useState, useEffect, useCallback } from 'react';

import GoodCard from '../GoodCard/GoodCard';

import merchantData from '../../../helpers/data/merchantData';
import goodData from '../../../helpers/data/goodData';

import './MerchantDashboard.scss';

const MerchantDashboard = ({ match, authed }) => {
  const [merchant, setMerchant] = useState({});
  const [goods, setGoods] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [userIsMerchant, setUserIsMerchant] = useState(false);

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

  useEffect(() => {
    setIsMounted(true);
    getMerchant();
    return () => setIsMounted(false);
  }, [authed, isMounted, getMerchant]);

  const handleDelete = (goodId) => {
    goodData.deleteGood(goodId)
      .then(() => {
        getMerchant();
      })
      .catch((err) => console.error('There was an issue deleting this good:', err));
  };

  return (
<div className="MerchantDashboard col-12 d-flex flex-column justify-content-center align-items-center" >
  <img className="col-12 img-fluid booth-image p-0" src={merchant.booth_image} alt={merchant.company_name} />
  <div className="merchant-jumbo bg-light col-12 mx-auto jumbotron border border-secondary my-3 d-flex flex-row align-items-center justify-content-center py-3">
      <div className="col-2">
        <img id="profile_image" className="profile-image img-thumbnail rounded-circle" src={merchant.profile_image} alt={merchant.company_name} />
      </div>
      <h1 className="mt-3 display-4">{merchant.company_name}</h1>
  </div>
  <div className="col-12 booth container-fluid mb-3 p-0">
    <div className="px-5 py-3 mb-3 col-12 good-container d-flex flex-wrap justify-content-center align-items-start">
        {
          goods.length === 0
            ? (
            <h3 className="middle align-middle display-4">This Booth Is Empty!</h3>
            )
            : goods.map((good) => (
            <GoodCard key={good.id} good={good} handleDelete={handleDelete} userIsMerchant={userIsMerchant} />
            ))
        }
    </div>
  </div>
</div>
  );
};

export default MerchantDashboard;
