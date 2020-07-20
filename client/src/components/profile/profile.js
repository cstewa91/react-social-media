import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../actions'
import { getPosts } from '../../actions'
import { checkIfFriend } from '../../actions'
import { addFriend } from '../../actions'
import Friends from '../friends/friends'
import './profile.scss';

class Profile extends Component {
    componentDidMount = async () => {
        await this.props.getUserInfo(this.props.match.params.account, 'profile')
        await this.props.getPosts(this.props.match.params.account)
        this.sortPosts()
    }


    handleAddFriend = async () => {
        this.props.addFriend(this.props.match.params.account)
    }

    sortPosts = () => {
        this.props.posts.sort(function(a,b) {
            return new Date(b.datePosted) - new Date(a.datePosted)
        })
    }

    renderFriendButton = () => {
        this.props.checkIfFriend(this.props.match.params.account)
        if(!this.props.isFriend) {
            return (
                <button className="btn" onClick={this.handleAddFriend}>ADD FRIEND</button>
            )
        } else {
            return (
                <button className="btn">FRIENDS</button>
            )
        }
    }

    profilePictureSrc = () => {
        if(this.props.user.profilepicture != undefined) {
            return require('../../assets/images/' + this.props.user.profilepicture);
        }
    }

    renderPosts = () => {
        const posts = this.props.posts.map((post, i) => {
            let options = { year: 'numeric', month: 'long', day: '2-digit', hour: 'numeric', minute: '2-digit' };
            let date  = new Date(post.datePosted);
            return (
                <div key={i} className="post">
                    <div className="post-profile-img"><img src={this.profilePictureSrc()} alt=""/></div>
                    <div className="post-user-info">
                    <Link to={`/profile/${this.props.match.params.account}`}><p>@{this.props.user.handler}</p></Link>
                        <p>{date.toLocaleDateString("en-US", options)}</p>
                    </div>
                    <p className="post-content">{post.content}</p>
                </div>
            )
        })

        return posts
    }

    render () {
        return (
            <div className="main-container profile-container">
                <div className="profile">
                    <div className="profile-picture"><img src={this.profilePictureSrc()} alt=""/></div>
                    <h1>{this.props.user.firstname}</h1>
                    <p className="handler">@{this.props.user.handler}</p>
                    <p className="major">{this.props.user.major}</p>
                    <div className="profile-buttons">
                        <div>{this.renderFriendButton()}</div>
                        <Link to={'message'}><button className="btn">Message</button></Link>
                    </div>
                </div>
                <div className="posts-container">
                    <Fragment>{this.renderPosts()}</Fragment>
                </div>
                {/* <div>
                    <Friends userAccount={this.props.match.params.account} key={this.props.match.params.account} />
                </div> */}
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