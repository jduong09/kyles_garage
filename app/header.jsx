import { NavLink } from "react-router";

export const Header = () => {
  return (<header className="flex justify-between items-center p-4">
    <h1 className="text-5xl font-bold text-orange-600">Kyles Garage</h1>
    <nav className="flex justify-between">
      <NavLink to="/" className="mr-2" end>Home</NavLink>
      <NavLink to="/catalog" className="mr-2" end>Catalog</NavLink>
      <NavLink to="/checkout" end>Checkout</NavLink>
    </nav>
  </header>);
};