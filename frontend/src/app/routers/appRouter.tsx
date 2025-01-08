import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Layout } from "../layout";
import { Profile } from "@/pages/profile";
import { MyPolls } from "@/pages/myPolls";
import { AccessDenied } from "@/pages/accessDenied";
import { useDispatch } from "react-redux";
import { initializeApp } from "@/features/authProvider/utils/initApp";
import { useEffect } from "react";
import { ProtectedRoute } from "./protectedRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeApp(dispatch);
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/profile" replace /> },
        {
          element: (
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          ),
          children: [
            { path: "/profile", element: <Profile /> },
            { path: "/my_polls", element: <MyPolls /> },
          ],
        },
      ],
    },
    { path: "/access_denied", element: <AccessDenied /> },
  ]);

  return <RouterProvider router={router} />;
};
