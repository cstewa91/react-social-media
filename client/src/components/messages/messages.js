import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { animateScroll } from 'react-scroll';
import { getUserInfo } from '../../actions';
import { getFriends } from '../../actions';
import './messages.scss';
import firebase from '../../firebase';


class Messages extends Component {

    state = {
        messages: [],
        allFriends: [],
        currentFriend: {},
    }

    componentDidMount = async () => {
        await this.props.getUserInfo();
        await this.props.getFriends(this.props.userAccount);
        await this.setFriendsToState()
        this.getMessages()
    }

    componentDidUpdate = () => {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: "messages",
            duration: 0
        });
    }

    setFriendsToState = () => {
        this.props.friends.map(async (friend, i) => {
            let userData = await this.props.getUserInfo(friend.account)
            let userObj = {}
            userObj.account = friend.account
            userObj.name = `${this.props.friendInfo.firstname} ${this.props.friendInfo.lastname}`
            userObj.picture = this.props.friendInfo.profilepicture
            userObj.handler = `@${this.props.friendInfo.handler}`
            this.setState(prevState => ({
                allFriends: [...prevState.allFriends, userObj]
            }))
            if(userObj.account == this.props.match.params.account) {
                this.setState(prevState => ({
                    currentFriend: userObj
                }))
            }
            this.getLastMessage(friend.account)
        })
    }

    profilePictureSrc = (picture) => {
        if(picture != null) {
            return require('../../assets/images/' + picture);
        }
    }

    renderFriends = () => {
        this.state.allFriends.sort((a, b) => {
                a.timeStamp - b.timeStamp
        })
        console.log(this.state.allFriends)
        const friend = this.state.allFriends.map((friend, i) => {
            if(friend.account == this.props.match.params.account) {
                return (
                    <div className="friend active" key={i}>
                        <Link to={`/messages/${friend.account}`}>
                                <div className="profile-picture"><img src={this.profilePictureSrc(friend.picture)} alt=""/></div>
                                <div className="info">
                                    <p className="green-text friend-name">{friend.name}</p>
                                    <p>{friend.lastMessage}</p>
                                </div>
                        </Link>
                    </div>
                )
            } else {
                return (
                    <div className="friend" key={i}>
                        <Link to={`/messages/${friend.account}`}>
                                <div className="profile-picture"><img src={this.profilePictureSrc(friend.picture)} alt=""/></div>
                                <div className="info">
                                    <p className="green-text friend-name">{friend.name}</p>
                                    <p>{friend.lastMessage}</p>
                                </div>
                        </Link>
                    </div>
                )   
            }
        })

        return friend;
    }

    getLastMessage = (friendAccount) => {
        let userAccount = this.props.user.account;
        let query = firebase.firestore().collection(`${userAccount} ${friendAccount}`).orderBy('timestamp').limitToLast(1);
        if (friendAccount < userAccount) {
            query = firebase.firestore().collection(`${friendAccount} ${userAccount}`).orderBy('timestamp').limitToLast(1);
        }
        query.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'removed') {

                } else {
                    let message = change.doc.data();
                    if (message.timestamp != null) {
                        let key = friendAccount;
                        let lastSender = message.account == userAccount ? 'You:' : ''
                        this.setState(prevState => ({
                            allFriends: prevState.allFriends.map(
                                el => el.account === key ? {
                                    ...el,
                                    lastMessage: `${lastSender} ${message.text}`,
                                    timeStamp: message.timestamp.toDate()
                                } : el
                            )

                        }))
                    }

                }
            });
        });
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

    renderMessageBar = () => {
        let friendName = ''
        if(this.state.currentFriend.name) {
            friendName = this.state.currentFriend.name.split(' ')
        }
        return (
            <Fragment>
                <Link to={`/profile/${this.state.currentFriend.account}`} className="message-bar-img"><div ><img src={this.profilePictureSrc(this.state.currentFriend.picture)} alt=""/></div></Link>
                <Link to={`/profile/${this.state.currentFriend.account}`} className="message-bar-name "><p className="green-text">{friendName[0]}</p></Link>
                <Link to={`/profile/${this.state.currentFriend.account}`} className="message-bar-handler"><p>{this.state.currentFriend.handler}</p></Link>
                <div className="message-bar-menu"></div>
            </Fragment>
        )
    }

    renderMessages = () => {
        const date = new Date()
        const messages = this.state.messages.map((message, i, arr) => {
            let position = '';
            let messageImg = ''
            let prevmessage = ''
            let nextMessage = ''
            if(message.account == this.props.user.account) {
                position = "right"
                messageImg = this.profilePictureSrc(this.props.user.profilepicture)
            } else {
                position = 'left'
                messageImg = this.profilePictureSrc(this.state.currentFriend.picture)
            }
            i > 0 ? prevmessage = arr[i - 1].account : prevmessage = ''
            i < arr.length - 1 ? nextMessage = arr[i + 1].account : nextMessage = ''
            if(message.account == prevmessage && message.account == nextMessage) {
                return (
                    <div key={i} className={`message ${position}`} >
                        <p>{message.text}</p>
                    </div>
                )
            } else if(message.account != prevmessage && message.account == nextMessage){

            } else if(message.account == prevmessage && i == arr.length - 1) {
                return (
                    <div key={i} className={`message ${position}`} >
                        <p>{message.text}</p>
                        <div className="message-img"><img src={messageImg} alt=""/></div>
                    </div>
                )
            } else {
                return (
                    <div key={i} className={`message ${position}`} >
                        <p>{message.text}</p>
                        <div className="message-img"><img src={messageImg} alt=""/></div>
                    </div>
                )
            }
        });

        return messages;
    }

    saveMessage = (e) => {
        e.preventDefault();
        let userAccount = this.props.user.account;
        let friendAccount = this.props.match.params.account
        let message = e.target[0].value
        let query = firebase.firestore().collection(`${userAccount} ${friendAccount}`)
        if(friendAccount < userAccount) {
            query = firebase.firestore().collection(`${friendAccount} ${userAccount}`);
        }
        e.target.reset();
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
            <div className="container messages-container">
                <div className="messages-friends">
                    <h1>Messages</h1>
                    <div className="btn">COMPOSE</div>
                    <div className="friends-container">
                        {this.renderFriends()}
                    </div>
                </div>
                <div className="message-container">
                    <div className="message-bar">
                        {this.renderMessageBar()}
                    </div>
                    <div id="messages" className="messages">
                        {this.renderMessages()}
                    </div>
                    <form id="message-form" onSubmit={this.saveMessage}>
                        <input type="text" name="newMessage" placeholder="Type Something..." />
                        <button className="btn">Send</button>
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

