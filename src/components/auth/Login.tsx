import React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as yup from "yup";
import { firebaseApp } from "../../firebase";
import { ErrorMessage, Form, Formik } from "formik";
import Button from "@material-ui/core/Button";
import LoginSchema from "./util/LoginSchema";
import "./auth.css";
import { ButtonGroup, TextField } from "@material-ui/core";

type LoginData = yup.InferType<typeof LoginSchema>;

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const handleLogin = async (data: LoginData) => {
    console.log(data);
    if (!data) return;
    console.log("logging in..");
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        console.log("signed in!");
        sessionStorage.removeItem("decks");
        history.push("/menu");
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        await handleLogin(data);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting, values, handleChange, touched, errors }) => (
        <Form className="parentForm">
          <div className="loginSignupText">Log In</div>
          <div>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <ErrorMessage name="email">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
          </div>

          <div>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <ErrorMessage name="password">
              {(msg) => <div style={{ color: "red" }}>{msg}</div>}
            </ErrorMessage>
          </div>

          <ButtonGroup className="buttonGroup">
            <Button
              className="left-btn"
              disabled={isSubmitting}
              color="primary"
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
            <Button
              className="right-btn"
              color="primary"
              variant="contained"
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </Button>
            <Button
              className="back-btn"
              color="secondary"
              variant="contained"
              onClick={() => history.push("/")}
            >
              Back
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
