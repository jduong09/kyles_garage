import { NavLink } from "react-router";

export const Header = ({ cart }) => {
  return (<header className="flex justify-between items-center mb-4">
    <h1 className="text-5xl font-bold text-orange-600">Kyles Garage</h1>
    {cart && <div>{cart.length} Items</div>}
    <nav className="flex justify-between">
      <NavLink to="/" className="mr-2" state={{ cart: cart || [] }} end>Home</NavLink>
      <NavLink to="/catalog" className="mr-2" state={{ cart: cart || [] }} end>Catalog</NavLink>
      <NavLink to="/checkout" state={{ cart: cart || [] }} end>Checkout</NavLink>
    </nav>
  </header>);
};