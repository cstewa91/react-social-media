import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import './clubs.css';

class Clubs extends Component  {
    render() {
        return (
            <div className="container">
                <h1>Clubs</h1>
            </div>
        )
    }
}

export default (Clubs);