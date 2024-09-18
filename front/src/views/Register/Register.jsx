import React, { useEffect, useState } from 'react'
import { validateRegister } from '../../helpers/validations.js'
import axios from 'axios'
import styles from './Register.module.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validationErrors = validateRegister(form);
    setErrors(validationErrors);
    const allFieldsFilled = Object.values(form).every(value => value.trim() !== '');
    setIsValid(Object.keys(validationErrors).length === 0 && allFieldsFilled);
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        form
      );
      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Your account has been created",
          icon: "success",
        });
        setForm(initialState);
        navigate("/login");
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Registration failed. Please try again</a>',
        });
      }
    } catch (error) {
      console.log("Server error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Registration failed. Please try again</a>',
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateRegister(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      postData().finally(() => setIsSubmitting(false));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.polygon}>
        <h2 className={styles.subtitle}>
          New at <span className={styles.title}> Flotarium </span>? <br/> Register and start scheduling 📅
        </h2>
        <form className={styles.labels} onSubmit={handleSubmit}>
          {[
            {
              label: "Name and surname",
              name: "name",
              type: "text",
            },
            {
              label: "Email address",
              name: "email",
              type: "text",
            },
            {
              label: "Birthdate",
              name: "birthdate",
              type: "date",
            },
            {
              label: "ID number",
              name: "nDni",
              type: "number",
            },
            {
              label: "Username",
              name: "username",
              type: "text",
            },
            {
              label: "Password",
              name: "password",
              type: "password",
            },
          ].map(({ label, name, type }) => (
            <div key={name} className={styles.inputGroup}>
              <label>{label}</label>
              <input
                value={form[name]}
                name={name}
                type={type}
                onChange={handleChange}
              />
              {errors[name] && <span>{errors[name]}</span>}
            </div>
          ))}

          <button className={styles.registerButton} type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
