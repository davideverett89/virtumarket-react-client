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
        <div className="MarketDetail d-flex flex-column align-items-center">
            <img className="col-6 my-3" src={market.image} alt={market.name} />
            <h1 className="display-4 mt-3">{market.name}</h1>
            <div className="bio col-9">
                <p className="lead">{market.description}</p>
            </div>
            <div className="merchant-container d-flex-flex-column justify-content-center align-items-center">
                {
                    merchants.map((merchant) => (
                        <MerchantCard key={merchant.id} merchant={merchant} />
                    ))
                }
            </div>
        </div>
  );
};

export default MarketDetail;
