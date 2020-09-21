import React from 'react';

import './SearchFilterDropDown.scss';

const SearchFilterDropDown = ({ selectedFilter, setSelectedFilter }) => (
    <select
        type="dropdown"
        name="searchFilterDropDown"
        onChange={(e) => setSelectedFilter(e.target.value)}
        className="mx-3"
        value={selectedFilter}
        required
    >
        <option
            className="dropdown-item"
            value="zip_code"
        >
            Zip Code
        </option>
        <option
            className="dropdown-item"
            value="name"
        >
            Name
        </option>
    </select>
);

export default SearchFilterDropDown;
