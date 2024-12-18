import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "../layout";
import { Profile } from "@/pages/profile";

export const AppRouter = () => {
  const routers = createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/profile" element={<Profile />} />
    </Route>
  );

  const router = createBrowserRouter(routers, {});

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
