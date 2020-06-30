import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import './study-groups.css';

class StudyGroup extends Component  {
    render() {
        return (
            <div className="container">
                <h1>Study</h1>
            </div>
        )
    }
}


export default (StudyGroup);