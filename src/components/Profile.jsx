import React, { useState, useEffect } from "react";
import "../css/Register.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../hooks/customHooks";
import { useAuthStore } from "../store/store";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate();
  const { userName } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${userName}`);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    profile: "",
    work: "",
  });
  const [file, setFile] = useState();


  useEffect(() => {
    if (apiData) {
      setUser((prevUser) => ({
        ...prevUser,
        firstName: apiData.firstName || "",
        lastName: apiData.lastName || "",
        email: apiData.email || "",
        phone: apiData.phone || "",
        address: apiData.address || "",
        profile: apiData.profile || "",
        work: apiData.work || "",
      }));
    }
  }, [apiData]);

  const handelUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  // const navigate = useNavigate();

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

  // ==============================================
  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  // ==============================================

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await localStorage.getItem("token");
      console.log("here1");
      console.log(token);
      console.log(user);

      const data = await axios.put(
        `${process.env.REACT_APP_URL}/api/updateProfile`,
        user,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      

      console.log(user.profile);
      if (data) {
        toast.success("Update Successfull");
      } else {
        toast.success("Update not Successfull");
      }
    } catch (error) {
      console.log(error);
      toast.error("Profile Update failed. Please try again.");
    }
  };

  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <section>
      <div className="loginContainer">
        <div className="lgct">
          <div className="headIngs">
            <h1 className="headh1">Profile</h1>
            <h4 className="headh4">You Can Update The Details</h4>
          </div>
          <form className="loginForm" onSubmit={formSubmit}>
            <div className="profile">
              <label htmlFor="imgInput" className="profile">
                <img
                  className="profilimg"
                  src={file || user.profile}
                  alt="img"
                />
              </label>
              <input onChange={onUpload} id="imgInput" type="file" />
            </div>
            <div className="name flex w-3/4 gap-10">
              <input
                name="firstName"
                value={user.firstName}
                onChange={handelUser}
                type="text"
                placeholder="Firstname"
                className="email"
              />
              <input
                name="lastName"
                value={user.lastName}
                onChange={handelUser}
                type="text"
                placeholder="Lastname"
                className="email"
              />
            </div>

            <div className="name flex w-3/4 gap-10">
              <input
                name="email"
                value={user.email}
                onChange={handelUser}
                type="text"
                placeholder="Email"
                className="email"
              />
              <input
                name="phone"
                value={user.phone}
                onChange={handelUser}
                type="number"
                placeholder="Mobile No"
                className="email"
              />
            </div>
            <div className="name flex w-3/4 gap-10">
              <input
                name="address"
                value={user.address}
                onChange={handelUser}
                type="text"
                placeholder="Address"
                className="email"
              />
              <input
                name="work"
                value={user.work}
                onChange={handelUser}
                type="text"
                placeholder="Profession"
                className="email"
              />
            </div>

            <input type="submit" value={"Update"} className="emailBtn" />
          </form>

          <div className="notMem">
            <p>
              Come back latter?
              <span className="linkregister" onClick={userLogout}>
                
                Log Out
              </span>
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

export default Profile;
