import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import paymentMethodData from '../../../helpers/data/paymentMethodData';

import './AddPaymentMethod.scss';

const AddPaymentMethod = ({ toggleNested, getCurrentUser }) => {
  // Variables to contain the ref values on the form inputs.
  const merchant = useRef();
  const accountNumber = useRef();
  const date = useRef();

  // Event handler function that constructs a new paymentMethod object using the values from the ref variables,
  // then calls the function that makes a post request to the /paymentmethods API route,
  // and passes in the new paymentMethod object.
  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    const newPaymentMethod = {
      merchant_name: merchant.current.value,
      account_number: accountNumber.current.value,
      expiration_date: date.current.value,
      creation_date: moment().format('YYYY-MM-DD'),
      consumer_id: parseInt(sessionStorage.getItem('roleId'), 10),
    };
    paymentMethodData.postPaymentMethod(newPaymentMethod)
      .then(() => {
        toggleNested();
        getCurrentUser();
      })
      .catch((err) => console.error('There was an issue adding a new payment method:', err));
  };

  return (
    <div className="AddPaymentMethod">
        <form>
            <div className="form-group">
                <label htmlFor="merchant_name">Merchant: </label>
                <input ref={merchant} type="text" className="form-control" id="merchant_name" placeholder="Enter Merchant Name..." />
            </div>
            <div className="form-group">
                <label htmlFor="account_number">Account Number: </label>
                <input ref={accountNumber} type="password" className="form-control" id="account_number" placeholder="Account Number" />
            </div>
            <div className="form-group">
                <label htmlFor="expiration_date">Expiration date:</label>
                <input ref={date} type="date" id="expiration_date" name="expiration_date" min={moment().format('YYYY-MM-DD')} max="2030-12-31" />
            </div>
            <button className="btn btn-success" onClick={handleAddPaymentMethod}>Save</button>
        </form>
    </div>
  );
};

AddPaymentMethod.propTypes = {
  toggleNested: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

export default AddPaymentMethod;
