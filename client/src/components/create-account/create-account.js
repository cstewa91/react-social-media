import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createNewAccount } from '../../actions'
import Input from '../input/input';
import './create-account.scss'
import {Link} from 'react-router-dom'
import createAccountImage from '../../assets/images/create-account.png'

class CreateNewAccount extends Component {
   handleCreateAccount = async (values) => {
      await this.props.createNewAccount(values);
   }
   pushToHome = () => {
      const { account } = this.props
      if (account) {
         this.props.history.push('/home')
      }
   }
   loginNewAccount = (values) => {
      const { account } = this.props
      if (account) {
        //  this.props.loginApp(values)
      }
   }
   render() {
      const { handleSubmit, invalidEmail, invalidUsername } = this.props
      return (
         <div className="sign-up container">
            <div className="sign-up-container">
               <h1>Create an Account</h1>
               <p className="sub-text">Already have one? <Link to={`/`}>Sign in.</Link></p>
               <form className="account-form row" onSubmit={handleSubmit(this.handleCreateAccount)}>
                     <Field name="firstname" placeholder="First Name" maxLength='30' component={Input}  />
                     <Field name="lastname" placeholder="Last Name" maxLength='30' component={Input} />
                     <Field name="email" placeholder="Your School Email" maxLength='40' component={Input} />
                     <p className="create-account-error">{invalidEmail}</p>
                     <Field name="password" placeholder="Password" maxLength='30' component={Input} type="password" />
                     <button className="btn">Sign Up</button>
               </form>
            </div>
            <div className="image-container">
               <p>CampusLife connects you with your peers.</p>
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
    //   invalidEmail: state.createAccount.validEmail,
    //   invalidUsername: state.createAccount.validUsername,
    //   account: state.createAccount.account
   }
}

CreateNewAccount = reduxForm({
   form: 'create-account',
   validate: validate
})(CreateNewAccount);

export default connect(mapStateToProps, {
    createNewAccount: createNewAccount,
//    loginApp: loginApp,
})(CreateNewAccount)