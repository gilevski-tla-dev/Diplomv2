import { useEffect, useState } from "react";
import styles from "./styles/profileinfo.module.scss";
import { getUserData, User } from "../model/user";

export const ProfileInfo = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = getUserData();

    if (userData) {
      setUser(userData);
    } else {
      console.error("Ошибка авторизации: нет данных о пользователе");
    }
  }, []);

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
