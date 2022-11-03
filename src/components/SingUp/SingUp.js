import { useFormik } from "formik";
import Input from "../../common/Input";
import "./SignUp.css";

import * as yup from "yup";
import { Link } from "react-router-dom";
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirmation: "",
};
const validationSchema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .min(6, "Name length is not valid"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("email is reuqired"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Invalid phone Number")
    .nullable(),
  password: yup
    .string()
    .required("password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirmation: yup
    .string()
    .required("password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const onSubmit = (values) => {
  console.log(values);
};
const SignUpForm = () => {
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
        <Input name="name" label="Name" formik={formik} />
        <Input name="email" label="Email" formik={formik} type="email" />
        <Input
          name="phoneNumber"
          label="Phone Number"
          formik={formik}
          type="tel"
        />
        <Input
          name="password"
          label="Password"
          formik={formik}
          type="password"
        />
        <Input
          name="passwordConfirmation"
          label="Password Confirmation"
          formik={formik}
          type="password"
        />
        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
        >
          Signup
        </button>
        <Link to="/login">
          <p style={{ marginTop: "15px" }}>Not Signup yet?</p>
        </Link>
      </form>
    </div>
  );
};

export default SignUpForm;
