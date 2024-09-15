import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './Appointment.module.css';

const Appointment = ({ id, date, time, status, description, onStatusChange }) => {
    const normalizedStatus = status.toLowerCase(); 
    const [isDisabled, setIsDisabled] = useState(normalizedStatus === 'cancelled');

    useEffect(() => {
        setIsDisabled(normalizedStatus === 'cancelled');
    }, [normalizedStatus]);

    const handleChangeStatus = async () => {
        if (normalizedStatus === 'cancelled') {
            return;
        }

        Swal.fire({
            title: 'Confirm Cancellation',
            text: `You are about to cancel this appointment for ${description} on ${new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })} at ${time}. Confirm / Cancel.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
                    setIsDisabled(true);
                    onStatusChange(id, 'cancelled');
                    Swal.fire({
                        title: 'Cancelled!',
                        text: 'The appointment has been cancelled.',
                        icon: 'success',
                    });
                } catch (error) {
                    console.error('Error cancelling the appointment', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was an error cancelling the appointment.',
                        icon: 'error',
                    });
                }
            }
        });
    };

    return (
        <div className={styles.card}>
            <h1>Appointment {id} {normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1)}</h1>
            <p>{new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</p>
            <p>{time}</p>
            <p>{description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <button 
                className={styles.statusButton} 
                onClick={handleChangeStatus} 
                disabled={isDisabled}
            >
                Change status
            </button>
        </div>
    );
};

export default Appointment;
