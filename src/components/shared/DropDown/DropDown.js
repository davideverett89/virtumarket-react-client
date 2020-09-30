import React from 'react';
import PropTypes from 'prop-types';

import './DropDown.scss';

const DropDown = ({ resources, selectedId, setSelectedId }) => (
      <select
        name="dropDown"
        className="DropDown"
        onChange={(e) => setSelectedId(parseInt(e.target.value, 10))}
        value={selectedId}
        required
    >
        {
            selectedId === 0
              ? (<option>Please Make Selection</option>)
              : ('')
        }
        {
            resources.map(({ id, name }) => (
            <option
                key={id}
                className="dropdown-item"
                value={id}
            >
                {name}
            </option>
            ))
        }
      </select>
);

DropDown.propTypes = {
  resources: PropTypes.array.isRequired,
  selectedId: PropTypes.number.isRequired,
  setSelectedId: PropTypes.func.isRequired,
};

export default DropDown;
