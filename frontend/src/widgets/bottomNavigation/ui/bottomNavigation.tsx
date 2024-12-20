import { useState } from "react";
import styles from "./bottomnavigation.module.scss";
import profileIcon from "@/assets/profile_icon.svg";
import topSurveys from "@/assets/top_surveys.svg";
import mySurvey from "@/assets/my_survey.svg";
import { useNavigate } from "react-router-dom";

const buttons = [
  { name: "topSurveys", label: "Лента опросов", icon: topSurveys, path: "/" },
  { name: "mySurvey", label: "Мои опросы", icon: mySurvey, path: "/" },
  { name: "profile", label: "Профиль", icon: profileIcon, path: "/profile" },
];

export const BottomNavigation = () => {
  const [activeButton, setActiveButton] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = (name: string, path: string) => {
    setActiveButton(name);
    navigate(path);
  };

  return (
    <div className={styles.wrapper}>
      {buttons.map(({ name, label, icon, path }) => (
        <div
          key={name}
          className={`${styles.button} ${
            activeButton === name ? styles.active : ""
          }`}
          onClick={() => handleClick(name, path)}
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
