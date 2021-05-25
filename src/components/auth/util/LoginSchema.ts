import * as yup from "yup";

const LoginSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required().min(6),
  })
  .required();

export default LoginSchema;
