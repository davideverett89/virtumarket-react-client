import React from 'react';
import PropTypes from 'prop-types';

import './UserRoleDropDown.scss';

const UserRoleDropDown = ({ selectedRole, setSelectedRole }) => (
    <select
        type="dropdown"
        name="userRoleDropDown"
        onChange={(e) => setSelectedRole(e.target.value)}
        required
    >
        {
            selectedRole === ''
              ? (<option>Please Choose One</option>)
              : ('')
        }
        <option
            className="dropdown-item"
            value="merchant"
        >
            Merchant
        </option>
        <option
            className="dropdown-item"
            value="consumer"
        >
            Consumer
        </option>
    </select>
);

UserRoleDropDown.propTypes = {
  selectedRole: PropTypes.number.isRequired,
  setSelectedRole: PropTypes.func.isRequired,
};

export default UserRoleDropDown;
