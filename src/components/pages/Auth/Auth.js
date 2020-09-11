import React from 'react';

import UserRegistrationForm from '../../shared/UserRegistrationForm/UserRegistrationForm';
import UserAuthenticationForm from '../../shared/UserAuthenticationForm/UserAuthenticationForm';

import './Auth.scss';

const Auth = ({ setAuthed }) => (
    <div className="Auth">
        <h1>Auth</h1>
        <UserRegistrationForm />
        <UserAuthenticationForm setAuthed={setAuthed} />
    </div>
);

export default Auth;
