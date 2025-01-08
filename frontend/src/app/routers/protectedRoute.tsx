import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  // Показываем заглушку, пока идёт проверка
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  // Если пользователь не авторизован, перенаправляем
  if (!isAuthenticated) {
    return <Navigate to="/access_denied" replace />;
  }

  // Если пользователь авторизован, рендерим дочерние элементы
  return children;
};
