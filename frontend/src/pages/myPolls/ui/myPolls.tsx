import { Button } from "@/shared/button";
import styles from "./styles/mypolls.module.scss";

export const MyPolls = () => {
  return (
    <>
      <div className={styles.button}>
        <Button text="Создать опрос" width="90%" />
      </div>
    </>
  );
};

export default MyPolls;
