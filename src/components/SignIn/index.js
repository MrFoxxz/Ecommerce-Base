import React, { useState } from 'react';
import Buttons from '../../components/Forms/Button'
import './styles.scss';
import { signInWithGoogle, auth } from '../../firebase/utils';
import {Link, withRouter} from 'react-router-dom'

import AuthWrapper from '../AuthWrapper/index'
import FormInput from '../Forms/FormInput/index';
import Button from '../Forms/Button/index';

const SignIn = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault()
        props.history.push('/');
    
        try{
            
            await auth.signInWithEmailAndPassword(email, password)
            resetForm();

        } catch(err) {
            // console.log(err);
        }
    }

    const configAuthWrapper = {
        headline: "LogIn"
    };

    return (
        <AuthWrapper {...configAuthWrapper}>

            <div className="formWrap">
                <form onSubmit={handleSubmit}>

                    <FormInput
                    type="email"
                    name="email"
                    value= {email}
                    placeholder="Email"
                    handleChange={e => setEmail(e.target.value)}
                    />

                    <FormInput
                    type="password"
                    name="password"
                    value= {password}
                    placeholder="Password"
                    handleChange={e => setPassword(e.target.value)}
                    />

                    <Button type="submit">
                        LogIn
                    </Button>

                    <div className="socialSignin">
                        <div className="row">
                            <Buttons onClick={signInWithGoogle}>
                                Sign in with Google
                            </Buttons>
                        </div>
                    </div>
                    
                    <div className="links">
                        <Link to="/Recovery">
                            Reset Password
                        </Link>
                    </div>
                </form>
            </div>
            
        </AuthWrapper>
    );
    
};

export default withRouter(SignIn);