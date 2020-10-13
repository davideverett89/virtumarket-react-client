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
                    <div key={singlePaymentMethod.id} className="form-check d-flex flex-row justify-content-center align-items-center">
                        <input
                            className="form-check-input position-relative"
                            type="radio"
                            name="payTypeRadios"
                            id={singlePaymentMethod.id}
                            value={singlePaymentMethod.id}
                            checked={selectedPaymentMethodId === singlePaymentMethod.id}
                            onChange={paymentMethodSelectionChange}
                        />
                        <label className="form-check-label" htmlFor={singlePaymentMethod.id}>
                            <ul className={`mx-2 my-3 border list-group ${selectedPaymentMethodId === singlePaymentMethod.id ? 'border-dark' : ''}`}>
                                <li className="list-group-item">{singlePaymentMethod.merchant_name}</li>
                                <li className="list-group-item">{singlePaymentMethod.account_number}</li>
                                <li className="list-group-item">Expiration Date: {singlePaymentMethod.expiration_date}</li>
                            </ul>
                        </label>
                    </div>
                ))
            }
            <button
              disabled={selectedPaymentMethodId === 0}
              className="btn btn-warning m-3"
              type="button"
              onClick={() => handleCompleteBasket(selectedPaymentMethodId)}
            >
              Complete Checkout
            </button>
        </div>
  );
};

export default PaymentMethodRadios;
