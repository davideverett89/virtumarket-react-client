import React, { useState, useEffect } from 'react';

import GoodCard from '../GoodCard/GoodCard';

import merchantData from '../../../helpers/data/merchantData';
import goodData from '../../../helpers/data/goodData';

import './MerchantDashboard.scss';

const MerchantDashboard = ({ match }) => {
  const [merchant, setMerchant] = useState({});
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getMerchant = () => {
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
    };
    getMerchant();
    return () => {
      isMounted = false;
    };
  }, [match.params, goods]);

  const handleDelete = (goodId) => {
    goodData.deleteGood(goodId)
      .then(() => {
      })
      .catch((err) => console.error('There was an issue deleting this good:', err));
  };

  return (
<div className="MerchantDashboard col-12 d-flex flex-column justify-content-center align-items-center">
    <h1 className="mt-3">{merchant.company_name}</h1>
    <h3>{merchant.phone_number}</h3>
    <img className="img-fluid col-4" src={merchant.image} alt={merchant.company_name} />
    <div className="col-12 good-container d-flex flex-column justify-content-center align-items-center">
        {
            goods.map((good) => (
                <GoodCard key={good.id} good={good} handleDelete={handleDelete} />
            ))
        }
    </div>
</div>
  );
};

export default MerchantDashboard;
