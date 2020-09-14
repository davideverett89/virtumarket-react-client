import React from 'react';

import './DropDown.scss';

const DropDown = ({ resources, selectedId, setSelectedId }) => (
      <select
        name="dropDown"
        className="DropDown"
        onChange={(e) => setSelectedId(e.target.value)}
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

export default DropDown;
