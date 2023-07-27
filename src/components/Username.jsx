import React from 'react'
import '../css/Login.css'
import Profilepic from '../images/user.png'
 import { toast, ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { useNavigate , Link} from "react-router-dom";
import axios from 'axios'
import { useState } from 'react'
import { useAuthStore } from "../store/store";

const Username = () => {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);
  let userName;

  const [user, setUser] = useState({
    userName: "",
  });

  const handelUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const verifyUsername = (value) => {
    const error = {};
    if (!value.userName) {
      error.userName = toast.error("Username Required...!");
    } else if (value.userName.includes(" ")) {
      error.userName = toast.error("Invalid Username...!");
    }
    return error;
  };

  const userValidate = async (e) => {
    e.preventDefault();
    const validationErrors = verifyUsername(user);
    if (Object.keys(validationErrors).length === 0) {
      userName = user.userName;
      try {
        const handle = await axios.post(
          `https://api-myprofile.onrender.com/api/authenticate`,
          { userName }
        );
        if (handle) {
          toast.success("User Found");
          setUsername(userName);
          setUser({ userName: "" });
          navigate("/password");
        }
      } catch (error) {
        // console.error("Error occurred:", error.message);
        toast.error(
          "Error occurred while authenticating user." +
            process.env.REACT_APP_URL
        );
      }
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
          <form className="loginForm" onSubmit={userValidate}>
            <div className="profile">
              <img className="profilimg" src={Profilepic} alt="img" />
            </div>
            <input
              name="userName"
              value={user.userName}
              type="text"
              placeholder="Username..."
              className="email"
              onChange={handelUser}
            />
            <input
              type="submit"
              value={"Lets Go"}
              className="emailBtn"
              onClick={userValidate}
            />
          </form>

          <div className="notMem">
            <p>
              Not A Member{" "}
              <Link className="linkregister" to="/register">
                Register Now
              </Link>
    
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
}

export default Username
