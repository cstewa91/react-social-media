import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../actions'
import { getPosts } from '../../actions'
import './profile.css';

class Profile extends Component {
    componentDidMount = async () => {
        await this.props.getUserInfo(this.props.match.params.account)
        await this.props.getPosts(this.props.match.params.account)
    }

    render () {
        return (
            <div>{this.props.user.firstname}</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userInfo.user,
        posts: state.posts.posts,
    }
 }



export default connect(mapStateToProps, {
    getPosts: getPosts,
    getUserInfo: getUserInfo,
})(Profile);