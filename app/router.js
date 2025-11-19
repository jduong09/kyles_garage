import { createBrowserRouter } from "react-router-dom";
import Home from "./customer/home";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);