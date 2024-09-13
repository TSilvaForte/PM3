import { useEffect, useState } from "react";
import Appointment from "../components/Appointment";
import styles from "./MyAppointments.module.css";
import Footer from "../components/Footer";
import axios from "axios";

const MyAppointments = () => {
    const [currentIndex, setCurrentIndex] = useState(0); 
    const itemsPerPage = 3;

    const [userAppointments, setUserAppointments] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/appointments");
            setUserAppointments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - itemsPerPage, 0));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => 
            Math.min(prevIndex + itemsPerPage, userAppointments.length - (userAppointments.length % itemsPerPage))
        );
    };

    const visibleAppointments = userAppointments.slice(currentIndex, currentIndex + itemsPerPage);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
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
                <button 
                    className={styles.navButton} 
                    onClick={handlePrevious} 
                    disabled={currentIndex === 0}
                >
                    Previous
                </button>
                <button 
                    className={styles.navButton} 
                    onClick={handleNext} 
                    disabled={currentIndex + itemsPerPage >= userAppointments.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyAppointments;