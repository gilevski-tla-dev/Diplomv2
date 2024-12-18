import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import { BottomNavigation } from "@/widgets/bottomNavigation";

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
