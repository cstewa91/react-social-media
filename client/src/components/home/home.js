import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../actions'
import './home.css';
import Feed from '../feed/feed'
import Cookies from 'js-cookie';

class Home extends Component {
    componentDidMount = async () => {
        await this.props.getUserInfo();
    }

    render() {
        const {firstname} = this.props.user
        return (
            <div className="container">
                <div className="account-container">
                    <div className="person-info">
                        <h1>{firstname}</h1>
                    </div>
                </div>
                <div className="link-container">
                    <div><Link to='/study-groups' className="create-account" >Study Groups</Link></div>
                    <div><Link to='/books' className="create-account" >Books</Link></div>
                    <div><Link to='/clubs' className="create-account" >Clubs</Link></div>
                    <div><Link to='/events' className="create-account" >Events</Link></div>
                </div>
                <div className="feed-container">
                    <Feed />
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userInfo.user
    }
 }

export default connect(mapStateToProps, {
    getUserInfo: getUserInfo
})(Home);