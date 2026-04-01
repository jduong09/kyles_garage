import React from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

// input PROD URL into .env
const returnUrl = import.meta.env.VITE_NODE_ENV === 'PROD' ? import.meta.env.VITE_STRIPE_PROD_URL : 'http://localhost:5173/order/complete';
 
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      }
    });

    if (error) {
      setErrorMessage(error.message);
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe} className="items-center rounded-full bg-blue-600 hover:bg-blue-700 px-2 py-1 font-medium dark:bg-blue-500">Submit</button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;