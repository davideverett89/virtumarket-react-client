import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './OrderConfirmation.scss';

const OrderConfirmation = ({ location }) => {
  const [completedBasket, setCompletedBasket] = useState({});
  useEffect(() => {
    const { basket } = location.state;
    setCompletedBasket(basket);
  }, [location.state]);
  return (
    <div className="col-6 mt-5 bg-white OrderConfirmation d-flex flex-column justify-content-center align-items-center mx-auto jumbotron">
        <h1 className="display-4">Thank You!</h1>
        <p className="lead">Order # {completedBasket.id ? completedBasket.id : ''} has been submitted.</p>
        <p className="lead">Confirmation #: CONF-{Math.floor(Math.random() * 100000)}</p>
        <p className="lead">Number of Items: {completedBasket.id ? completedBasket.goods.length : ''} </p>
        <p className="lead">Basket Total: ${completedBasket.id ? completedBasket.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : ''}</p>
        <Link to="/" className="btn btn-success">Home</Link>
    </div>
  );
};
export default OrderConfirmation;
