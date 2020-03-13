import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import './books.css';

class Books extends Component  {
    render() {
        return (
            <div className="container">
                <h1>Books</h1>
            </div>
        )
    }
}

export default (Books);