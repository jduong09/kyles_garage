import { Header } from '../header';
import { Landing } from '../landing/landing';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (location.state) {
      setCart(location.state.cart);
    }
  }, []);

  useEffect(()  => {
    const syncUser = async () => {
      if (!isAuthenticated) return;
      console.log('Running Request');
      await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });
    }
    syncUser();
  }, [isAuthenticated]);

  const deleteItem = (item) => {
    setCart(cart.filter(cartItem => {
      return cartItem.catalog_id !== item.catalog_id;
    }));
  }

  return (<div>
    <Header cart={cart} />
    <Landing />
  </div>);
}
