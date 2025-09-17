import { Header } from "../header";
import { useLocation } from "react-router";

const Checkout = () => {
  const location = useLocation();
  const { cart } = location.state;

  const listCart = cart.map((item, idx) => {
    return (<li className="mb-3" key={idx}>
      <div className="flex justify-between align-center">
        <h4>{item.name}</h4>
        <span>${item.price}</span>
      </div>
      <div>Reserve from <span className="text-indigo-300">{item.startDate.toLocaleDateString()}</span> to <span className="text-indigo-300">{item.endDate.toLocaleDateString()}</span></div>
    </li>);
  })
  return (
  <div className="p-4">
    <Header cart={cart} />
    <div className="bg-gray-500 p-2">
      <h2 className="text-3xl font-bold pb-4 mb-4 border-b-4">Checkout</h2>
      <ul className="flex flex-col">{listCart}</ul>
    </div>
  </div>);
};

export default Checkout;