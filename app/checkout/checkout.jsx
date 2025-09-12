import { Header } from "../header";
import { useLocation } from "react-router";

const Checkout = () => {
  const location = useLocation();
  const { cart } = location.state;

  const listCart = cart.map((item, idx) => {
    return (<li key={idx}>
      <h2>{item.name}</h2>
      <span>{item.price}</span>
    </li>);
  })
  return (
  <div>
    <Header cart={cart} />
    <div>Checkout Page</div>
    <div><ul>{listCart}</ul></div>
  </div>);
};

export default Checkout;