import { useEffect, useState } from 'react'
import Appointment from '../../components/Appointment'
import styles from './MyAppointments.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUserAppointments } from '../../redux/reducer'

const MyAppointments = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    // const [userAppointments, setUserAppointments] = useState([]);

    const userData = useSelector((state) => state.userActive);
    const appointments = useSelector((state) => state.userAppointments);
    const dispatch= useDispatch();

    const fetchData = async () => {
        try {
            // const response = await axios.get(`http://localhost:3000/users/${userData.id}`);
            const response = await axios.get(`https://flotariumspa.onrender.com/users/${userData.id}`);
            dispatch(addUserAppointments(response.data.appointments));
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusChange = (id, newStatus) => {
        dispatch(addUserAppointments(
            appointments.map(app =>
                app.id === id ? { ...app, status: newStatus } : app
            )
        ));
    };

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - itemsPerPage, 0));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex =>
            Math.min(prevIndex + itemsPerPage, appointments.length - (appointments.length % itemsPerPage))
        );
    };

    const visibleAppointments = appointments?.length ? appointments.slice(currentIndex, currentIndex + itemsPerPage) : [];

    useEffect(() => {
        if (userData.id) {
            fetchData(); 
        }
    }, [userData.id]);

    const navigate = useNavigate();
    const handleNewAppointmentClick = () => {
        navigate('/appointments/newappointment');
    };

    return (
        <div className={styles.container}>
            <div className={styles.polygon}>
                <h1 className={styles.title}>AGENDA</h1>
            </div>

            <div>
                <button className={styles.appointmentButton} onClick={handleNewAppointmentClick}>New Appointment</button>
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
                            onStatusChange={handleStatusChange}
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
                    disabled={currentIndex + itemsPerPage >= appointments.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyAppointments;
