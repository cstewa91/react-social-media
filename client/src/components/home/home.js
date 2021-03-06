import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../actions'
import './home.css';
import Feed from '../feed/feed'
import Friends from '../friends/friends'

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
                <div className="feed-container">
                    <Feed/>
                </div>
                <div className="friends-container">
                    <Friends/>
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
    getUserInfo: getUserInfo,
})(Home);