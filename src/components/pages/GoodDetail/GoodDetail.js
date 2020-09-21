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

  const editLink = `/goods/edit/${good.id}`;

  return (
    <div className="GoodDetail d-flex flex-column justify-content-center align-items-center mb-5">
        <h1 className="display-4">{good.name}</h1>
        <img className="m-auto img-fluid col-6" src={good.image} alt={good.name} />
        <h2>Product Details:</h2>
        <p className="lead">${good.price}</p>
        <p className="lead">{good.description}</p>
        <div className="mb-3 d-flex flex-row justify-content-center align-align-items-center">
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
                <button className="btn btn-success" onClick={handleAddToBasket}>Add To Basket</button>
              )
          }
        </div>
    </div>
  );
};

export default GoodDetail;
