import PoolsSelect from "components/PoolsSelect";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.select}>
        <PoolsSelect />
      </div>
      <p className={styles.last_value}>
        9907<span className={styles.last_percent}>3.14%</span>
      </p>
      <p className={styles.item}>
        Lowest price : <b className={styles.value}>10025.54</b>
      </p>
      <p className={styles.item}>
        Lowest price : <b className={styles.value}>10025.54</b>
      </p>
      <p className={styles.item}>
        Lowest price : <b className={styles.value}>10025.54</b>
      </p>
    </nav>
  );
};

export default Navbar;
