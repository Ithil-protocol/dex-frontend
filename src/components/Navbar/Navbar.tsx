import styles from "./Navbar.module.scss";
import PoolsSelect from "components/PoolsSelect";

const Navbar = () => {
  return (
    <nav>
      <div className={styles.select}>
        <PoolsSelect />
      </div>
    </nav>
  );
};

export default Navbar;
