import React, { useState, useEffect, useCallback } from 'react';

import GoodCard from '../../shared/GoodCard/GoodCard';
import UtilityModal from '../../shared/UtilityModal/UtilityModal';
import PaymentMethodRadios from '../../shared/PaymentMethodRadios/PaymentMethodRadios';

import basketData from '../../../helpers/data/basketData';

import './BasketDetail.scss';

const BasketDetail = ({ match, history }) => {
  // Initializing an empty object to state to hold the value of the requested basket object.
  const [basket, setBasket] = useState({});
  // Initializing an empty array in state to hold multiple objects that could be nested within the requested basket object.
  const [goods, setGoods] = useState([]);
  // Boolean state variable to determine if component is mounted.
  const [isMounted, setIsMounted] = useState(false);

  // Function that saves the consumerId from the router url params,
  // calls the function that requests a single basket from the /baskets API route,
  // and then reduces duplicate good objects within the response down to an array of single instances of a particular good
  // and adds a property on to that good that counts the number of times it appears in the basket
  // while also totaling up the cost for all the goods in the basket.
  const getOrder = useCallback(() => {
    const { consumerId } = match.params;
    basketData.getBasketByConsumerId(consumerId)
      .then((response) => {
        if (isMounted) {
          const currentBasket = response.data;
          if (currentBasket.id) {
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
        }
      })
      .catch((err) => console.error('There was an error getting this consumer\'s current basket:', err));
  }, [isMounted, match.params]);

  // When the component mounts, sets the respective state variable to true, and calls the functions to request the necessary data.
  // Sets the repective value back to false upon unmount to prevent data leak.
  useEffect(() => {
    setIsMounted(true);
    getOrder();
    return () => setIsMounted(false);
  }, [getOrder]);

  const handleCompleteBasket = (selectedPaymentMethodId) => {
    basketData.completeCustomerBasketById(basket.id, selectedPaymentMethodId, basket.total)
      .then((response) => {
        const completedBasket = response.data;
        history.push({
          pathname: '/confirmation',
          state: { basket: completedBasket },
        });
      })
      .catch((err) => console.error('There was an error completing this basket:', err));
  };

  return (
    <div className="BasketDetail good-container py-5">
        <div className="col-12 container-fluid d-flex flex-wrap justify-content-center align-items-start">
            {
              basket.id
                ? goods.map((good) => (
                  <GoodCard key={good.id} good={good} isBasket={true} />
                ))
                : (
                  <h2 className="my-5 display-4">Your basket is empty!</h2>
                )
            }
        </div>
        <h3 className="my-5 basket-total">Basket Total: ${basket.id ? basket.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '0.00'}</h3>
        <UtilityModal
          disabled={goods.length === 0}
          buttonLabel={'Checkout'}
          buttonClassName={'btn-success'}
          isDelete={false}
          isPaymentMethodRadio={true}
        >
          <PaymentMethodRadios handleCompleteBasket={handleCompleteBasket} />
        </UtilityModal>
    </div>
  );
};

export default BasketDetail;
