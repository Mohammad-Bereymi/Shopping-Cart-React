import { useFormik } from "formik";
import Input from "../../common/Input";
import { Link, withRouter } from "react-router-dom";
import "./Login.css";
import useQuery from "../../hooks/useQuery";
import * as yup from "yup";
import { useState } from "react";
import { LoginUser } from "../../services/LoginService";
import { useAuthActions } from "../../Providers/AuthProvider";
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

const LoginForm = ({ history }) => {
  const setAuth = useAuthActions();
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const [error, setError] = useState(null);
  const onSubmit = async (values) => {
    try {
      const { data } = await LoginUser(values);
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
        {error && <p style={{ color: "red", margin: "15px 0" }}>{error}</p>}

        <Link to={`/login?redirect=${redirect}`}>
          <p style={{ marginTop: "15px" }}>Not Signup yet?</p>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
