import { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { getUserData } from "@/features/authProvider/model/getInitData";
import { checkUser } from "@/features/authProvider/api/users";
import { setAuthStatus, setErrorMessage } from "../store/authSlice";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      const userData = getUserData(); // Получаем initData

      if (userData) {
        try {
          const result = await checkUser(userData); // Отправляем запрос с initData
          if (result.success) {
            dispatch(setAuthStatus(true)); // Пользователь авторизован
          } else {
            dispatch(setAuthStatus(false)); // Пользователь не авторизован
            navigate("/access_denied"); // Перенаправляем на страницу доступа
          }
        } catch {
          dispatch(setAuthStatus(false)); // Ошибка при авторизации
          dispatch(setErrorMessage("Authentication failed"));
          navigate("/access_denied"); // Перенаправляем на страницу доступа
        }
      } else {
        dispatch(setAuthStatus(false)); // Нет initData, пользователь не авторизован
        navigate("/access_denied"); // Перенаправляем на страницу доступа
      }
    };

    initializeApp(); // Инициализация при загрузке
  }, [dispatch, navigate]);

  // Определяем маршруты с помощью createRoutesFromElements
  const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/access_denied" element={<AccessDenied />} />
    </Route>
  );

  // Создаем маршрутизатор с заданными маршрутами
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />; // Передаем маршрутизатор в RouterProvider
};
