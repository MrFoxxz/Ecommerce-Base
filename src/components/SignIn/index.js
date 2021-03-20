import React from 'react';
import Buttons from '../../components/Forms/Button'
import './styles.scss';

const SignIn = props => {
    return (
        <div className="signin">
            <div className="wrap">
                <h2>
                    Login
                </h2>

                <div className="formWrap">
                    <form>
                        <div className="socialSignin">
                            <div className="row">
                                <Buttons>
                                    Sign in with Google
                                </Buttons>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;