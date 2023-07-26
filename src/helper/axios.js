import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = "http://localhost:8000/";

/** Make API Requests */

/** To get userName from Token */
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwt_decode(token);
  return decode;
}

/** authenticate function */
export async function authenticate(userName) {
  try {
    return await axios.post("http://localhost:8000/api/authenticate", { userName });
  } catch (error) {
    return { error: "userName doesn't exist...!" };
  }
}

/** get User details */
export async function getUser({ userName }) {
  try {
    const { data } = await axios.get(`http://localhost:8000/api/user/${userName}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

/** register user function */
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`http://localhost:8000/api/register`, credentials);

    let { userName, email } = credentials;

    /** send email */
    if (status === 201) {
      await axios.post("http://localhost:8000/api/registerMail", {
        userName,
        userEmail: email,
        text: msg,
      });
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** login function */
export async function verifyPassword({ userName, password }) {
  try {
    if (userName) {
      const { data } = await axios.post("http://localhost:8000/api/login", { userName, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

/** update user profile function */
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("http://localhost:8000/api/updateProfile", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

/** generate OTP */
export async function generateOTP(userName) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("http://localhost:8000/api/generateOtp", { params: { userName } });

    // send mail with the OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ userName });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("http://localhost:8000/api/registerMail", {
        userName,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** verify OTP */
export async function verifyOTP({ userName, code }) {
  try {
    const { data, status } = await axios.get("http://localhost:8000/api/verifyOtp", {
      params: { userName, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/** reset password */
export async function resetPassword({ userName, password }) {
  try {
    const { data, status } = await axios.put("http://localhost:8000/api/resetPassword", {
      userName,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
