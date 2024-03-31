import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../api/api";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../reducers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user.user != null) {
      window.location.href = "/";
    } else {
      return;
    }
  }, [user]);
  const reduxDispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(data.email, data.password)
      .then((res) => {
        // console.log(res);

        if (res.status === 200) {
          console.log(res);
          reduxDispatch(
            loginSuccess({
              name: res.data.user.name,
              email: res.data.user.email,
              walletAddress: res.data.user.walletAddress,
              balance: res.data.user.balance,
              token: res.data.token,
            })
          );
          //   window.location.href = "/";
        } else {
          toast.error("Invalid Credentials");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          return toast.error("Invalid credentials");
        } else if (err.response.status === 400) {
          return toast.error("User does not exists. Please register");
        }
      });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <form onSubmit={handleLogin}>
            <span>Sign In</span>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="text-right">
              <Link to="/forgot">Forgot Password?</Link>
            </div>
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </form>
          <h2>
            Don't have an account? <Link to="/register">Sign up here</Link>
          </h2>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
