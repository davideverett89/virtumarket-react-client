import React, { useState, useEffect, useCallback } from 'react';

import GoodCard from '../../shared/GoodCard/GoodCard';

import basketData from '../../../helpers/data/basketData';

import './OrderDetail.scss';

const OrderDetail = ({ match }) => {
  const [basket, setBasket] = useState({});
  const [goods, setGoods] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const getOrder = useCallback(() => {
    const { consumerId } = match.params;
    basketData.getBasketByConsumerId(consumerId)
      .then((response) => {
        if (isMounted) {
          const currentBasket = response.data;
          setBasket(currentBasket);
          setGoods(currentBasket.goods);
        }
      })
      .catch((err) => console.error('There was an error getting this consumer\'s current basket:', err));
  }, [isMounted, match.params]);

  useEffect(() => {
    setIsMounted(true);
    getOrder();
    return () => setIsMounted(false);
  }, [getOrder]);

  return (
    <div className="OrderDetail">
        <h1 className="display-1 mb-5">Basket Contents</h1>
        <div className="d-flex flex-column justify-content-center align-items-center">
            {
              basket.id
                ? goods.map((good) => (
                  <GoodCard key={good.id} good={good} />
                ))
                : (
                  <h2 className="display-4">Your basket is empty!</h2>
                )
            }
        </div>
    </div>
  );
};

export default OrderDetail;
