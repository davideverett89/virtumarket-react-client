import React, { useState, useEffect, useCallback } from 'react';

import MerchantCard from '../../shared/MerchantCard/MerchantCard';

import marketData from '../../../helpers/data/marketData';

import './MarketDetail.scss';

const MarketDetail = ({ match }) => {
  const [market, setMarket] = useState({});
  const [merchants, setMerchants] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const getMarket = useCallback(() => {
    const { marketId } = match.params;
    marketData.getMarketById(marketId)
      .then((response) => {
        if (isMounted) {
          const currentMarket = response.data;
          setMarket(currentMarket);
          setMerchants(currentMarket.merchants);
        }
      })
      .catch((err) => console.error('There was an issue getting this market:', err));
  }, [isMounted, match.params]);

  useEffect(() => {
    setIsMounted(true);
    getMarket();
    return () => setIsMounted(false);
  }, [getMarket]);

  return (
        <div className="MarketDetail text-center mb-5">
            <img className="col-6 my-3" src={market.image} alt={market.name} />
            <div className="bio col-10 mx-auto my-5">
                <p className="lead">{market.description}</p>
            </div>
            <div className="merchant-container container-fluid d-flex-flex-column justify-content-center align-items-center">
                {
                  merchants.length > 0
                    ? merchants.map((merchant) => (
                        <MerchantCard key={merchant.id} merchant={merchant} />
                    ))
                    : (
                    <h2 className="display-4">No Merchants Available.</h2>
                    )
                }
            </div>
        </div>
  );
};

export default MarketDetail;
