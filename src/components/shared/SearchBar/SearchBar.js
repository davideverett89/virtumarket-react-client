import React from 'react';

import './SearchBar.scss';

const SearchBar = ({ handleSearch, search }) => (
    <div className="SearchBar my-5">
        <form className="form-inline d-flex flex-row justify-content-center align-items-center">
            <label className="mx-3" htmlFor="search">Search Markets By: </label>
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
