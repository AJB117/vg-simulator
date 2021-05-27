import React from "react";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { RouteComponentProps } from "react-router-dom";
import { firebaseApp, db } from "../../firebase";
import SignupSchema from "./util/SignupSchema";
import validateUsername from "./util/validateUsername";
import { ButtonGroup, TextField } from "@material-ui/core";
import "./auth.css";

const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  type SignupData = yup.InferType<typeof SignupSchema>;

  const handleSignup = async (
    data: SignupData,
    actions: FormikHelpers<SignupData>
  ) => {
    actions.setSubmitting(true);
    const username = data.username;
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        if (!validateUsername(data.username, true, [])) {
          alert("Someone already has this username!");
          throw new Error("Someone already has this username!");
        }
        db.collection("users").doc(res.user!.uid).set({
          username: username,
          decks: [],
        });
        console.log("signed up!");
        alert("You have successfully registered and will now be signed in");
        history.push("/menu");
      })
      .catch((error) => {
        actions.setSubmitting(false);
        alert(error);
        console.log(error);
      });
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (data, actions) => await handleSignup(data, actions)}
      >
        {({ isSubmitting, values, handleChange, touched, errors }) => (
          <Form className="parentForm">
            <div className="loginSignupText">Sign Up</div>
            <div>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={values.username}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <ErrorMessage name="username">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div>
              <TextField
                fullWidth
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
                fullWidth
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
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/login")}
              >
                Log In
              </Button>
              <Button
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
    </div>
  );
};

export default Signup;
