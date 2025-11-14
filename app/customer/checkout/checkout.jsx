import { Header } from '../../header';
import { NavLink, useLocation } from 'react-router';
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
          <h4>{item.name}</h4>
          <span>${item.price}</span>
        </div>
        <div>Reserve from <span className="text-indigo-300">{item.startDate.toLocaleDateString()}</span> to <span className="text-indigo-300">{item.endDate.toLocaleDateString()}</span></div>
        <button className="items-center rounded-full bg-blue-600 hover:bg-blue-700 px-2 py-1 font-medium dark:bg-blue-500" onClick={() => deleteItem(item)}>Delete</button>
      </li>
    );
  });
  console.log(cart);

  return (
    <div className="p-4">
      <Header cart={cart} loginPage={false} />
      <div className="flex flex-col bg-gray-500 p-2 w-1/2 m-auto">
        <h2 className="text-3xl font-bold pb-4 mb-4 border-b-4">Checkout</h2>
        <ul className="flex flex-col pb-4 mb-4 border-b-4">{listCart}</ul>
        {listCart.length && <NavLink to="/payment" className="self-end items-center rounded-full bg-blue-600 hover:bg-blue-700 px-2 py-1 font-medium dark:bg-blue-500" state={{ cart: cart }}>Payment -></NavLink>}
      </div>
    </div>
  );
};

export default Checkout;