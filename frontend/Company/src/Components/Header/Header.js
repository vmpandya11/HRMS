import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaLanguage } from 'react-icons/fa'; // Import the language icon

const Header = () => {
    // const auth = localStorage.getItem('user');
    // const navigate = useNavigate();
    // const logout = () => {
    //     localStorage.clear();
    //     navigate("/signup")
    // }

    // if (!localStorage.getItem('user')) {
    //     navigate('/');
    // }

    return (
        <div>
            <nav className="main-header navbar navbar-expand">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {/* <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a> */}
                    </li>
                </ul>

                {/* Language Switcher */}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FaLanguage size={20} style={{ marginRight: '5px' }} /> Language
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">English</a>
                            <a className="dropdown-item" href="#">Hindi</a>
                            <a className="dropdown-item" href="#">Gujarati</a>
                        </div>
                    </li>
                </ul>
                {/* 
                Auth and Logout
                <ul className="navbar-nav ml-auto">
                    {auth ?
                        <Link onClick={logout} to="/signup">
                            <a style={{ color: "black", marginRight: "20px", textDecoration: "none" }} className='no-underline'>Logout</a>
                        </Link>
                        :
                        <Link to="/signup">
                            <li className="nav-item d-none d-sm-inline-block">
                                <a className="nav-link">Sign up</a>
                            </li>
                        </Link>
                    }
                </ul> */}
            </nav>
        </div>
    );
};
export default Header;
