import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import login from './login-bg.png'
import './Signup.css'


export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toastr.error('Please fill in all the fields', 'Error');
            return;
        }

        let result = await fetch('http://localhost:4000/register', {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        if (result) {
            navigate('/login');
            toastr.success('Registration successful. You can now log in.', 'Success');
        } else {
            toastr.error('Registration failed. Please try again.', 'Error');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    toastr.options = {
        positionClass: "toast-top-center",
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="col-md-4">
                    < img src={login} className="background-image" alt="Login Background" />
                    <div className="register-box">
                        <div className="card card-outline card-primary">
                            <div className="card-header text-center">
                                <a className="h1" style={{ textDecoration: "none" }}><b>CodeQuality</b></a>
                            </div>
                            <div className="card-body">
                                <p className="login-box-msg">Register a new membership</p>
                                <form onSubmit={handleRegister}>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-user" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password"
                                            value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <div className="input-group-append">
                                            <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                                                <span className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary btn-block">Register</button>
                                        </div>
                                    </div>
                                </form>
                                <Link to="/login" className="text-center">I already have a membership</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
