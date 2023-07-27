import React, { useState } from "react";
import "../css/Register.css";
import Profilepic from "../images/user.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    userName:"",
    email:"",
    phone:"",
    password: "",
    profile:""
  });

  const handelUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
    setUser({ ...user, profile: base64 });
  };

  // ==============================================
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  // =======================================================

  const verifyUsername = (error = {}, value) => {
    if (!value.userName) {
      error.userName = toast.error("Username Required...!");
    } else if (value.userName.includes(" ")) {
      error.userName = toast.error("Invalid Username...!");
    }
    return error;
  };

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
  const verifyEmail = (error = {}, value) => {
    if (!value.email) {
      error.email = toast.error("Email Required...!");
    } else if (value.email.includes(" ")) {
      error.email = toast.error("Invalid Email...!");
    }
    return error;
  };

  const registerValidate = (value) => {
    const error = {};

    verifyPassword(error, value);
    verifyEmail(error, value);
    verifyUsername(error, value);

    return error;
  };

  // ==============================================

  const registerUserSubmit =async (e) => {
    e.preventDefault();
    const error = registerValidate(user);
    if (Object.keys(error).length === 0) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/api/register`,
          user
        );
        if(response){
          // if (status === 201) {
          //   await axios.post("http://localhost:8000/api/registerMail", {
          //     userName,
          //     userEmail: email,
          //     text: msg,
          //   });
          // }
          console.log(response.data);
          toast.success("Registration successful!");
          navigate("/");
        }
      } catch (error) {
          toast.error("Registration failed. Please try again later.");
      }
    } else {
      toast.error("Registration Error");
    }
  };

  

  return (
    <section>
      <div className="loginContainer">
        <div className="lgct">
          <div className="headIngs">
            <h1 className="headh1">Hello Welcome</h1>
            <h4 className="headh4">Explore More By Connecting With Us.</h4>
          </div>
          <form className="loginForm" onSubmit={registerUserSubmit}>
            <label htmlFor="imgInput" className="profile">
              <img className="profilimg" src={file || Profilepic} alt="img" />
            </label>
            <input onChange={onUpload} id="imgInput" type="file" />
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handelUser}
              placeholder="Username*"
              className="email"
            />
            <input
              name="email"
              value={user.email}
              onChange={handelUser}
              type="text"
              placeholder="Email*"
              className="email"
            />
            <input
              name="phone"
              value={user.phone}
              onChange={handelUser}
              type="tel"
              placeholder="Phone*"
              className="email"
            />
            <input
              name="password"
              value={user.password}
              onChange={handelUser}
              type="text"
              placeholder="Password*"
              className="email"
            />
            <input type="submit" value={"Register"} className="emailBtn" />
          </form>

          <div className="notMem">
            <p>
              Already have a account?
              <a className="linkregister" href="/">
                {" "}
                Login Now
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

export default Register;
