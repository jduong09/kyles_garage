import { NavLink } from 'react-router';

export const AdminHeader = () => {
  return (
    <header className="flex justify-between p-4">
      <h3 className="text-2xl font-bold text-orange-600">Kyles Garage Admin Portal</h3>
      <nav className="flex justify-between">
        <NavLink to="/admin" className="mr-2" end>Home</NavLink>
        <NavLink to="/admin/catalog" className="mr-2" end>Catalog</NavLink>
        <NavLink to="/admin/reservations" className="mr-2"  end>Reservations</NavLink>
        <NavLink to="/admin/employees" end>Employees</NavLink>
      </nav>
    </header>
  );
};