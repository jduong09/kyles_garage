import { Outlet } from "react-router";
import { AdminHeader } from "./adminHeader";
import { redirect } from "react-router";

export async function clientLoader({}) {
  console.log('Checking Auth');
  const status = localStorage.getItem('status');

  if (status === 'internal') {
    console.log('Correct User Status');
  } else {
    console.log('Invalid Permissions');
    return redirect('/catalog');
  }
}

export default function AdminLayout() {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  )
}

