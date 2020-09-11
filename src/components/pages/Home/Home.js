import React, { useState, useEffect } from 'react';

import MerchantDashboard from '../../shared/MerchantDashboard/MerchantDashboard';
import ConsumerDashboard from '../../shared/ConsumerDashboard/ConsumerDashboard';

import './Home.scss';

const Home = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const getUserRole = () => {
      setUserRole(localStorage.getItem('userRole'));
      console.log(userRole);
    };
    getUserRole();
  }, [userRole]);

  return (
        <div className="Home">
            {
                userRole === 'merchant'
                  ? (<MerchantDashboard />)
                  : (<ConsumerDashboard />)
            }
        </div>
  );
};

export default Home;
