import React from 'react';

import './MarketCard.scss';

const MarketCard = ({ market }) => (
    <div className="MarketCard col-12">
        <div className="jumbotron text-center hoverable p-4">
            <div className="row">
                <div className="col-md-4 offset-md-1 mx-3 my-3">
                    <div className="view overlay">
                        <img src={market.image} className="img-fluid" alt={market.name} />
                    </div>
                </div>
                <div className="col-md-7 text-md-left ml-3 mt-3">
                    <h4 className="h4 mb-4">{market.name}</h4>
                    <p className="font-weight-normal">{market.description}</p>
                    <p className="font-weight-normal">Zip Code: <strong>{market.zip_code}</strong></p>
                </div>
            </div>
        </div>
    </div>
);

export default MarketCard;
