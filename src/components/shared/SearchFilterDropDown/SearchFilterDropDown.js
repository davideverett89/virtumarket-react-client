import React from 'react';

import './SearchFilterDropDown.scss';

const SearchFilterDropDown = ({ selectedFilter, setSelectedFilter, marketDetail }) => (
    <select
        type="dropdown"
        name="searchFilterDropDown"
        onChange={(e) => setSelectedFilter(e.target.value)}
        className="mx-3"
        value={selectedFilter}
        required
    >
        {
            marketDetail
              ? (
                <option
                    className="dropdown-item"
                    value="name"
                >
                    Name
                </option>
              )
              : (
                <React.Fragment>
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
                </React.Fragment>
              )
        }
    </select>
);

export default SearchFilterDropDown;
