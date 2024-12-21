import { useEffect, useState } from "react";
import styles from "./styles/profileinfo.module.scss";
import { User } from "../model/user";
import { getUserData } from "../model/getUserData";
import { useCreateUser } from "../services/userService"; 

export const ProfileInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const { mutate: createUser } = useCreateUser(); 

  useEffect(() => {
    const userData = getUserData();

    if (userData) {
      setUser(userData);

      // Отправка данных пользователя на сервер при их получении
      createUser(userData);
    } else {
      console.error("Ошибка авторизации: нет данных о пользователе");
    }
  }, [createUser]);

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        {user.photo_url ? (
          <img src={user.photo_url} alt="Avatar" />
        ) : (
          <img src="" alt="" />
        )}
      </div>
      <div className={styles.info}>
        <h1>
          {user.first_name} {user.last_name}
        </h1>
        <h2>@{user.username ? user.username : ""}</h2>
      </div>
    </div>
  );
};

export default ProfileInfo;
