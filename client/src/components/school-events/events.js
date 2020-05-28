import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import './events.css';

class Events extends Component  {
    render() {
        return (
            <div className="container">
                <h1>Events</h1>
            </div>
        )
    }
}

export default (Events);