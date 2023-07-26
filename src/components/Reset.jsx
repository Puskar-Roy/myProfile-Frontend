import React from "react";
import "../css/Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";

const Reset = () => {
  const verifyPassword = (error = {}, value) => {
    if (!value.password) {
      error.password = toast.error("Password Required...!");
    } else if (value.password.includes(" ")) {
      error.password = toast.error("Invalid Password...!");
    } else if (value.password.length < 6) {
      error.password = toast.error("Password Must Be Greater");
    }
    return error;
  };

  const passwordValidate = async (value) => {
    const error = verifyPassword({}, value);
    if(value.password !== value.cpassword){
        error.exist = toast.error("Passwords Must Be Same")
    }
    return error;
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: ""
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (val) => {
      console.log(val);
    },
  });
  return (
    <section>
      <div className="loginContainer">
        <div className="lgctReset">
          <div className="headIngs">
            <h1 className="headh1">Reset</h1>
            <h4 className="headh4">Enter New Password</h4>
          </div>
          <form className="loginFormReset" onSubmit={formik.handleSubmit}>
            <input
                {...formik.getFieldProps("password")}
                type="text"
                placeholder="Password"
                className="email"
              />
            
            <input
              {...formik.getFieldProps("cpassword")}
              type="text"
              placeholder="Confirm Password"
              className="email"
            />
            <input type="submit" value={"Sign In"} className="emailBtn" />
          </form>

          <div className="notMem">
            <p>
              Forgot Password?
              <a className="linkregister" href="/recover">
                {" "}
                Recover Now
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
};

export default Reset;
