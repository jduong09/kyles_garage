import { Outlet } from "react-router";
import { AdminHeader } from "./adminHeader";

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  )
}

export default AdminLayout;