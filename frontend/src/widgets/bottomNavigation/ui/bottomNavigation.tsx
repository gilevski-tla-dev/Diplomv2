import { useLocation, useNavigate } from "react-router-dom";
import styles from "./bottomnavigation.module.scss";
import profileIcon from "@/assets/profile_icon.svg";
import topSurveys from "@/assets/top_surveys.svg";
import mySurvey from "@/assets/my_survey.svg";

const buttons = [
  { name: "topPolls", label: "Лента опросов", icon: topSurveys, path: "/" },
  { name: "myPolls", label: "Мои опросы", icon: mySurvey, path: "/my_polls" },
  { name: "profile", label: "Профиль", icon: profileIcon, path: "/profile" },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.wrapper}>
      {buttons.map(({ name, label, icon, path }) => (
        <div
          key={name}
          className={`${styles.button} ${
            location.pathname === path ? styles.active : ""
          }`}
          onClick={() => handleClick(path)}
        >
          <div className={styles.image}>
            <img src={icon} alt={name} />
          </div>
          <p>{label}</p>
        </div>
      ))}
    </div>
  );
};

export default BottomNavigation;
