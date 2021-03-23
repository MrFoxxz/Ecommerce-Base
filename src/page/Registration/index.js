import React, {Component} from 'react';
import Signup from '../../components/SignUp/index'

import './styles.scss'

class Registration extends Component {

    render(){
        return(
            <div>
                <h1>
                    <Signup />
                </h1>
            </div>
        );
    }
};

export default Registration;
