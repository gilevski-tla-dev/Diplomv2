import styles from "./bottomnavigation.module.scss";
import profileIcon from "@/assets/profile_icon.svg";

export const BottomNavigation = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.button}>
        <img src={profileIcon} alt="profile" />
        <p>Профиль</p>
      </div>
    </div>
  );
};

export default BottomNavigation;
