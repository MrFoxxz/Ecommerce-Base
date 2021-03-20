import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

import Logo from '../../assets/MrFoxLogo.png'

const Header = props => {
    return(
        <header className="header">
        <div className="wrap">
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="MrFox Logo" />
                </Link>
            </div>
            <div className="callToActions">
                <ul>
                    <li>
                        <Link to="/registration">
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        </header>
    );
};

export default Header;