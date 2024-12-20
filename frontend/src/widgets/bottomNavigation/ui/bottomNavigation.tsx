import { useState } from "react";
import styles from "./bottomnavigation.module.scss";
import profileIcon from "@/assets/profile_icon.svg";
import topSurveys from "@/assets/top_surveys.svg";
import mySurvey from "@/assets/my_survey.svg";

export const BottomNavigation = () => {
  const [activeButton, setActiveButton] = useState<string>("");

  const handleClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.button} ${
          activeButton === "topSurveys" ? styles.active : ""
        }`}
        onClick={() => handleClick("topSurveys")}
      >
        <img src={topSurveys} alt="topSurveys" />
        <p>Лента опросов</p>
      </div>

      <div
        className={`${styles.button} ${
          activeButton === "mySurvey" ? styles.active : ""
        }`}
        onClick={() => handleClick("mySurvey")}
      >
        <img src={mySurvey} alt="mySurvey" />
        <p>Мои опросы</p>
      </div>

      <div
        className={`${styles.button} ${
          activeButton === "profile" ? styles.active : ""
        }`}
        onClick={() => handleClick("profile")}
      >
        <img src={profileIcon} alt="profile" />
        <p>Профиль</p>
      </div>
    </div>
  );
};

export default BottomNavigation;
