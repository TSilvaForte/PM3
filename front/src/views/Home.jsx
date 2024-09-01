import NavBar from "../components/NavBar";
import styles from "./Home.module.css";

const Home = () => {
    return (
        <div className={styles.container}>
            <NavBar />
            <div className={styles.polygon}>
                <h1 className= {styles.title}>Flotarium</h1>
                <h2 className={styles.subtitle}> THE NEW SPA CONCEPT</h2>
                <p className={styles.description}>
                Escape to our urban spa, a sanctuary designed for relaxation and rejuvenation. Whether you're looking for some peaceful time alone or a soothing experience with a partner, our spa offers the perfect environment to unwind. Enjoy our luxurious treatments and tranquil atmosphere, leaving behind the stress of daily life. Schedule an appointment for a revitalizing escape.
                </p>
                <button className={styles.scheduleButton}>SCHEDULE</button>
            </div>
        </div>
    );
};

export default Home;