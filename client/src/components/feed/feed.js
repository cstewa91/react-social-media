import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import './feed.css';

class Feed extends Component {
    render() {
        return (
            <div className="container">
                <h1>FEED</h1>
            </div>

        )
    }
}

export default (Feed)