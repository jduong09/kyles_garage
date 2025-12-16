import PaymentStatus from './paymentStatus';
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const OrderStatus = () => {
  const [clientSecret, setClientSecret] = useState('');
  useEffect(() => {
    const secret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    setClientSecret(secret);
  }, [])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (<div>
    {clientSecret && 
      <Elements options={options} stripe={stripePromise}>
        <PaymentStatus />
      </Elements>}
  </div>)
};

export default OrderStatus;