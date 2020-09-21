import React from 'react';
import {
  Button,
} from 'reactstrap';

import { Link } from 'react-router-dom';

import UtilityModal from '../UtilityModal/UtilityModal';

import './GoodCard.scss';

const GoodCard = ({ good, handleDelete, userIsMerchant }) => {
  const detailLink = `/goods/${good.id}`;
  const editLink = `/goods/edit/${good.id}`;
  return (
    <div className="GoodCard col-9">
      <div className="jumbotron text-center hoverable p-4 border border-secondary m-0 good-jumbo">
          <div className="row">
              <div className="col-md-4 offset-md-1 mx-3 my-3">
                  <div className="view overlay">
                      <img src={good.image} className="col-6 img-fluid good-image" alt={good.name} />
                  </div>
              </div>
              <div className="col-md-7 text-md-left ml-3 mt-3 mb-2">
                  <h4 className="h4 mb-4">{good.name}</h4>
                  <p className="font-weight-normal">{good.price}</p>
                  <p className="font-weight-normal">{good.description}</p>
                  <p className="font-weight-normal">{good.quantity} in stock.</p>
              </div>
          </div>
          <div className="row">
              <div className="col-12 d-flex flex-row justify-content-center align-items-center">
                  <Link to={detailLink} className="mx-1 btn btn-primary">View</Link>
                  {
                    userIsMerchant
                      ? (
                      <React.Fragment>
                        <Link to={editLink} className="mx-1 btn btn-warning">Update</Link>
                        <UtilityModal buttonClassName={'mx-1 btn-danger'} isDelete={true} buttonLabel={'Delete'} modalTitle={'Are you sure?'}>
                          <Button className="btn btn-danger" onClick={() => handleDelete(good.id)}>Yes, Delete</Button>
                        </UtilityModal>
                      </React.Fragment>
                      ) : (
                        ''
                      )
                }
              </div>
          </div>
      </div>
    </div>
  );
};

export default GoodCard;
