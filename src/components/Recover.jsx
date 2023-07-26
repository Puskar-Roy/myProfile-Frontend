import React from "react";
import "../css/Login.css";



const Recover = () => {
  return (
    <section>
      <div className="loginContainer">
        <div className="lgctRE">
          <div className="headIngs">
            <h1 className="headh1">Recovery</h1>
            <h4 className="headh4">Enter OTP to recover password</h4>
          </div>
          <form className="loginFormRE" >
            <h2 className="headh2">Enter 6 digit OTP sent to your email</h2>
            <input
              type="text"
              placeholder="OTP"
              className="email"
            />
            <input type="submit" value={"Recover"} className="emailBtn" />
          </form>

          <div className="notMem">
            <p>
              Can't get OTP?
               <a className="linkregister" href="/profile"> Resend
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recover;
