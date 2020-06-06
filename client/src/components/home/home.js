import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../actions'
import { submitPost } from '../../actions'
import './home.css';
import Feed from '../feed/feed'

class Home extends Component {
    componentDidMount = async () => {
        await this.props.getUserInfo();
    }

    handlePost = async (values) => {
        await this.props.submitPost(values) 
    }

    render() {
        const {firstname} = this.props.user
        const { handleSubmit, signInError } = this.props
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
                <div className="post-area">
                    <form onSubmit={handleSubmit(this.handlePost)}>
                        <Field name="post" component='textarea'/>
                        <button className="btn">POST</button>
                    </form>
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

 function validate() {

 }

 Home = reduxForm({
    form: 'home',
    validate: validate
 })(Home);

export default connect(mapStateToProps, {
    getUserInfo: getUserInfo,
    submitPost: submitPost
})(Home);