import { Header } from "../header";
import { useLocation } from "react-router";

const Checkout = () => {
  const location = useLocation();
  return (
  <div>
    <Header cart={location.state.cart} />
    <div>Checkout Page</div>
  </div>);
};

export default Checkout;