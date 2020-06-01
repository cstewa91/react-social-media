import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { loginToApp } from '../../actions'
import Input from '../input/input';
import Cookies from 'js-cookie';
import './login.css';


class Login extends Component {
   handleLogin = async (values) => {
      await this.props.loginToApp(values)
      console.log(this.props.loggedIn)
   }
   login = () => {
         this.props.history.push('/home')
   }
   componentDidMount = () => {
      console.log(Cookies.get())
   }
   render() {
      const { handleSubmit, signInError } = this.props
      return (
         <div className="container">
            <div className="title-container">
               <h1 className="title">Campus Life</h1>
            </div>
            <form className="login-form" onSubmit={handleSubmit(this.handleLogin)}>
               <div className="input-container">
                  <Field name="email" label="E-mail" component={Input} inputClassName="login-user-input" labelClassName="label-login-color"/>
               </div>
               <div className="input-container">
                  <Field name="password" label="Password" component={Input} type="password" inputClassName="login-user-input" labelClassName="label-login-color" />
               </div>
               <div className="btn-container">
                <button className="btn">Sign In</button>
               </div>
            </form>
            <div className="create-account-container">
               <Link to='/create-account' className="create-account" >Create Account</Link>
            </div>
         </div>
      )
   }
}

function validate({ email, password }) {
//    const error = {};
//    if (!email) {
//       error.email = 'Please enter your email'
//    }
//    if (!password) {
//       error.password = 'Please enter your password'
//    }
//    return error
}

function mapStateToProps(state) {
   return {
      loggedIn: state.login.loggedIn
   }
}

Login = reduxForm({
   form: 'login',
   validate: validate
})(Login);

export default connect(mapStateToProps, {
   loginToApp: loginToApp,
})(Login);

