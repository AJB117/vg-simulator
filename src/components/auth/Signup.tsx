import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { RouteComponentProps } from "react-router-dom";
import { firebaseApp, db } from "../../firebase";
import SignupSchema from "./util/SignupSchema";
import validateUsername from "./util/validateUsername";

const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  // const [users, setUsers] = useState<any>([]);
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
        {({ isSubmitting }) => (
          <div className="parentForm">
            <div className="childForm">
              <Form>
                <div className="loginSignupText">Sign Up</div>
                <div>
                  <Field
                    type="input"
                    name="username"
                    className="form-control"
                    placeholder="username"
                  />
                  <ErrorMessage name="username">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>

                <div>
                  <Field
                    type="input"
                    name="email"
                    className="form-control"
                    placeholder="email"
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

                <div>
                  <Button
                    className="left-btn"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>{" "}
                  <Button
                    className="right-btn"
                    variant="contained"
                    color="primary"
                    onClick={() => history.push("/login")}
                  >
                    Log In
                  </Button>{" "}
                </div>

                <div>
                  <Button
                    className="back-btn"
                    color="secondary"
                    variant="contained"
                    onClick={history.goBack}
                  >
                    Back
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
