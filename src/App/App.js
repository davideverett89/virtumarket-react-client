import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import AddGood from '../components/pages/AddGood/AddGood';
import GoodDetail from '../components/pages/GoodDetail/GoodDetail';
import EditGood from '../components/pages/EditGood/EditGood';
import ProfileDetail from '../components/pages/ProfileDetail/ProfileDetail';
import EditProfile from '../components/pages/EditProfile/EditProfile';
import BasketDetail from '../components/pages/BasketDetail/BasketDetail';
import MarketDetail from '../components/pages/MarketDetail/MarketDetail';
import OrderConfirmation from '../components/pages/OrderConfirmation/OrderConfirmation';

import MerchantDashboard from '../components/shared/MerchantDashboard/MerchantDashboard';
import MyNavBar from '../components/shared/MyNavBar/MyNavBar';

import useSimpleAuth from '../helpers/data/authData';

import './App.scss';

const App = () => {
  const { isAuthenticated } = useSimpleAuth();
  const [authed, setAuthed] = useState(isAuthenticated());
  const [userRole, setUserRole] = useState('');
  const [roleId, setRoleId] = useState(0);
  const [uid, setUid] = useState(0);

  useEffect(() => {
    setAuthed(isAuthenticated());
    setUserRole(sessionStorage.getItem('userRole'));
    setRoleId(sessionStorage.getItem('roleId'));
    setUid(sessionStorage.getItem('userId'));
  }, [userRole, isAuthenticated]);

  const PublicRoute = ({ component: Component, ...rest }) => {
    const routeChecker = (props) => (authed === false
      ? (<Component {...props} setRoleId={setRoleId} setUid={setUid} />)
      : (<Redirect to={{ pathname: `/home/${userRole}s/${roleId}`, state: { from: props.location } }} />));
    return <Route {...rest} render={(props) => routeChecker(props)} />;
  };

  const PrivateRoute = ({ component: Component, ...rest }) => {
    const routeChecker = (props) => (authed === true
      ? (<Component {...props} />)
      : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
    return <Route {...rest} render={(props) => routeChecker(props)} />;
  };

  return (
    <div className="App">
      <img className="col-12 img-fluid background-image p-0" src="https://static.wixstatic.com/media/7f0eae_1c9d6673c5d5420c98fd74743ffbc58d~mv2_d_3456_2304_s_2.jpg" alt="background" />
      <BrowserRouter>
        <React.Fragment>
          <MyNavBar authed={isAuthenticated()} setAuthed={setAuthed} roleId={roleId} uid={uid} />
          <Switch>
            <PrivateRoute path='/home' component={Home} authed={isAuthenticated()} />
            <PrivateRoute path='/goods/add/' component={AddGood} authed={isAuthenticated()} />
            <PrivateRoute path='/goods/edit/:goodId' component={EditGood} authed={isAuthenticated()} />
            <PrivateRoute path='/goods/:goodId' component={GoodDetail} authed={isAuthenticated()} />
            <PrivateRoute path='/accounts/edit/:userId' component={EditProfile} authed={isAuthenticated()} />
            <PrivateRoute path='/accounts/:userId' component={ProfileDetail} authed={isAuthenticated()} />
            <PrivateRoute path='/markets/:marketId' component={MarketDetail} authed={isAuthenticated()} />
            <PrivateRoute path='/consumers/basket/:consumerId' component={BasketDetail} authed={isAuthenticated()} />
            <PrivateRoute path='/merchants/:merchantId' component={MerchantDashboard} authed={isAuthenticated()} />
            <PrivateRoute path='/confirmation' component={OrderConfirmation} authed={isAuthenticated()} />
            <PublicRoute path='/auth' component={Auth} authed={isAuthenticated()} />
            <Redirect from="*" to={`/home/${userRole}s/${roleId}`}/>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
