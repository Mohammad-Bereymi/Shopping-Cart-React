import { useFormik } from "formik";
import Input from "../../common/Input";
import "./Login.css";

import * as yup from "yup";
const initialValues = {
  email: "",
  password: "",
};
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("email is reuqired"),

  password: yup
    .string()
    .required("password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

const onSubmit = (values) => {
  console.log(values);
};
const LoginForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
    <div className="formContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input name="email" label="Email" formik={formik} type="email" />

        <Input
          name="password"
          label="Password"
          formik={formik}
          type="password"
        />

        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
