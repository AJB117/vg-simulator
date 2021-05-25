import React from "react";
import { RouteComponentProps } from "react-router-dom";
import * as yup from "yup";
import { firebaseApp } from "../../firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@material-ui/core/Button";
import LoginSchema from "./util/LoginSchema";
import "./auth.css";
import { ButtonGroup } from "@material-ui/core";

type LoginData = yup.InferType<typeof LoginSchema>;

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const handleLogin = async (data: LoginData) => {
    if (!data) return;
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
    <div>
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
        {({ isSubmitting }) => (
          <form className="parentForm">
            <Form>
              <div className="loginSignupText">Log In</div>
              <div>
                <Field
                  type="input"
                  name="email"
                  placeholder="email"
                  className="form-control"
                />
                <ErrorMessage name="email">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="password"
                />
                <ErrorMessage name="password">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>

              <ButtonGroup>
                <Button
                  className="left-btn"
                  disabled={isSubmitting}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>{" "}
                <Button
                  className="right-btn"
                  color="primary"
                  variant="contained"
                  onClick={() => history.push("/signup")}
                >
                  Sign Up
                </Button>{" "}
                <Button
                  className="back-btn"
                  color="secondary"
                  variant="contained"
                  onClick={history.goBack}
                >
                  Back
                </Button>
              </ButtonGroup>
            </Form>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
