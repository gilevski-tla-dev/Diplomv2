import { FC } from "react";
import styles from "./button.module.scss";

type ButtonProps = {
  text: string;
  width?: string;
};

export const Button: FC<ButtonProps> = ({ text, width }) => {
  return (
    <div className={styles.wrapper} style={{ width: width }}>
      {text}
    </div>
  );
};

export default Button;
