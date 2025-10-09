import { Header } from '../header';
import { Landing } from '../landing/landing';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const location = useLocation();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (location.state) {
      setCart(location.state.cart);
    }
  }, []);

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
