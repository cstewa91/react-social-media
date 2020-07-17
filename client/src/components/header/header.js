import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { logOut } from '../../actions'
import './header.scss';
import {Link} from 'react-router-dom'
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
                <header className="header">
                    <div className="logo-container">
                        <img src={logo} alt={"logo"} className="logo"/>
                    </div>
                    <div className="links-container">
                        <div className="search-container">
                            <input id="search" type="text" placeholder="Search"/>
                        </div>
                        <div className="links">
                            <Link to={'home'}>Feed</Link>
                            <Link to={'messages'}>Messages</Link>
                            <Link to={'friend-requests'}>Requests</Link>
                            <Link to={'market-palce'}>Market Place</Link>
                            <Link to={'account-settings'}>Settings</Link>
                        </div>

                    </div>
                    {/* <button className="btn" onClick={this.handleLogOut}>Log Out</button> */}
                </header>
            )
        } else {
            return (
                <header className="create-account-header">
                    <Link to={'/'}>
                        <div className="logo-container">
                            <img src={logo} alt={"logo"} className="logo"/>
                        </div>
                    </Link>
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