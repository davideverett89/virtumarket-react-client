import React, { useState, useEffect } from 'react';

import moment from 'moment';

import { Link } from 'react-router-dom';
import UtilityModal from '../../shared/UtilityModal/UtilityModal';

import goodData from '../../../helpers/data/goodData';

import './GoodDetail.scss';
import goodBasketData from '../../../helpers/data/goodBasketData';

const GoodDetail = ({ match, history }) => {
  const [good, setGood] = useState({});
  const [userIsMerchant, setUserIsMerchant] = useState(false);

  useEffect(() => {
    const { goodId } = match.params;
    goodData.getGoodById(goodId)
      .then((response) => {
        const singleGood = response.data;
        setGood(singleGood);
        const role = sessionStorage.getItem('userRole');
        if (role === 'merchant') {
          setUserIsMerchant(true);
        }
      })
      .catch((err) => console.error('There was an issue getting this good:', err));
  }, [match.params]);

  const handleDelete = (e) => {
    const { goodId } = match.params;
    e.preventDefault();
    goodData.deleteGood(goodId)
      .then(() => {
        history.push(`/home/${sessionStorage.getItem('userRole')}s/${sessionStorage.getItem('roleId')}`);
      })
      .catch((err) => console.error('There was an issue deleting this good:', err));
  };

  const handleAddToBasket = (e) => {
    const { goodId } = match.params;
    e.preventDefault();
    const newGoodBasket = {
      date_added: moment().format('YYYY-MM-DD'),
      good_id: parseInt(goodId, 10),
    };
    goodBasketData.postGoodBasket(newGoodBasket)
      .then(() => {
        history.goBack();
      })
      .catch((err) => console.error('There was an issue adding this good to the basket:', err));
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const editLink = `/goods/edit/${good.id}`;

  return (
    <div className="GoodDetail d-flex flex-column justify-content-center align-items-center mb-5 col-10 mx-auto">
        <h1 className="display-4">{good.name}</h1>
        <img className="m-auto img-fluid col-6" src={good.image} alt={good.name} />
        <ul className="mt-5 list-group-flush p-0 col-6">
          <li className="list-group-item lead">{good.id ? good.good_type.name : ''}</li>
          <li className="list-group-item lead">${good.price}/{good.id ? good.unit_size.name : ''}</li>
          <li className="list-group-item lead">Quantity Available: {good.quantity}</li>
        </ul>
        <p className="mb-5 col-6 lead">{good.description}</p>
        <div className="mb-3 d-flex flex-row justify-content-center align-items-center">
          {
            userIsMerchant
              ? (
              <React.Fragment>
                <Link to={editLink} className="mx-3 btn btn-warning">Update</Link>
                <UtilityModal buttonClassName={'mx-3 btn-danger'} isDelete={true} buttonLabel={'Delete'} modalTitle={'Are you sure?'}>
                  <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
                </UtilityModal>
              </React.Fragment>
              )
              : (
                ''
              )
          }
          {
            !userIsMerchant && (good.quantity > 0)
              ? (
                <React.Fragment>
                  <button className="mx-3 btn btn-success" onClick={handleAddToBasket}>Add To Basket</button>
                  <button className="mx-3 btn btn-danger" onClick={handleGoBack}>Back</button>
                </React.Fragment>
              )
              : (
                ''
              )
          }
          {
            !userIsMerchant && (good.quantity === 0)
              ? (
              <h3>Product Is Sold Out</h3>
              )
              : (
                ''
              )
          }
        </div>
    </div>
  );
};

export default GoodDetail;
