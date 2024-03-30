import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../../api/api';
import { useSelector } from 'react-redux';
export default function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user.user != null) {
            window.location.href = "/";
        }
        else {
           return;
        }
    }, [user]);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("handleLogin");
        loginUser(data.email, data.password).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        });
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="vh-100 d-flex justify-content-center">
            <div className="form-access my-auto">
                <form onSubmit={handleLogin}>
                    <span>Sign In</span>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email Address" name='email' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" name='password' onChange={handleChange} />
                    </div>
                    <div className="text-right">
                        <Link to="/forgot">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
                <h2>Don't have an account? <Link to="/register">Sign up here</Link></h2>
            </div>
        </div>
    )
}
