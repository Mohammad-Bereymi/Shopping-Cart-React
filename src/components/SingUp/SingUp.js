import { useFormik } from "formik";
import Input from "../../common/Input";
import "./SignUp.css";

import * as yup from "yup";
import { Link, withRouter } from "react-router-dom";
import { signupUser } from "../../services/SignupService";
import { useState } from "react";
import { useAuthActions } from "../../Providers/AuthProvider";
import useQuery from "../../hooks/useQuery";
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

const SignUpForm = ({ history }) => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  console.log(query);
  const setAuth = useAuthActions();
  const [error, setError] = useState(null);
  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } = values;
    const userData = {
      name,
      email,
      phoneNumber,
      password,
    };
    try {
      const { data } = await signupUser(userData);
      setAuth(data);
      localStorage.setItem("authState", JSON.stringify(data));
      setError(null);
      history.push(redirect);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

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
        {error && <p style={{ color: "red", margin: "15px 0" }}>{error}</p>}
        <Link to="/login">
          <p style={{ marginTop: "15px" }}>Already Login?</p>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(SignUpForm);
