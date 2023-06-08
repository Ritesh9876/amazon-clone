import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
//import CryptoJS from "crypto-js";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
 // const { setLoadCurrent, loadCurrent } = useAuth();
  const history = useNavigate();
  // const [passwordType, setPasswordType] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  // useEffect(() => {
  //   console.log("email is canging ", email);
  // }, [email]);
  // const togglePassword = () => {
  //   setPasswordType(!passwordType);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/user/auth/login", {
          email,
          password: password,
        })
        .then((res) => {
          if (res.data.success) {
           // setLoadCurrent(!loadCurrent);
            toast.success("logged in");
            setEmail("");
            setPassword("");
            history("/");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      // console.log("login error is ", err);
      toast.error(err.message);
    }
  };
  return (
    <div>
      <div className="container-fluid">
        <div className=" row  auth_background">
          <div className="d-flex col-md-5  align-items-center auth_info_container">
            <div className="col-md-10 ml-32">
              <form className="d-flex flex-column">
                <div className="auth_text_start align_text_left ml-2 fw-600 mt-16">
                  
                </div>
                <div className="form-group auth_text_start align_text_left ml-2 fw-600 mt-24">
                  <p className="f-26 mb-2 ">Login</p>
                </div>
                <div className="form-group auth_text_start align_text_left ml-2 fw-600 mt-24">
                  {/* <label className=" f-16" htmlFor="email">
                    Email
                  </label> */}
                  <input
                    type="email"
                    className="form-control auth_input  border-bottom  shadow-none"
                    id="email"
                    placeholder="Email"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // placeholder="Enter email"
                  />
                </div>
                <div className="form-group auth_text_start align_text_left ml-2 fw-600 mt-24">
                  {/* <label className="f-16" htmlFor="password">
                    Password
                  </label> */}
                  <div className="d-flex ">
                    <div className="flex-grow-1">
                      <div className="reset_pass_input">
                        <input
                          type={showPassword ? "text" : "password"}
                          onChange={handlePasswordChange}
                          value={password}
                          name="password"
                          placeholder="Password"
                          id="password"
                          className="form-control auth_input border-bottom  shadow-none"
                        />
                        <button
                          className="auth_input_pas_btn2"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Link to="/forget-password">
                    {" "}
                    <p className="align_text_left auth_faint faint_text pointer mt-8 fit-w">
                      Forgot password
                    </p>
                  </Link>
                </div>
                <button
                  type="submit"
                  className="primary_button_lg mt-32 fw-600"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </form>
              <div>
                <p className="align_text_left auth_faint faint_text_1 pointer mt-20">
                  Not a member?{" "}
                  <span
                    className="pointer auth_login"
                    onClick={() => history("/signup")}
                  >
                    Signup
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
