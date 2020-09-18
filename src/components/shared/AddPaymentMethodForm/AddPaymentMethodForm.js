import React, { useRef } from 'react';

import './AddPaymentMethodForm.scss';

const AddPaymentMethodForm = ({ setNewPaymentMethod }) => {
  const merchant = useRef();
  const accountNumber = useRef();
  const date = useRef();

  const handleInputChange = (e) => {
    e.preventDefault();
    const newPaymentMethod = {
      merchant_name: merchant.current.value,
      account_number: accountNumber.current.value,
      expiration_date: date.current.value,
    };
    setNewPaymentMethod(newPaymentMethod);
  };

  return (
    <div className="AddPaymentMethodForm">
        <form>
            <div class="form-group">
                <label for="merchant_name">Merchant: </label>
                <input ref={merchant} type="text" class="form-control" id="merchant_name" placeholder="Enter Merchant Name..." onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label for="account_number">Account Number: </label>
                <input ref={accountNumber} type="password" class="form-control" id="account_number" placeholder="Account Number" onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label for="expiration_date">Expiration date:</label>
                <input ref={date} type="date" id="expiration_date" name="expiration_date" value="" min="1970-01-01" max="2030-12-31" onChange={handleInputChange} />
            </div>
            <div className="form-group"></div>
        </form>
    </div>
  );
};

export default AddPaymentMethodForm;
