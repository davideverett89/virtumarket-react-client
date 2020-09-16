import React, { useState, useEffect, useCallback } from 'react';

import MarketCard from '../MarketCard/MarketCard';
import SearchBar from '../SearchBar/SearchBar';

import marketData from '../../../helpers/data/marketData';

import './ConsumerDashboard.scss';

const ConsumerDashboard = () => {
  const [markets, setMarkets] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = e.target.value.substr(0);
    setSearch(searchParams);
  };

  const getMarkets = useCallback(() => {
    marketData.getMarkets()
      .then((allMarkets) => {
        if (isMounted) {
          setMarkets(allMarkets);
        }
      })
      .catch((err) => console.error('There was an issue getting all markets:', err));
  }, [isMounted, setMarkets]);

  useEffect(() => {
    setIsMounted(true);
    getMarkets();
    return () => setIsMounted(false);
  }, [isMounted, getMarkets]);

  const filteredMarkets = markets.filter((market) => market.zip_code.toString().indexOf(search) !== -1);

  return (
    <div className="ConsumerDashboard">
        <SearchBar handleSearch={handleSearch} search={search} />
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
            {
                filteredMarkets.length === 0
                  ? (
                    <h2 className="mx-auto my-5 display-3">No Markets Match Your Search!</h2>
                  )
                  : filteredMarkets.map((market) => (
                    <MarketCard key={market.id} market={market} />
                  ))
            }
        </div>
    </div>
  );
};

export default ConsumerDashboard;
