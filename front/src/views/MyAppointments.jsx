import { useState } from "react";
import myAppointments from "../helpers/myAppointments";
import Appointment from "../components/Appointment";
import styles from "./MyAppointments.module.css";
import NavBar from "../components/NavBar"; 
import Footer from "../components/Footer";

const MyAppointments = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - itemsPerPage, 0));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + itemsPerPage, myAppointments.length - itemsPerPage));
    };

    const visibleAppointments = myAppointments.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <div className={styles.container}>
            <NavBar/>

            <div className={styles.polygon}>
                <h1 className={styles.title}>AGENDA</h1>
            </div>

            <div className={styles.appointmentsContainer}>
                {visibleAppointments.length ? (
                    visibleAppointments.map(({ id, date, time, status, description }) => (
                        <Appointment
                            key={id}
                            id={id}
                            date={date}
                            time={time}
                            status={status}
                            description={description}
                        />
                    ))
                ) : (
                    <div className={styles.noAppointments}>You haven't scheduled appointments yet</div>
                )}
            </div>

            <div className={styles.navigationButtons}>
                <button className={styles.navButton} onClick={handlePrevious} disabled={currentIndex === 0}>
                    Previous
                </button>
                <button className={styles.navButton} onClick={handleNext} disabled={currentIndex + itemsPerPage >= myAppointments.length}>
                    Next
                </button>
            </div>

            <Footer/>

        </div>
    );
};

export default MyAppointments;