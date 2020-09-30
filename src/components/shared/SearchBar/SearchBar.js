import React from 'react';
import PropTypes from 'prop-types';

import SearchFilterDropDown from '../SearchFilterDropDown/SearchFilterDropDown';

import './SearchBar.scss';

const SearchBar = ({
  handleSearch,
  search,
  selectedFilter,
  setSelectedFilter,
  marketDetail,
}) => (
    <div className="SearchBar my-5">
        <form className="form-inline d-flex flex-row justify-content-center align-items-center">
            <div className="d-flex flex-row">
                <label className="mx-1" htmlFor="search">Search {marketDetail ? 'Merchant Inventory' : 'Markets'} By:</label>
                <SearchFilterDropDown marketDetail={marketDetail} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
            </div>
            <input
                id="search"
                className="form-control col-6"
                type="search"
                placeholder={marketDetail ? 'Search Merchants...' : 'Search Markets...'}
                aria-label="Search"
                value={search}
                onChange={handleSearch}
            />
        </form>
    </div>
);

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  selectedFilter: PropTypes.number.isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
  marketDetail: PropTypes.bool.isRequired,
};

export default SearchBar;
