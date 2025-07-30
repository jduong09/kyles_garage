import { route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("welcome/", "welcome/welcome.jsx"),
  route("catalog/", "catalog/catalog.jsx"),
  route("checkout/", "checkout/checkout.jsx"),
];
