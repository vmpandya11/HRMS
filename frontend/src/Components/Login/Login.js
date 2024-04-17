import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])

    const handleLogin = async () => {
        if (!email || !password) {
            toastr.error('Please fill in all the fields', 'Error');
            return;
        }

        let result = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'Application/json',
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/");
            toastr.success('You have successfully logged in', 'Success');
        } else {
            toastr.error('Please Enter Correct Details', 'Error');
        }
    };

    // Configure toastr options
    toastr.options = {
        positionClass: "toast-top-center", // Set position to top center
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="col-md-4">
                    <div className="login-box">
                        <div className="card card-outline ">
                            <div className="card-header text-center">
                                <a className="h1" style={{ textDecoration: "none" }}><b>CodeQuality</b></a>
                            </div>
                            <div className="card-body">
                                <p className="login-box-msg">Sign in to start your session</p>
                                <form>
                                    {/* Email */}
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control" placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Password */}
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="icheck-primary">
                                                <input type="checkbox" id="remember" />
                                                <label htmlFor="remember">
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="social-auth-links text-center mt-2 mb-3">
                                    <button className="btn btn-primary btn-block" type="button" onClick={handleLogin}>
                                        <i></i>LogIn
                                    </button>
                                </div>
                                <p className="mb-0">
                                    <Link to="/signup">Register a new membership</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

