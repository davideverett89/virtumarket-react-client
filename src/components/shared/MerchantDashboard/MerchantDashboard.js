import React, { useState, useEffect } from 'react';

import merchantData from '../../../helpers/data/merchantData';

import './MerchantDashboard.scss';

const MerchantDashboard = () => {
  const [merchant, setMerchant] = useState({});
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    merchantData.getMerchantRelatedToCurrentUser()
      .then((currentMerchant) => {
        setMerchant(currentMerchant);
        setGoods(currentMerchant.goods);
      })
      .catch((err) => console.error('There was an issue getting this merchant:', err));
  }, []);

  return (
        <div className="MerchantDashboard">
            <h1>{merchant.company_name}</h1>
            <h3>{merchant.phone_number}</h3>
            <img src={merchant.image} alt={merchant.company_name} />
            <div className="good-container">
                {
                    goods.map(({
                      id,
                      name,
                      image,
                      price,
                      description,
                      quantity,
                    }) => (
                        <div key={id} className="temp-card col-4">
                            <h3>{name}</h3>
                            <img src={image} alt={name} />
                            <ul className="list-group">
                                <li className="list-group-item">{price}</li>
                                <li className="list-group-item">{description}</li>
                                <li className="list-group-item">{quantity}</li>
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div>
  );
};

export default MerchantDashboard;
