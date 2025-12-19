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
      console.log(localStorage.getItem('status'));
      if (!isAuthenticated) return;
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ email: user.email, status: localStorage.getItem('status') }),
      });
      const obj = await response.json();
      localStorage.setItem("status", obj.status);
    }
    syncUser();

    const createBackendSession = async () => {
      if (!isAuthenticated) return;
      const claims = await getIdTokenClaims();
      const idToken = await claims?.__raw;

      await fetch('http://localhost:3000/session/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });
    };
    createBackendSession();
  }, [isAuthenticated]);

  return (<div>
    <Header cart={cart} loginPage={false} />
    <Landing />
  </div>);
}
