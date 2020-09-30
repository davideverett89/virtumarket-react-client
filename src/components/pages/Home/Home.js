import React from 'react';
import PropTypes from 'prop-types';

import {
  Route,
  Switch,
} from 'react-router-dom';

import MerchantDashboard from '../../shared/MerchantDashboard/MerchantDashboard';
import ConsumerDashboard from '../../shared/ConsumerDashboard/ConsumerDashboard';

import './Home.scss';

const Home = ({
  authed,
  match,
}) => (
        <div className="Home">
            <Switch>
              <Route
                path={`${match.path}/merchants/:merchantId`}
                component={MerchantDashboard}
                authed={authed}
              />
              <Route
                path={`${match.path}/consumers/:consumerId`}
                component={ConsumerDashboard}
                authed={authed}
              />
            </Switch>
        </div>
);

Home.propTypes = {
  authed: PropTypes.bool,
};

export default Home;
