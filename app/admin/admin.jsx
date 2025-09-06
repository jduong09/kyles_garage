import { AdminHeader } from "../admin-header";

const Checkout = () => (
  <div>
    <AdminHeader />
    <div>Some sort of snapshot of daily updates:</div>
    <ul>
      <li>Items due back today</li>
      <li>Items reserved today</li>
      <li>Some sort of profits? Or perhaps that can go on a separate reporting page</li>
    </ul>
  </div>
);

export default Checkout;