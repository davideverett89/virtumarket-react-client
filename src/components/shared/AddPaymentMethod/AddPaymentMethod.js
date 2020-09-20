import React, { useRef } from 'react';

import moment from 'moment';

import './AddPaymentMethod.scss';

const AddPaymentMethod = () => {
  const merchant = useRef();
  const accountNumber = useRef();
  const date = useRef();

  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    const newPaymentMethod = {
      merchant_name: merchant.current.value,
      account_number: accountNumber.current.value,
      expiration_date: date.current.value,
      creatation_date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    console.log(newPaymentMethod);
  };

  return (
    <div className="AddPaymentMethod">
        <form>
            <div class="form-group">
                <label for="merchant_name">Merchant: </label>
                <input ref={merchant} type="text" class="form-control" id="merchant_name" placeholder="Enter Merchant Name..." />
            </div>
            <div class="form-group">
                <label for="account_number">Account Number: </label>
                <input ref={accountNumber} type="password" class="form-control" id="account_number" placeholder="Account Number" />
            </div>
            <div className="form-group">
                <label for="expiration_date">Expiration date:</label>
                <input ref={date} type="date" id="expiration_date" name="expiration_date" min="1970-01-01" max="2030-12-31" />
            </div>
            <button className="btn btn-success" onClick={handleAddPaymentMethod}>Save</button>
        </form>
    </div>
  );
};

export default AddPaymentMethod;
