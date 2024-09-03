import styles from "./Appointment.module.css"

const Appointment = ({id, date, time, status, description}) => {
    return (
        <div className={styles.card}>
            <h1>Appointment {id} {status.charAt(0).toUpperCase()+status.slice(1).toLowerCase()} </h1>
            <p>{date}</p>
            <p>{time}</p>
            <p>{description.charAt(0).toUpperCase()+description.slice(1).toLowerCase()}</p>
            <button className={styles.statusButton}>Change status</button>
        </div>
    )
}

export default Appointment;