import { AdminHeader } from "../admin-header";

const Employees = () => (
  <div>
    <AdminHeader />
    <div>List of all employees</div>
    <p>If an employee is logged in they should see their own profile</p>
  </div>
);

export default Employees;