import React from 'react';

import { Link } from 'react-router-dom';

import './FarewellPage.scss';

const FarewellPage = () => (
    <div className="FarewellPage d-flex flex-column justify-content-around align-items-center">
        <h1 className="display-1">We're Sad To See You Go!</h1>
        <Link className="btn btn-success" to="/auth">Back to Home</Link>
    </div>
);

export default FarewellPage;
