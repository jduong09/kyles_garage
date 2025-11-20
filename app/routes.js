import { route, index } from '@react-router/dev/routes';

export default [
  index('customer/home.jsx'),
  route('catalog', 'customer/catalog.jsx'),
  route('checkout', 'customer/checkout/checkout.jsx'),
  route('login', 'login.jsx'),
  route('payment', 'customer/checkout/payment.jsx'),
  route('profile', 'customer/profile.jsx'),
  route("admin", "admin/adminLayout.jsx", [
      route("catalog", "admin/catalog.jsx"),
      route("reservations", "admin/reservations.jsx"),
      route("employees", "admin/employees.jsx"),
  ]),
];