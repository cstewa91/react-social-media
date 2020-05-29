import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createNewAccount } from '../../actions'
import Input from '../input/input';
import './create-account.css'
import {Link} from 'react-router-dom'

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
         <div>
               <form className="account-form row" onSubmit={handleSubmit(this.handleCreateAccount)}>
                  <div>
                     <Field name="firstname" label="First Name" maxLength='30' component={Input} inputClassName="create-account-user-input" errorClassName="create-account-error" />
                  </div>
                  <div className="create-account-input-padding col-8">
                     <Field name="lastname" label="Last Name" maxLength='30' component={Input} inputClassName="create-account-user-input" errorClassName="create-account-error" />
                  </div>
                  <div>
                     <Field name="email" label="E-mail" maxLength='40' component={Input} inputClassName="create-account-user-input" errorClassName="create-account-error" />
                     <p className="create-account-error">{invalidEmail}</p>
                  </div>
                  <div>
                     <Field name="password" label="Password" maxLength='30' component={Input} type="password" inputClassName="create-account-user-input" errorClassName="create-account-error" />
                  </div>
                  <div>
                     <Field name="confirmPassword" label="Confirm Password" maxLength='30' component={Input} type="password" inputClassName="create-account-user-input" errorClassName="create-account-error" />
                  </div>
                  <div>
                     <button>CONFIRM</button>
                  </div>
               </form>
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