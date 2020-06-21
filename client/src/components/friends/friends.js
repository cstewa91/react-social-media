import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../actions'
import { getFriends } from '../../actions'
import './friends.css';

class Friends extends Component {
    state = {
        allFriends: []
    }

    componentDidMount = async () => {
        await this.props.getFriends(this.props.userAccount);
        await this.setFriendsToState()
    }

    setFriendsToState = async () => {
        this.props.friends.map(async (friend, i) => {
            let userData = await this.props.getUserInfo(friend.friend_account)
            let userObj = {}
            userObj.account = friend.friend_account
            userObj.name = `${this.props.friendInfo.firstname} ${this.props.friendInfo.lastname}`
            this.setState(prevState => ({
                allFriends: [...prevState.allFriends, userObj]
            }))
        })
    }

    renderFriends = () => {
        const friends = this.state.allFriends.map((friend, i) => {
            return (
                <div key={i}>
                    <Link to={`/profile/${friend.account}`}>
                        <p>{`${this.props.friendInfo.firstname} ${this.props.friendInfo.lastname}`}</p>
                    </Link>
                </div>
            )
        })

        return friends
    }

    render () {
        return (
            <div>
                <h1>Friends</h1>
                <div>{ this.renderFriends() }</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        friends: state.friends.friends,
        friendInfo: state.userInfo.friend
    }
}

export default connect(mapStateToProps, {
    getFriends: getFriends,
    getUserInfo: getUserInfo
})(Friends);