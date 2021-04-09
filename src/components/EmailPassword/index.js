import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import './styles.scss';

import AuthWrapper from '../AuthWrapper/index'
import FormInput from '../Forms/FormInput'
import Button from '../Forms/Button'

import { auth } from '../../firebase/utils'

const EmailPassword = props => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit= async (e) => {
        e.preventDefault();

        try {
    
            /* redireccion en demo */
            const config = {
                url: 'http://localhost:3000/login'  /* Recordar cambiar esto al montar */
            }

            await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                props.history.push('/login')
                //console.log('Password Reset')
            })
            .catch(() => {
                const err = ['Email not found. Please try again.'];
                setErrors(err);
                //console.log('Something went wrong')
            });

        } catch(err) {
            //console.log(err)
        }
    }

    const configAuthWrapper = {
        headline: 'Email Password'
    }

    return(
        <AuthWrapper {...configAuthWrapper}>
            <div className="fromWrap">

                {errors.length > 0 && (
                    <ul>
                        {errors.map((e,index) => {
                            return(
                                <li key={index}>
                                    {e}
                                </li>
                            )
                        })}
                    </ul>
                )}

                <form onSubmit={handleSubmit}>
                    <FormInput
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    handleChange={e => setEmail(e.target.value)}/>

                    <Button type="submit">
                        Email PassWord
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    );
    
}

export default withRouter(EmailPassword); 
