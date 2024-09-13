import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navItems}>

        <Link to="/" className={styles.navLink}>
          <a>Home</a>
        </Link> 

        <Link to="/login" className={styles.navLink}>
          <a>Login</a>
        </Link>

        <Link to="/appointments" className={styles.navLink}>
          <a>Appointments</a>
        </Link>

        <Link to="/register" className={styles.navLink}>
          <a>Register</a>
        </Link>
        
      </ul>
    </nav>
  );
};

export default NavBar;