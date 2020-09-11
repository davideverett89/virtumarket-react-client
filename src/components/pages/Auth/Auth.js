import React, { useState } from 'react';

import UserRegistrationForm from '../../shared/UserRegistrationForm/UserRegistrationForm';
import UserAuthenticationForm from '../../shared/UserAuthenticationForm/UserAuthenticationForm';

import './Auth.scss';

const Auth = ({ setAuthed }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="Auth">
        <button type="button" className="btn btn-primary" onClick={() => setToggle(!toggle)}>Change Form</button>
        {
            toggle
              ? (<UserAuthenticationForm setAuthed={setAuthed} />)
              : (<UserRegistrationForm setAuthed={setAuthed} />)
        }
    </div>
  );
};

export default Auth;
