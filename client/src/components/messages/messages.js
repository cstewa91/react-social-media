import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../actions'
import { getFriends } from '../../actions'
import './messages.scss';
import firebase from '../../firebase'


class Messages extends Component {

    state = {
        messages: [],
        allFriends: []
    }

    componentDidMount = async () => {
        await this.props.getUserInfo();
        await this.props.getFriends(this.props.userAccount);
        await this.setFriendsToState()
        this.getMessages()
    }

    setFriendsToState = () => {
        this.props.friends.map(async (friend, i) => {
            let userData = await this.props.getUserInfo(friend.account)
            let userObj = {}
            userObj.account = friend.account
            userObj.name = `${this.props.friendInfo.firstname} ${this.props.friendInfo.lastname}`
            userObj.picture = friend.profilepicture
            this.setState(prevState => ({
                allFriends: [...prevState.allFriends, userObj]
            }))
        })
    }

    renderFriends = () => {
        const friend = this.state.allFriends.map((friend, i) => {
            return (
                <Fragment>
                    <Link to={`/messages/${friend.account}`}>
                        <div key={i} className="friend">
                            <div className="profile-picture"><img src="" alt=""/></div>
                            <div className="info">
                                <p className="green">{friend.name}</p>
                                {this.renderLastMessage()}
                            </div>
                        </div>
                    </Link>
                </Fragment>
            )
        })

        return friend;
    }

    renderLastMessage = () => {
        var lastMessage = this.state.messages[this.state.messages.length - 1]
        if(lastMessage) {
            var sentLastMessage = ''
            this.props.user.account == lastMessage.account ? sentLastMessage = 'You' : sentLastMessage = lastMessage.name
            return (
                <p>{sentLastMessage}:  {lastMessage.text}</p>
            )
        }
    }
    
    getMessages = (e) => {
        let userAccount = this.props.user.account;
        let friendAccount = this.props.match.params.account
        let query = firebase.firestore().collection(`${userAccount} ${friendAccount}`).orderBy('timestamp');
        if (friendAccount < userAccount) {
            query = firebase.firestore().collection(`${friendAccount} ${userAccount}`).orderBy('timestamp');
        }
        query.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'removed') {

                } else {
                    let message = change.doc.data();
                    if (message.timestamp != null) {
                        this.setState(prevState => ({
                            messages: [...prevState.messages, message]
                        }))
                    }

                }
            });
        });
    }

    renderMessages = () => {
        const messages = this.state.messages.map((message, i) => {
            let position = '';
            message.account == this.props.user.account ? position = "right" : position = 'left'
            return (
                <div key={i} className={`message ${position}`} >
                    <p>{message.name}</p>
                    <p>{message.text}</p>
                </div>
            )
        });

        return messages;
    }

    saveMessage = (e) => {
        e.preventDefault()
        let userAccount = this.props.user.account;
        let friendAccount = this.props.match.params.account
        let message = e.target[0].value
        let query = firebase.firestore().collection(`${userAccount} ${friendAccount}`)
        if(friendAccount < userAccount) {
            query = firebase.firestore().collection(`${friendAccount} ${userAccount}`);
        }
        return query.add({
            account: userAccount,
            name: this.props.user.firstname,
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function (error) {
            console.error('Error writing new message to Firebase Database', error);
        });
    }

    render() {
        return (
            <div className="messages-container">
                <div className="messages-friends">
                    <h1>Messages</h1>
                    <div className="btn">COMPOSE</div>
                    {this.renderFriends()}
                </div>
                <div className="message-container">
                    <div className="messages">
                        {this.renderMessages()}
                    </div>
                    <form onSubmit={this.saveMessage}>
                        <input type="text" placeholder="Type Something..." />
                        <button class="btn">Send</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userInfo.user,
        friends: state.friends.friends,
        friendInfo: state.userInfo.friend
    }
 }

export default connect(mapStateToProps, {
    getUserInfo: getUserInfo,
    getFriends: getFriends
})(Messages);

