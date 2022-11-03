import "./Input.css";

const Input = ({ label, name, formik, type = "text" }) => {
  return (
    <div className="formControl">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        {...formik.getFieldProps(name)}
        id={name}
      />
      {formik.errors[name] && formik.touched[name] && (
        <div className="errors">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Input;
