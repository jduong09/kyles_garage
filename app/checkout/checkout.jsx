import { Header } from '../header';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

const Checkout = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);

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

  const listCart = cart.map((item, idx) => {
    return (
      <li className="mb-3" key={idx}>
        <div className="flex justify-between align-center">
          <h4 className="text-md text-chocolate font-bold">{item.name}</h4>
          <span>${item.price}</span>
        </div>
        <div>Reserve from <span className="text-latte font-medium">{item.startDate.toLocaleDateString()}</span> to <span className="text-latte font-medium">{item.endDate.toLocaleDateString()}</span></div>
        <button className="items-center rounded-full bg-blue-600 hover:bg-blue-700 px-2 py-1 font-medium dark:bg-blue-500" onClick={() => deleteItem(item)}>Remove</button>
      </li>
    );
  });

  return (
    <div className="">
      <Header cart={cart} />
      <div className="w-1/2 ml-auto mr-auto bg-light-brown dark:bg-neutral-800 p-2">
        <h2 className="text-lg font-bold pb-4 mb-4 border-b-4 text-chocolate dark:text-latte">Checkout</h2>
        <ul className="flex flex-col">{listCart}</ul>
      </div>
    </div>
  );
};

export default Checkout;