import React, { useState, useEffect, useCallback } from 'react';

import moment from 'moment';

import { Link } from 'react-router-dom';
import UtilityModal from '../../shared/UtilityModal/UtilityModal';

import goodData from '../../../helpers/data/goodData';

import './GoodDetail.scss';
import goodBasketData from '../../../helpers/data/goodBasketData';

const GoodDetail = ({ match, history }) => {
  // Initializing an empty object in state to hold the respective values of the requested good object.
  const [good, setGood] = useState({});
  // Initializing a state boolean variable to false to eventually indicate whether the user has a role of merchant or not.
  const [userIsMerchant, setUserIsMerchant] = useState(false);
  // Boolean state variable to determine if component is mounted.
  const [isMounted, setIsMounted] = useState(false);

  // Function that saves the goodId passed in to the router url params,
  // and then calls the function that requests a single good by id from the API,
  // passes in the needed goodId, and sets the response to state.
  const getGood = useCallback(() => {
    const { goodId } = match.params;
    goodData.getGoodById(goodId)
      .then((response) => {
        if (isMounted) {
          const singleGood = response.data;
          setGood(singleGood);
          const role = sessionStorage.getItem('userRole');
          if (role === 'merchant') {
            setUserIsMerchant(true);
          }
        }
      })
      .catch((err) => console.error('There was an issue getting this good:', err));
  }, [isMounted, match.params]);

  // When the component mounts, sets the respective state variable to true, and calls the functions to request the necessary data.
  // Sets the repective value back to false upon unmount to prevent data leak.
  useEffect(() => {
    setIsMounted(true);
    getGood();
    return () => setIsMounted(false);
  }, [getGood, match.params]);

  // Event handler function that saves the goodId from the router url params,
  // and then calls the function that makes a delete request to the /goods API route,
  // passes in the needed goodId, and then redirects the user back to the merchant dashboard.
  const handleDelete = (e) => {
    const { goodId } = match.params;
    e.preventDefault();
    goodData.deleteGood(goodId)
      .then(() => {
        history.push(`/home/${sessionStorage.getItem('userRole')}s/${sessionStorage.getItem('roleId')}`);
      })
      .catch((err) => console.error('There was an issue deleting this good:', err));
  };

  // Event handler function that saves the goodId from the router url params,
  // constructs a new goodBasket object using the current date in YYYY-MM-DD format and the parsed goodId,
  // then calls the function that makes a post request to the /goodbaskets API route and passes in the new goodBasket object.
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

  // Event handler function that will invoke the router's .goBack() method to redirect the user back to the dashboard.
  const handleGoBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const editLink = `/goods/edit/${good.id}`;

  return (
    <div className="GoodDetail d-flex flex-column justify-content-center align-items-center mb-5 col-10 mx-auto">
        <div className="mt-5 jumbotron bg-white col-9">
          <h1 className="display-4 mb-5">{good.name}</h1>
          <img className="m-auto img-fluid col-4" src={good.image} alt={good.name} />
          <ul className="col-6 mx-auto mt-5 list-group-flush p-0 rounded">
            <li className="list-group-item lead">{good.id ? good.good_type.name : ''}</li>
            <li className="list-group-item lead">${good.price}/{good.id ? good.unit_size.name : ''}</li>
            <li className="list-group-item lead">Quantity Available: {good.quantity}</li>
          </ul>
          <p className="bg-white mb-5 lead rounded">{good.description}</p>
          <div className="mb-3 d-flex flex-row justify-content-center align-items-center">
            {
              userIsMerchant
                ? (
                <React.Fragment>
                  <Link to={editLink} className="mx-3 btn btn-warning">Update</Link>
                  <UtilityModal
                    disabled={good.on_order}
                    buttonClassName={'mx-3 btn-danger'}
                    isDelete={true}
                    buttonLabel={good.on_order ? 'Sold' : 'Delete'}
                    modalTitle={'Are you sure?'}
                  >
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
    </div>
  );
};

export default GoodDetail;
