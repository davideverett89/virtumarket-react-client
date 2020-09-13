import React, { useState, useEffect } from 'react';

import marketData from '../../../helpers/data/marketData';

import './MarketDropDown.scss';

const MarketDropDown = ({ selectedMarketId, setSelectedMarketId }) => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    marketData.getMarkets()
      .then((allMarkets) => {
        setMarkets(allMarkets);
      })
      .catch((err) => console.error('There was an issue getting all markets:', err));
  }, []);

  return (
      <select
        name="marketDropDown"
        className="MarketDropDown"
        onChange={(e) => setSelectedMarketId(e.target.value)}
        required
    >
        {
            selectedMarketId === 0
              ? (<option>Please Select Market</option>)
              : ('')
        }
        {
            markets.map(({ id, name }) => (
            <option
                key={id}
                className="dropdown-item"
                value={id}
            >
                {name}
            </option>
            ))
        }
      </select>
  );
};

export default MarketDropDown;
