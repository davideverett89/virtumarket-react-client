import React from 'react';

import SearchFilterDropDown from '../SearchFilterDropDown/SearchFilterDropDown';

import './SearchBar.scss';

const SearchBar = ({
  handleSearch,
  search,
  selectedFilter,
  setSelectedFilter,
}) => (
    <div className="SearchBar my-5">
        <form className="form-inline d-flex flex-row justify-content-center align-items-center">
            <div className="d-flex flex-row">
                <label className="mx-1" htmlFor="search">Search Markets By: </label>
                <SearchFilterDropDown selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
            </div>
            <input
                id="search"
                className="form-control col-6"
                type="search"
                placeholder="Search Markets..."
                aria-label="Search"
                value={search}
                onChange={handleSearch}
            />
        </form>
    </div>
);

export default SearchBar;
