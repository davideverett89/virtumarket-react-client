import React from 'react';

import { Link } from 'react-router-dom';

import './MerchantCard.scss';

const MerchantCard = ({ merchant }) => {
  const detailLink = `/merchants/${merchant.id}`;
  return (
        <div className="MerchantCard col-12">
            <div className="jumbotron text-center hoverable p-4">
                <div className="row">
                    <div className="col-md-4 offset-md-1 mx-3 my-3">
                        <div className="view overlay">
                            <img src={merchant.profile_image} className="col-6 img-fluid merchant-image" alt={merchant.company_name} />
                        </div>
                    </div>
                    <div className="col-md-7 text-md-left ml-3 mt-3">
                        <h4 className="h4 mb-4">{merchant.company_name}</h4>
                        <p className="font-weight-normal">{merchant.bio}</p>
                        <p className="font-weight-normal">Phone Number: <strong>{merchant.phone_number}</strong></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Link to={detailLink} className="my-2 col-2 btn btn-primary">Shop</Link>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default MerchantCard;
