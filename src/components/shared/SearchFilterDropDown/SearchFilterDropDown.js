import React from 'react';
import PropTypes from 'prop-types';

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
                  <React.Fragment>
                    <option
                        className="dropdown-item"
                        value="name"
                    >
                        Name
                    </option>
                    <option
                        className="dropdown-item"
                        value="type"
                    >
                        Type
                    </option>
                  </React.Fragment>
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

SearchFilterDropDown.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
  marketDetail: PropTypes.bool.isRequired,
};

export default SearchFilterDropDown;
