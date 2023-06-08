import React, { useState, useEffect } from "react";
//import axios from '../../../Api/index'
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from 'axios'
import genPassword from "../../../AuthUtils/index"
const user_regex = /^[a-zA-Z]{2,30}$/;
const email_regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;

export default function Signup() {
  const history = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [validName] = useState(false);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  useEffect(() => {
    setValidFirstName(user_regex.test(firstName.trim()));
  }, [firstName]);
  //eslint and priettier seetup
  useEffect(() => {
    setValidLastName(user_regex.test(lastName.trim()));
  }, [lastName]);

  useEffect(() => {
    setValidEmail(email_regex.test(email.trim()));
    if (email.trim().length === 0) setValidEmail(false);
  }, [email]);

  useEffect(() => {
    setValidPassword(password_regex.test(password));
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstNameCheck = user_regex.test(firstName.trim());
    const lastNameCheck = user_regex.test(lastName.trim());
    // const emailCheck = email_regex.test(email.trim());
    const passCheck = password_regex.test(password);
    if (!firstNameCheck || !lastNameCheck || !passCheck) {
      toast.error("Invalid Entry");
      return;
    }
    if (!validEmail) {
      toast.error("Please use work email");
      return;
    }
    try {
     
      await axios
        .post(
          "http://localhost:5000/api/user/auth/signup",
          {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password:password
          }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success("Signup complete");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            history("/login");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
      // setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 409) {
        toast.error("Username Taken");
      } else {
        toast.error("Registration Failed");
      }
      // errRef.current.focus();
    }
  };


  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div>
      <div className="container-fluid">
        <div className=" row auth_background">
          <div className="d-flex col-md-5  align-items-center auth_info_container">
            <div className="ml-32 col-md-10">
              <form className="d-flex flex-column">
                <div className="align_text_left ml-2 fw-600 mt-16">
                </div>
                <div className="form-group align_text_left ml-2 fw-600 mt-20">
                  <p className="f-26 mb-2  ">Sign up</p>
                </div>

                <div className="form-group align_text_left ml-2 fw-600 mt-20">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control auth_input  border-bottom  shadow-none"
                    id="first_name"
                    autoComplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    aria-invalid={validName ? "false" : "true"}
                  />
                </div>

                <div className="form-group align_text_left ml-2 fw-600 mt-20">
                  {/* <label className=" f-16 d-flex" htmlFor="last_name">
                    <p>Last Name</p>
                    <i
                      className={
                        validLastName ||
                        !(lastName || lastName.trim().length > 0)
                          ? "auth_hide"
                          : "bi bi-asterisk auth_invalid"
                      }
                    ></i>
                  </label> */}
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control auth_input  border-bottom  shadow-none"
                    id="last_name"
                    autoComplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    // aria-invalid={validName ? "false" : "true"}
                  />
                </div>

                <div className="form-group align_text_left ml-2 fw-600 mt-20">
                  {/* <label className=" f-16 d-flex" htmlFor="email">
                    <p>Email</p>
                    <i
                      className={
                        validEmail || !(email || email.trim().length > 0)
                          ? "auth_hide"
                          : "bi bi-asterisk auth_invalid"
                      }
                    ></i>
                  </label> */}
                  <input
                    placeholder="Email"
                    type="text"
                    className="form-control auth_input  border-bottom  shadow-none"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>

                <div className="form-group align_text_left ml-2 fw-600 mt-20">
                  {/* <label className="f-16" htmlFor="password">
                    Password
                  </label> */}
                  <div className="d-flex mb-16">
                    <div className="flex-grow-1">
                      <input
                        type={passwordType}
                        name="password"
                        placeholder="Password"
                        id="password"
                        className="form-control auth_input border-bottom  shadow-none"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="password_description"
                        // onFocus={() => setPassFocus(true)}
                        // onBlur={() => setPassFocus(false)}
                        required
                      />
                    </div>
                    <div
                      onClick={togglePassword}
                      className="border-bottom auth_eye pointer"
                    >
                      {passwordType === "password" ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </div>
                  </div>
                  {/* <p
                    id="password_description"
                    className={
                      (passFocus && !validPassword
                        ? "auth_instructions"
                        : "auth_hide") + " mb-16"
                    }
                  > */}
                    {/* 8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span> */}
                  {/* </p> */}
                </div>

                <div className="d-flex align-items-center mt-16">
                  <input
                    type="checkbox"
                    id="teams_checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                    }}
                  />
                  <p className="signup_faint faint_text ms-2">
                    I agree to the{" "}
                    <span className="link_text">Terms of Service</span> and{" "}
                    <span className="link_text">Privacy Policy</span>
                  </p>
                </div>
                <button
                  type="submit"
                  className="primary_button_lg mt-24 fw-600"
                  disabled={
                    !validFirstName ||
                    !validLastName ||
                    !validPassword ||
                    !agreeTerms
                      ? true
                      : false
                  }
                  onClick={handleSubmit}
                >
                  Sign up
                </button>
              </form>

              <div className="auth_text_left">
                <p className="faint_text_1">
                  Already have an account? &nbsp;
                  <a href="/login" className="auth_login">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
