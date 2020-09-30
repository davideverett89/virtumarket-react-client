import React, { useState, useEffect, useCallback } from 'react';

import MerchantCard from '../../shared/MerchantCard/MerchantCard';
import SearchBar from '../../shared/SearchBar/SearchBar';

import marketData from '../../../helpers/data/marketData';
import merchantData from '../../../helpers/data/merchantData';

import './MarketDetail.scss';

const MarketDetail = ({ match }) => {
  // Initializing an empty object in state to hold the respective values of the requested market object.
  const [market, setMarket] = useState({});
  // Initializing an empty array in state to hold multiple merchant objects that are nested within the requested market object.
  const [merchants, setMerchants] = useState([]);
  // Boolean state variable to determine if component is mounted.
  const [isMounted, setIsMounted] = useState(false);
  // Initialzing a state string variable to hold the value of the property by which markets will be filtered.
  const [selectedFilter, setSelectedFilter] = useState('name');

  // Event handler function that saves the marketId from the router url params,
  // saves the value of the input field that triggered the event,
  // and if that value is not an empty string, calls the function that makes a special query request to the API,
  // and passes in the needed marketId, the property value by which to filter, and the search value to query the property filter by.
  // If the input field does contain an empty string, it just gets all the markets.
  const handleSearch = (e) => {
    const { marketId } = match.params;
    e.preventDefault();
    const search = e.target.value.substr(0);
    if (search !== '') {
      merchantData.queryMerchantInventory(marketId, selectedFilter, search)
        .then((response) => {
          const filteredMerchants = response.data;
          setMerchants(filteredMerchants);
        })
        .catch((err) => console.error('There was an issue searching for merchants:', err));
    } else {
      getMarket();
    }
  };
  // Function that saves the marketId from the route url params,
  // then calls the function that requests a single market object from the /markets API route,
  // passes in the needed marketId, and sets the response to the respective state variables.
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

  // When the component mounts, sets the respective state variable to true, and calls the functions to request the necessary data.
  // Sets the repective value back to false upon unmount to prevent data leak.
  useEffect(() => {
    setIsMounted(true);
    getMarket();
    return () => setIsMounted(false);
  }, [getMarket]);

  return (
        <div className="MarketDetail text-center mb-5">
            <img className="col-6 my-3" src={market.image} alt={market.name} />
            <div className="border border-dark bio pt-5 pb-1 px-4 col-10 mx-auto my-5 jumbotron bg-white">
                <p className="lead">{market.description}</p>
                <SearchBar marketDetail={true} handleSearch={handleSearch} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
            </div>
            <div className="merchant-container container-fluid d-flex-flex-column justify-content-center align-items-center">
                {
                  merchants.length > 0
                    ? merchants.map((merchant) => (
                        <MerchantCard key={merchant.id} merchant={merchant} />
                    ))
                    : (
                    <h2 className="text-white display-4">No Merchants Available.</h2>
                    )
                }
            </div>
        </div>
  );
};

export default MarketDetail;
