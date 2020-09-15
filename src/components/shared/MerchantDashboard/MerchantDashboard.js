import React, { useState, useEffect, useCallback } from 'react';

import GoodCard from '../GoodCard/GoodCard';

import merchantData from '../../../helpers/data/merchantData';
import goodData from '../../../helpers/data/goodData';

import './MerchantDashboard.scss';

const MerchantDashboard = ({ match }) => {
  const [merchant, setMerchant] = useState({});
  const [goods, setGoods] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const getMerchant = useCallback(() => {
    const { merchantId } = match.params;
    merchantData.getMerchantById(merchantId)
      .then((response) => {
        if (isMounted) {
          const currentMerchant = response.data;
          setMerchant(currentMerchant);
          setGoods(currentMerchant.goods);
        }
      })
      .catch((err) => console.error('There was an issue getting this merchant:', err));
  }, [isMounted, match.params]);

  useEffect(() => {
    setIsMounted(true);
    getMerchant();
    return () => setIsMounted(false);
  }, [isMounted, getMerchant]);

  const handleDelete = (goodId) => {
    goodData.deleteGood(goodId)
      .then(() => {
        getMerchant();
      })
      .catch((err) => console.error('There was an issue deleting this good:', err));
  };

  return (
<div className="MerchantDashboard col-12 d-flex flex-column justify-content-center align-items-center" >
  <div className="bg-light border my-3 d-flex flex-row align-items-center justify-content-around">
    <img className="float-left profile-image img-fluid img-thumbnail col-4 my-3" src={merchant.profile_image} alt={merchant.company_name} />
    <h1 className="mt-3 display-1">{merchant.company_name}</h1>
  </div>
  <div className="col-12 booth container-fluid mb-3 p-0">
    <img className="col-12 img-fluid booth-image p-0 border border-dark" src={merchant.booth_image} alt={merchant.company_name} />
    <div className="p-5 col-12 good-container d-flex flex-wrap justify-content-center align-items-start">
        {
          goods.length === 0
            ? (
            <h3 className="middle align-middle display-4">This Booth Is Empty!</h3>
            )
            : goods.map((good) => (
            <GoodCard key={good.id} good={good} handleDelete={handleDelete} />
            ))
        }
    </div>
  </div>
</div>
  );
};

export default MerchantDashboard;
