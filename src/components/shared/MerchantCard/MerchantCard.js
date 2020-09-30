import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './MerchantCard.scss';

const MerchantCard = ({ merchant }) => {
  const detailLink = `/merchants/${merchant.id}`;
  return (
        <div className="MerchantCard col-12 mx-auto">
            <div className="merchant-jumbo jumbotron text-center hoverable p-4">
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
                        <Link to={detailLink} className="my-2 col-2 btn btn-success">Shop</Link>
                    </div>
                </div>
            </div>
        </div>
  );
};

MerchantCard.propTypes = {
  merchant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    company_name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    profile_image: PropTypes.string.isRequired,
    booth_image: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    market_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
  }),
};

export default MerchantCard;
