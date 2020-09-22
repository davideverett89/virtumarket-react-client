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
          currentBasket.total = 0;
          const condensedGoods = currentBasket.goods.reduce((acc, curr) => {
            const findMultiple = acc.findIndex((x) => x.id === curr.id);
            if (findMultiple === -1) {
              const newObj = { ...curr };
              newObj.quantity_in_basket = 1;
              currentBasket.total += parseFloat(newObj.price);
              acc.push(newObj);
            } else {
              acc[findMultiple].quantity_in_basket += 1;
              currentBasket.total += parseFloat(acc[findMultiple].price);
            }
            return acc;
          }, []);
          setBasket(currentBasket);
          setGoods(condensedGoods);
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
        <div className="col-12 container-fluid d-flex flex-wrap justify-content-center align-items-start">
            {
              basket.id
                ? goods.map((good) => (
                  <GoodCard key={good.id} good={good} isBasket={true} />
                ))
                : (
                  <h2 className="display-4">Your basket is empty!</h2>
                )
            }
        </div>
          <h3 className="my-5 basket-total">Basket Total: ${basket.id ? basket.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : ''}</h3>
    </div>
  );
};

export default OrderDetail;
