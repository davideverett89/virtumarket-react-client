import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import MerchantDashboard from '../../shared/MerchantDashboard/MerchantDashboard';
import ConsumerDashboard from '../../shared/ConsumerDashboard/ConsumerDashboard';

import './Home.scss';

const Home = ({ authed, match }) => (
        <div className="Home">
          <h1>Home</h1>
            <Switch>
              <Route path={`${match.path}/merchants/:merchantId`} component={MerchantDashboard} isAuthed={authed} />
              <Route path={`${match.path}/consumers/:consumerId`} component={ConsumerDashboard} isAuthed={authed} />
            </Switch>
        </div>
);

export default Home;
