import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "../layout";
import { Profile } from "@/pages/profile";
import { AccessDenied } from "@/pages/accessDenied";
import { useDispatch } from "react-redux";
import { initializeApp } from "@/features/authProvider/utils/initApp";
import { useEffect } from "react";

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeApp(dispatch);
  }, [dispatch]);

  const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/access_denied" element={<AccessDenied />} />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
