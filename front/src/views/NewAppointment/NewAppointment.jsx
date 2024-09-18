import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Swal from 'sweetalert2'
import styles from './NewAppointment.module.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const validationSchema = Yup.object().shape({
  date: Yup.date()
    .min(new Date(), 'Date must be in the future')
    .required('Required'),
  hour: Yup.string().required('Required'),
  minute: Yup.string(),
  description: Yup.string().required('Required'),
});

const NewAppointment = () => {
    const userData = useSelector ((state) => state.userActive);
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const { date, hour, minute, description } = values;
        const appointmentData = {
          date,
          time: `${hour}:${minute}`,
          description,
          userId: userData.id
        };

        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',    
          });
    
        Swal.fire({
          title: 'Confirm Appointment?',
          text: `You are about to schedule an appointment for ${description} on ${formattedDate} at ${hour}:${minute} hs.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.post('http://localhost:3000/appointments/schedule', appointmentData);
    
              if (response.status === 201) {
                Swal.fire({
                  title: "Success!",
                  text: "Your appointment has been scheduled",
                  icon: "success",
                });
                resetForm(); 
                navigate('/appointments');
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                  footer: '<a href="#">Schedule failed. Please try again</a>',
                });
              }
            } catch (error) {
              console.log("Server error", error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Schedule failed. Please try again</a>',
              });
            } finally {
              setSubmitting(false); 
            }
          } else {
            setSubmitting(false); 
          }
        });
      };

  return (
    <div className={styles.container}>
      <div className={styles.polygon}>
        <h1 className={styles.title}>NEW APPOINTMENT</h1>
      </div>

      <Formik 
        initialValues={{
          date: '',
          hour: '',
          minute: '',
          description: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isValid, dirty }) => (
          <Form className={styles.formContainer}>
            <label className={styles.labelAppointment} htmlFor="date">Date</label>
            <DatePicker className={styles.appointmentInput}
              selected={values.date}
              onChange={date => setFieldValue('date', date)}
              dateFormat="yyyy-MM-dd"
              name="date"
              id="date"
              minDate={new Date()}  // Disallow past dates
              filterDate={(date) => date >= new Date()}
            />

            <div className={styles.timeContainer}>
              <div className={styles.timeField}>
                <label className={styles.labelAppointment} htmlFor="hour">Hour</label>
                <Field className={styles.appointmentInput} as="select" name="hour" id="hour">
                  {[...Array(24).keys()].map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </Field>
              </div>

              <div className={styles.timeField}>
                <label className={styles.labelAppointment} htmlFor="minute">Minute</label>
                <Field className={styles.appointmentInput} as="select" name="minute" id="minute">
                  {["00", "15", "30", "45"].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </Field>
              </div>
            </div>

            <label className={styles.labelAppointment} htmlFor="description">Description</label>
            <Field className={styles.appointmentInput} as="select" name="description" id="description">
              <option value="" disabled>Select a service</option>
              <option value="massage">Massage</option>
              <option value="sauna and jacuzzi session">Sauna and Jacuzzi Session</option>
              <option value="spa day 2x">Spa Day 2x</option>
              <option value="skin care">Skin Care</option>
              <option value="flotarium session">Flotarium Session</option>
              <option value="other">Other</option>
            </Field>

            <button type="submit" className={styles.scheduleButton} disabled={!(isValid && dirty)}>Schedule</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewAppointment;

