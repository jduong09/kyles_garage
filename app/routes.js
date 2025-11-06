import { route, index } from '@react-router/dev/routes';

export default [
  index("customer/home.jsx"),
  route("catalog/", "customer/catalog.jsx"),
  route("checkout/", "customer/checkout/checkout.jsx"),
  route("payment/", "customer/checkout/payment.jsx"),
  route("profile/", "customer/profile.jsx"),
  route("admin/", "admin/admin.jsx"), // TODO: Add some middleware to this route to authenticate the viewer as an admin
  route("admin/catalog/", "admin/catalog.jsx"),
  route("admin/reservations/", "admin/reservations.jsx"),
  route("admin/employees/", "admin/employees.jsx"),
];
