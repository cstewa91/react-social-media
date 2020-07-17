import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../actions'
import { getPosts } from '../../actions'
import { checkIfFriend } from '../../actions'
import { addFriend } from '../../actions'
import Friends from '../friends/friends'
import profilePicture from '../../assets/images/download.png'
import './profile.scss';

class Profile extends Component {
    componentDidMount = async () => {
        await this.props.getUserInfo(this.props.match.params.account, 'profile')
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
                <button className="btn">FRIENDS</button>
            )
        }
    }

    renderPosts = () => {
        const posts = this.props.posts.map((post, i) => {
            return (
                <div key={i}>
                    <div><img src={profilePicture} alt=""/></div>
                    <Link to={`/profile/${this.props.match.params.account}`}><p>{`${this.props.user.firstname} ${this.props.user.lastname}`}</p></Link>
                    <p> </p>
                    <p>{post.content}</p>
                </div>
            )
        })

        return posts
    }

    render () {
        return (
            <div className="main-container profile-container">
                <div className="profile">
                    <div className="profile-picture"><img src={profilePicture} alt=""/></div>
                    <h1>{this.props.user.firstname}</h1>
                    <p className="handler">@CollinS</p>
                    <p className="description">Graphic Design & Marketing CSUSB, PDC, 2024</p>
                    <div className="profile-buttons">
                        <div>{this.renderFriendButton()}</div>
                        <Link to={'message'}><button className="btn">Message</button></Link>
                    </div>
                </div>
                <div className="posts-container">
                    <div>{this.renderPosts()}</div>
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