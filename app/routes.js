import { route, index } from '@react-router/dev/routes';
import { authMiddleware } from './middleware/auth';

export default [
  index('customer/home.jsx'),
  route('catalog', 'customer/catalog.jsx'),
  route('checkout', 'customer/checkout/checkout.jsx'),
  route('login', 'login.jsx'),
  route('payment', 'customer/checkout/payment.jsx'),
  route('profile', 'customer/profile.jsx'),
  route("admin", "admin/admin.jsx", [
      route("catalog", "admin/catalog.jsx"),
      route("reservations", "admin/reservations.jsx"),
      route("employees", "admin/employees.jsx"),
  ]),
];

/*route("admin", "admin/admin.jsx", {
  middleware: [authMiddleware],
  children: [
    route("catalog", "admin/catalog.jsx"),
    route("reservations", "admin/reservations.jsx"),
    route("employees", "admin/employees.jsx"),
  ],
}),
*/