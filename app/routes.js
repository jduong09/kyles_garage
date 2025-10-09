import { route, index } from '@react-router/dev/routes';

export default [
  index("routes/home.jsx"),
  route("catalog/", "catalog/catalog.jsx"),
  route("checkout/", "checkout/checkout.jsx"),
  route("admin/", "admin/admin.jsx"), // TODO: Add some middleware to this route to authenticate the viewer as an admin
  route("admin/catalog/", "admin/catalog.jsx"),
  route("admin/reservations/", "admin/reservations.jsx"),
  route("admin/employees/", "admin/employees.jsx"),
];
