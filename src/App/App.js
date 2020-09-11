import React, { useState } from 'react';

import MyNavBar from '../components/shared/MyNavBar/MyNavBar';
import Auth from '../components/pages/Auth/Auth';

import './App.scss';

const App = () => {
  const [authed, setAuthed] = useState(false);

  return (
    <div className="App">
      <MyNavBar setAuthed={setAuthed} />
      <Auth setAuthed={setAuthed} />
    </div>
  );
};

export default App;
