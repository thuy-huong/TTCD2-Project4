import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginAPI } from '../../services/userSevice'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            message: ''
        }

    }
    handleOnChangeEmail = (event) => {

        this.setState({
            email: event.target.value
        })

    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })

    }
    handleLogin = async () => {
        this.setState({
            message: ''
        })
        // console.log('emai: ', this.state.email, "password: ", this.state.password)
        // console.log('all state: ', this.state)
        try {
            let data = await handleLoginAPI(this.state.email, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    message: data.message
                })
            }
            if (data && data.errCode === 0) {
                console.log(data.user)
                this.props.userLoginSuccess(data.user)

            }
        } catch (error) {

            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        message: error.response.data.message
                    })
                }
            }


        }

    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-title'>Login</div>
                        <div className='col-12 text-danger'> {this.state.message}</div>
                        <div className='col-12 form-group login-input' >
                            <label>Emai</label>
                            <input type='text'
                                className='form-control'
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                                placeholder='Enter your email' />
                        </div>
                        <div className='col-12 form-group login-input' >
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    placeholder='Enter your password' />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }}
                                > <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>

                            </div>

                        </div>
                        <div className='col-12'> <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button></div>
                        <div className='col-12 forgot-password'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>

                            <span className='text-other-login'>Or Login with: </span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>

                            <i className="fab fa-facebook-f facebook"></i>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),

        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
