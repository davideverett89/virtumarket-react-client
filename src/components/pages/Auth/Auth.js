import React, { useState } from 'react';

import UserRegistrationForm from '../../shared/UserRegistrationForm/UserRegistrationForm';
import UserAuthenticationForm from '../../shared/UserAuthenticationForm/UserAuthenticationForm';

import './Auth.scss';

const Auth = ({ setAuthed }) => {
  const [loadAuth, setLoadAuth] = useState(false);

  return (
    <div className="Auth">
        <h1>Auth</h1>
        <button type="button" className="btn btn-primary" onClick={() => setLoadAuth(!loadAuth)}>Change Form</button>
        {
            loadAuth
              ? (<UserAuthenticationForm setAuthed={setAuthed} />)
              : (<UserRegistrationForm />)
        }
    </div>
  );
};

export default Auth;
