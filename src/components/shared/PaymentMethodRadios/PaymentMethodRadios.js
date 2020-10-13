import React, { useState, useEffect } from 'react';
import paymentMethodData from '../../../helpers/data/paymentMethodData';

const PaymentMethodRadios = ({ handleCompleteBasket }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(0);
  useEffect(() => {
    const getPaymentMethods = () => paymentMethodData.getPaymentMethodsByConsumerId(sessionStorage.getItem('roleId'))
      .then((userPaymentMethods) => {
        setPaymentMethods(userPaymentMethods);
      })
      .catch((err) => console.error('There was an error getting the payment types for this user:', err));
    getPaymentMethods();
  }, []);

  const paymentMethodSelectionChange = (e) => {
    setSelectedPaymentMethodId(parseInt(e.target.value, 10));
  };

  return (
        <div className="PayTypeRadios mx-auto">
            {
                paymentMethods.map((singlePaymentMethod) => (
                    <div key={singlePaymentMethod.id} className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="payTypeRadios"
                            id={singlePaymentMethod.id}
                            value={singlePaymentMethod.id}
                            checked={selectedPaymentMethodId === singlePaymentMethod.id}
                            onChange={paymentMethodSelectionChange}
                        />
                        <label className="form-check-label" htmlFor={singlePaymentMethod.id}>
                            <p>{singlePaymentMethod.merchant_name}</p>
                            <p>{singlePaymentMethod.account_number}</p>
                            <p>Expiration Date: {singlePaymentMethod.expiration_date}</p>
                        </label>
                    </div>
                ))
            }
            <button className="btn btn-dark m-3" type="button" onClick={() => handleCompleteBasket(selectedPaymentMethodId)}>Done</button>
        </div>
  );
};

export default PaymentMethodRadios;
