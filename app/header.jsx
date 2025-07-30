import { NavLink } from "react-router";

export const Header = () => {
  return (<div>
    <h1>Kyles Garage</h1>
    <nav>
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/catalog" end>Catalog</NavLink>
      <NavLink to="/checkout" end>Checkout</NavLink>
    </nav>
  </div>);
};