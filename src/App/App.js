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
import OrderHistory from '../components/pages/OrderHistory/OrderHistory';
import OrderDetail from '../components/pages/OrderDetail/OrderDetail';
import MarketDetail from '../components/pages/MarketDetail/MarketDetail';
import FarewellPage from '../components/pages/FarewellPage/FarewellPage';

import MyNavBar from '../components/shared/MyNavBar/MyNavBar';

import useSimpleAuth from '../helpers/data/authData';

import './App.scss';
import MerchantDashboard from '../components/shared/MerchantDashboard/MerchantDashboard';

const App = () => {
  const [authed, setAuthed] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [roleId, setRoleId] = useState(0);
  const [uid, setUid] = useState(0);
  const { isAuthenticated } = useSimpleAuth();

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, [isAuthenticated]);

  useEffect(() => {
    setUserRole(sessionStorage.getItem('userRole'));
    setRoleId(sessionStorage.getItem('roleId'));
    setUid(sessionStorage.getItem('userId'));
  }, [authed, userRole]);

  const PublicRoute = ({ component: Component, isAuthed, ...rest }) => {
    const routeChecker = (props) => (isAuthed === false
      ? (<Component {...props} setRoleId={setRoleId} setUid={setUid} />)
      : (<Redirect to={{ pathname: `/home/${userRole}s/${roleId}`, state: { from: props.location } }} />));
    return <Route {...rest} render={(props) => routeChecker(props)} />;
  };

  const PrivateRoute = ({ component: Component, isAuthed, ...rest }) => {
    const routeChecker = (props) => (isAuthed === true
      ? (<Component {...props} />)
      : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
    return <Route {...rest} render={(props) => routeChecker(props)} />;
  };

  return (
    <div className="App">
      <img className="col-12 img-fluid background-image p-0" src="https://static.wixstatic.com/media/7f0eae_1c9d6673c5d5420c98fd74743ffbc58d~mv2_d_3456_2304_s_2.jpg" alt="background" />
      <BrowserRouter>
        <React.Fragment>
          <MyNavBar authed={authed} setAuthed={setAuthed} roleId={roleId} uid={uid} />
          <Switch>
            <PrivateRoute path='/home' component={Home} isAuthed={authed} />
            <PrivateRoute path='/goods/add/' component={AddGood} isAuthed={authed} />
            <PrivateRoute path='/goods/edit/:goodId' component={EditGood} isAuthed={authed} />
            <PrivateRoute path='/goods/:goodId' component={GoodDetail} isAuthed={authed} />
            <PrivateRoute path='/accounts/edit/:userId' component={EditProfile} isAuthed={authed} />
            <PrivateRoute path='/accounts/:userId' component={ProfileDetail} isAuthed={authed} />
            <PrivateRoute path='/markets/:marketId' component={MarketDetail} isAuthed={authed} />
            <PrivateRoute path='/consumers/basket/:consumerId' component={OrderDetail} isAuthed={authed} />
            <PrivateRoute path='/merchants/orders' component={OrderHistory} isAuthed={authed} />
            <PrivateRoute path='/merchants/:merchantId' component={MerchantDashboard} isAuthed={authed} />
            <PublicRoute path='/farewell' component={FarewellPage} isAuthed={authed} />
            <PublicRoute path='/auth' component={Auth} isAuthed={authed} />
            <Redirect from="*" to={`/home/${userRole}s/${roleId}`}/>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
