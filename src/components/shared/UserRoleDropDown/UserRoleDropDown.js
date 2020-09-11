import React from 'react';

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

export default UserRoleDropDown;
