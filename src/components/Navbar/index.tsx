import PoolsSelect from "@/components/PoolsSelect";
import styles from "./Navbar.module.scss";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.select}>
        <PoolsSelect />
      </div>
      <div>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
