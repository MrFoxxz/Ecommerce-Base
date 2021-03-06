import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import './styles.scss';
import { auth } from '../../firebase/utils'

import Logo from '../../assets/MrFoxLogo.png'

const Header = props => {
    const { currentUser } = props;

    return(
        <header className="header">
        <div className="wrap">
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="MrFox Logo" />
                </Link>
            </div>
            <div className="callToActions">

                {currentUser && ( /* Si el usuario INICIO sesión */
                    <ul>
                        <li>
                            <Link to="/Dashboard">
                                My Account
                            </Link>
                        </li>

                        <li>
                            <span onClick={() => auth.signOut()}>
                                LogOut
                            </span>
                        </li>
                    </ul>
                )}

                {!currentUser && ( /* Si el usuario NO INICIO sesión */
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
                )}

            </div>
        </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
};

const mapStateToProps = ({user}) =>({
    currentUser: user.currentUser
})

export default connect( mapStateToProps , null)(Header);