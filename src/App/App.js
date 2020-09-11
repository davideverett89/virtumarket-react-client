import React, { useState } from 'react';

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

import './App.scss';

const App = () => {
  const [authed, setAuthed] = useState(false);

  return (
    <div className="App">
      <MyNavBar setAuthed={setAuthed} />
      <Auth setAuthed={setAuthed} />
      <Home />
      <AddGood />
      <GoodDetail />
      <EditGood />
      <ProfileDetail />
      <EditProfile />
      <OrderHistory />
      <OrderDetail />
    </div>
  );
};

export default App;
