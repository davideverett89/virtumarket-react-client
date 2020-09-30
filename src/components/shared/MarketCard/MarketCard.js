import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './MarketCard.scss';

const MarketCard = ({ market, fromConsumer }) => {
  const detailLink = `/markets/${market.id}`;
  return (
        <div className="MarketCard col-12 mx-auto">
            <div className="market-jumbo jumbotron text-center hoverable p-4">
                <div className="row">
                    <div className="col-md-4 offset-md-1 mx-3 my-3">
                        <div className="view overlay">
                            <img src={market.image} className="col-6 img-fluid market-image" alt={market.name} />
                        </div>
                    </div>
                    <div className="col-md-7 text-md-left ml-3 mt-3">
                        <h4 className="h4 mb-4">{market.name}</h4>
                        <p className="font-weight-normal">{market.description}</p>
                        <p className="font-weight-normal">Zip Code: <strong>{market.zip_code}</strong></p>
                    </div>
                </div>
                {
                    fromConsumer
                      ? (
                        <div className="row">
                            <div className="col-12">
                                <Link to={detailLink} className="my-2 col-2 btn btn-success">Enter</Link>
                            </div>
                        </div>
                      )
                      : (
                        ''
                      )
                }
            </div>
        </div>
  );
};

MarketCard.propTypes = {
  market: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    zip_code: PropTypes.number.isRequired,
    merchants: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      company_name: PropTypes.string.isRequired,
      profile_image: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      phone_number: PropTypes.string.isRequired,
      booth_image: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired,
      market_id: PropTypes.number.isRequired,
    })),
  }),
  fromConsumer: PropTypes.bool.isRequired,
};

export default MarketCard;
