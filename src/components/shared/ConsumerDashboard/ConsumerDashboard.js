import React, { useState, useEffect, useCallback } from 'react';

import MarketCard from '../MarketCard/MarketCard';
import SearchBar from '../SearchBar/SearchBar';

import marketData from '../../../helpers/data/marketData';

import './ConsumerDashboard.scss';

const ConsumerDashboard = () => {
  // Initializing an empty array in state to hold mutiple objects from the markets collection.
  const [markets, setMarkets] = useState([]);
  // Boolean state variable to determine if component is mounted.
  const [isMounted, setIsMounted] = useState(false);
  // Initializing a string state variable to contain the value of the search input.
  const [search, setSearch] = useState('');
  // Initializing a string state variable to contain the value of the property by which a market will be filtered.
  const [selectedFilter, setSelectedFilter] = useState('zip_code');

  // Event handler function that takes the value of the search input and sets the respective state variable.
  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = e.target.value.substr(0);
    setSearch(searchParams);
  };

  // Function that will call the function that requests all markets from the /markets API route.
  const getMarkets = useCallback(() => {
    marketData.getMarkets()
      .then((allMarkets) => {
        if (isMounted) {
          setMarkets(allMarkets);
        }
      })
      .catch((err) => console.error('There was an issue getting all markets:', err));
  }, [isMounted, setMarkets]);

  // When the component mounts, sets the respective state variable to true, and calls the functions to request the necessary data.
  // Sets the repective value back to false upon unmount to prevent data leak.
  useEffect(() => {
    setIsMounted(true);
    getMarkets();
    return () => setIsMounted(false);
  }, [isMounted, getMarkets]);

  // Filters the array of markets in state by the property that is selected and stored as selectedFilter,
  // that matches the search input in state.
  const filteredMarkets = markets.filter((market) => market[selectedFilter].toString().indexOf(search) !== -1);

  return (
    <div className="ConsumerDashboard text-center mb-5">
        <SearchBar marketDetail={false} handleSearch={handleSearch} search={search} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
            {
                filteredMarkets.length > 0 && isMounted
                  ? filteredMarkets.map((market) => (
                    <MarketCard key={market.id} market={market} fromConsumer={true} />
                  ))
                  : (
                    <h2 className="mx-auto my-5 display-3">No Markets Match Your Search!</h2>
                  )
            }
        </div>
    </div>
  );
};

export default ConsumerDashboard;
