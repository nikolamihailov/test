import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import Login from "../features/user/auth/Login";
import Register from "../features/user/auth/Register";
import Services from "../pages/Services";
import Appointments from "../pages/Appointments";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/Profile";
import PublicRoute from "./RouteGuards/PublicRoute";
import ProtectedRoute from "./RouteGuards/ProtectedRoute";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <LandingPage />,
        index: true,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/services",
            element: <Services />,
          },
          {
            path: "/appointments",
            element: <Appointments />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/*",
        element: <ErrorPage />,
      },
    ],
  },
]);
