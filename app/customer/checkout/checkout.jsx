import { Header } from '../../header';
import { NavLink, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const Checkout = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (location.state.cart.length) {
      setCart(location.state.cart);
    }
  }, []);

  const deleteItem = (item) => {
    setCart(cart.filter(cartItem => {
      return cartItem.inventory_uuid !== item.inventory_uuid;
    }));
  }

  const handlePayment = async () => {
    const response = await fetch('http://localhost:3000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        price: 2000,
      }),
    });

    const result = await response.json();
    setClientSecret(result.client_secret);
  }

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const listCart = cart.map((item, idx) => {
    return (
      <li className="mb-3" key={idx}>
        <div className="flex justify-between align-center">
          <h4>{item.name}</h4>
          <span>${item.price}</span>
        </div>
        <div>Reserve from <span className="text-indigo-300">{item.startDate.toLocaleDateString()}</span> to <span className="text-indigo-300">{item.endDate.toLocaleDateString()}</span></div>
        <button className="items-center rounded-full bg-blue-600 hover:bg-blue-700 px-2 py-1 font-medium dark:bg-blue-500" onClick={() => deleteItem(item)}>Delete</button>
      </li>
    );
  });

  return (
    <div className="p-4">
      <Header cart={cart} loginPage={false} />
      <div className="flex flex-col bg-gray-500 p-2 w-1/2 m-auto">
        <h2 className="text-3xl font-bold pb-4 mb-4 border-b-4">Checkout</h2>
        <ul className="flex flex-col">{listCart}</ul>
        <button onClick={handlePayment} className="items-center rounded-full bg-blue-600 hover:bg-blue-700 px-2 py-1 font-medium dark:bg-blue-500">Send Stripe Request</button>
        {clientSecret && 
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>}
      </div>
    </div>
  );
};

export default Checkout;