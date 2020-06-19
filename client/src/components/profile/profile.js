import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../actions'
import { getPosts } from '../../actions'
import { checkIfFriend } from '../../actions'
import { addFriend } from '../../actions'
import Friends from '../friends/friends'
import './profile.css';

class Profile extends Component {
    componentDidMount = async () => {
        await this.props.getUserInfo(this.props.match.params.account)
        await this.props.getPosts(this.props.match.params.account)
        // console.log(this.props)
    }


    handleAddFriend = async () => {
        this.props.addFriend(this.props.match.params.account)
    }

    renderFriendButton = () => {
        this.props.checkIfFriend(this.props.match.params.account)
        if(!this.props.isFriend) {
            return (
                <button className="btn" onClick={this.handleAddFriend}>ADD FRIEND</button>
            )
        } else {
            return (
                <button className="btn">ALREADY FRIENDS</button>
            )
        }
    }

    renderPosts = () => {
        const posts = this.props.posts.map((post, i) => {
            return (
                <div key={i}>{post.content}</div>
            )
        })

        return posts
    }

    render () {
        return (
            <div>
                <div>{this.props.user.firstname}</div>
                <div>{this.renderPosts()}</div>
                <div>{this.renderFriendButton()}</div>
                <div><Friends userAccount={this.props.match.params.account} key={this.props.match.params.account} /></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userInfo.user,
        posts: state.posts.posts,
        isFriend: state.friends.isFriend
    }
 }



export default connect(mapStateToProps, {
    getPosts: getPosts,
    getUserInfo: getUserInfo,
    checkIfFriend: checkIfFriend,
    addFriend: addFriend,
})(Profile);