import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { logOut } from '../../actions'
import './header.scss';
import logo from '../../assets/images/logo.png'

class Header extends Component {
    handleLogOut = async () => {
        cookie.remove("token")
        await this.props.logOut();
        await this.props.history.push('/')

    }
    render() {
        if(this.props.location.pathname !== '/create-account' && this.props.location.pathname !== '/') {
            return (
                <header>
                    <div className="logo-container">
                        <img src={logo} alt={"logo"} className="logo"/>
                    </div>
                    <button className="btn" onClick={this.handleLogOut}>Log Out</button>
                </header>
            )
        } else {
            return (
                <header className="create-account-header">
                    <div className="logo-container">
                        <img src={logo} alt={"logo"} className="logo"/>
                    </div>
                </header>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.login.loggedIn
    }
 }

export default connect(mapStateToProps, {
    logOut: logOut
 })(Header);