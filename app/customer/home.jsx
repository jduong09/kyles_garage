import { Header } from '../header';
import { Landing } from './landing';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

/*
Currently have signup with either admin or customer privileges for example.

TODO To Have PR for Review
Need a Backend session that stores the user info, the user buyer or seller history (separate PR)
And especially the status (are they admin/customer) so that we can block customers from accessing Admin routes.
Need a Guard on Admin Routes.
Some kind of barebones UI for Login Page.
*/ 

export default function Home() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const { isAuthenticated, user, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    if (location.state) {
      setCart(location.state.cart);
    }
  }, []);

  useEffect(()  => {
    const syncUser = async () => {
      if (!isAuthenticated) return;
      await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ email: user.email, status: localStorage.getItem('status') }),
      });
    }
    syncUser();

    const createBackendSession = async () => {
      const claims = await getIdTokenClaims();
      const idToken = await claims.__raw;

      await fetch('http://localhost:3000/session/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });
    };
    createBackendSession();
  }, [isAuthenticated]);

  const deleteItem = (item) => {
    setCart(cart.filter(cartItem => {
      return cartItem.catalog_id !== item.catalog_id;
    }));
  }

  return (<div>
    <Header cart={cart} loginPage={false} />
    <Landing />
  </div>);
}
