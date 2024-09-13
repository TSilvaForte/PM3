import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NavBar from "../components/NavBar";
import styles from "./Login.module.css";
import axios from 'axios';
import Swal from "sweetalert2";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    postData(values).finally(() => {
      setSubmitting(false);
      resetForm(); // Restablece el formulario después de enviar
    });
  };

  const postData = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        username: values.username,
        password: values.password,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Now you are logged in",
          icon: "success",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Login failed. Please try again</a>',
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Login failed. Please try again</a>',
      });
    }
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.polygon}>
        <h1 className={styles.title}>LOGIN</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={styles.formContainer}>
            <div>
              <label className={styles.labelLogin} htmlFor="username">
                Username
              </label>
              <Field
                type="text"
                name="username"
                aria-label="username"
                className={styles.inputField}
              />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <label className={styles.labelLogin} htmlFor="password">
                Password
              </label>
              <Field
                type="password"
                name="password"
                aria-label="password"
                className={styles.inputField}
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <button
              className={styles.loginButton}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <div className={styles.popup}>
        <div className={styles.popupText}>
          <h2>Want 10% Off?</h2>
          <p>Join our newsletter now</p>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.emailInput}
            aria-label="email"
          />
          <button className={styles.subscribeButton}>Subscribe</button>
        </div>
        <div className={styles.popupImage}>
          <img src="/woman-newsletter.jpg" alt="Newsletter" />
        </div>
      </div>
    </div>
  );
};

export default Login;