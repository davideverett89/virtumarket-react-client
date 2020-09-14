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

import MyNavBar from '../components/shared/MyNavBar/MyNavBar';

import useSimpleAuth from '../helpers/data/authData';

import './App.scss';

const App = () => {
  const [authed, setAuthed] = useState(false);
  const [userRole, setUserRole] = useState('');
  const { isAuthenticated } = useSimpleAuth();

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, [isAuthenticated]);

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'));
  }, [authed, userRole]);

  const PublicRoute = ({ component: Component, isAuthed, ...rest }) => {
    const routeChecker = (props) => (isAuthed === false
      ? (<Component {...props} setAuthed={setAuthed} />)
      : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
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
      <BrowserRouter>
        <React.Fragment>
          <MyNavBar authed={authed} setAuthed={setAuthed} />
          <Switch>
            <PrivateRoute path='/home' component={Home} isAuthed={authed} />
            <PrivateRoute path='/goods/add/' component={AddGood} isAuthed={authed} />
            <PrivateRoute path='/goods/edit/:goodId' component={EditGood} isAuthed={authed} />
            <PrivateRoute path='/goods/:goodId' component={GoodDetail} isAuthed={authed} />
            <PrivateRoute path='/accounts' component={ProfileDetail} isAuthed={authed} />
            <PrivateRoute path='/accounts/edit/:userId' component={EditProfile} isAuthed={authed} />
            <PrivateRoute path='/merchants/orders' component={OrderHistory} isAuthed={authed} />
            <PrivateRoute path='/merchants/orders/:orderId' component={OrderDetail} isAuthed={authed} />
            <PublicRoute path='/auth' component={Auth} isAuthed={authed} setAuthed={setAuthed} />
            <Redirect from="*" to="/home"/>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
