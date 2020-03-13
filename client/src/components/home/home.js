import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import './home.css';
import Feed from '../feed/feed'

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="account-container">
                    <div className="person-info">
                        <h1>Collin Stewart</h1>
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

export default (Home)