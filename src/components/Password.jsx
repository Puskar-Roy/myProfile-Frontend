import React , {useState} from "react";
import "../css/Login.css";
import Profilepic from "../images/user.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../store/store";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";
import useFetch from "../hooks/customHooks";




const Password = () => {
  const { userName } = useAuthStore((state) => state.auth);
    const navigate = useNavigate();
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${userName}`);


  const [user, setUser] = useState({
    password: '',
  });

  const handelUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  const verifyPasswordd = ( value) => {
    const error = {};
    if (!value.password) {
      error.password = toast.error("Password Required...!");
    } else if (value.password.includes(" ")) {
      error.password = toast.error("Invalid Password...!");
    } else if (value.password.length<6) {
      error.password = toast.error("Password Must Be Greater");
    }
    return error;
  };

  const passwordValidate = async (e) => {
      e.preventDefault();
      let password = user.password;
      const error = verifyPasswordd(user);
  if (Object.keys(error).length === 0) {
    try {
      const { data } = await axios.post(
        `https://api-myprofile.onrender.com/api/login`,
        { userName, password }
      );
      localStorage.setItem("token", data.token);
      toast.success("User Login");
      navigate("/profile");
    } catch (error) {
        toast.error("Wrong Password!");
    } 
  }

    return error;
  };
  
  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-4xl">Page Expire!, <a className="" href="/">Go Home</a></h1>;


  return (
    <section>
      <div className="loginContainer">
        <div className="lgct">
          <div className="headIngs">
            <h1 className="headh1">Hello {userName}</h1>
            <h4 className="headh4">Explore More By Connecting With Us.</h4>
          </div>
          <form className="loginForm" onSubmit={passwordValidate}>
            <div className="profile">
              <img
                className="profilimg"
                src={apiData?.profile || Profilepic}
                alt="img"
              />
            </div>
            <input
              onChange={handelUser}
              value={user.password}
              type="text"
              placeholder="Password..."
              className="email"
              name="password"
            />
            <input type="submit" value={"Sign In"} className="emailBtn" />
          </form>

          <div className="notMem">
            <p>
              Forgot Password?
              <Link className="linkregister" to={"/recover"}>
                Recover Now
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
};

export default Password;
