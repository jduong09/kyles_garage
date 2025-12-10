import { Header } from '../header';
import { useOutletContext } from 'react-router';

const Checkout = () => {
  const { cart, setCart } = useOutletContext();

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

  return (
    <div className="p-4">
      <div className="bg-gray-500 p-2">
        <h2 className="text-3xl font-bold pb-4 mb-4 border-b-4">Checkout</h2>
        <ul className="flex flex-col">{listCart}</ul>
      </div>
    </div>
  );
};

export default Checkout;