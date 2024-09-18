import { useSelector } from 'react-redux';
import styles from './NavBar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const NavBar = () => {
  const userData = useSelector((state) => state.userActive);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Success!",
      text: "Now you are logged out",
      icon: "success",
      confirmButtonText: "OK"
    }).then(() => {
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navItems}>
        <li>
          <Link to="/" className={styles.navLink}>Home</Link>
        </li>

        {userData.name ? (
          <>
          <li>
            <Link to="/appointments" className={styles.navLink}>My Appointments</Link>
          </li>

          <li>
              <button onClick={handleLogout} className={styles.navLink}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={styles.navLink}>Login</Link>
            </li>
            <li>
              <Link to="/register" className={styles.navLink}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;