import React from 'react';

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
                <label className="mx-1" htmlFor="search">Search {marketDetail ? 'Merchants' : 'Markets'} By:</label>
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

export default SearchBar;
