import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.css';

class Header extends Component {
    handleLogOut = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.props.history.push('/')

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

    }
 }

export default connect(mapStateToProps, {

 })(Header);