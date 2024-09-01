import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navItems}>
        <li><a href="#about">About Us</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#search">Contact</a></li>
        <li><a href="#login">Log In</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;