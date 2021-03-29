import { Component } from "react";
import { withRouter } from 'react-router-dom';
import './styles.scss';

import AuthWrapper from '../AuthWrapper/index'
import FormInput from '../Forms/FormInput'
import Button from '../Forms/Button'

import { auth } from '../../firebase/utils'

const initialState = {
    email:'',
    errors:[]
}

class EmailPassword extends Component {
    constructor(props){
        super(props);
        this.state= {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        const { name, value} = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit= async (e) => {
        e.preventDefault();

        try {
            const {email} = this.state;

            /* redireccion en demo */
            const config = {
                url: 'http://localhost:3000/login'  /* Recordar cambiar esto al montar */
            }

            await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                this.props.history.push('/login')
                //console.log('Password Reset')
            })
            .catch(() => {
                const err = ['Email not found. Please try again.'];
                this.setState({
                    errors: err
                });
                //console.log('Something went wrong')
            });

        } catch(err) {
            //console.log(err)
        }
    }

    render() {
        const { email, errors } = this.state;

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

                    <form onSubmit={this.handleSubmit}>
                        <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={this.handleChange}/>

                        <Button type="submit">
                            Email PassWord
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
        );
    }
}

export default withRouter(EmailPassword); 
