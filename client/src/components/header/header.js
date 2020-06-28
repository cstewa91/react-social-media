import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { logOut } from '../../actions'
import './header.css';

class Header extends Component {
    handleLogOut = async () => {
        cookie.remove("token")
        await this.props.logOut();
        await this.props.history.push('/')

    }
    render() {
        return (
            <header>
                <button className="btn" onClick={this.handleLogOut}>Log Out</button>
            </header>
        )
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