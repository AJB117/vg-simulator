import * as yup from "yup";
import validateUsername from "./validateUsername";

const SignupSchema = yup
  .object({
    username: yup
      .string()
      .required()
      .max(16)
      .test("validate-username", "Username already in use", (value) => {
        return validateUsername(value, false, []);
      }),
    email: yup.string().required(),
    password: yup.string().required().min(6),
  })
  .required();

export default SignupSchema;
