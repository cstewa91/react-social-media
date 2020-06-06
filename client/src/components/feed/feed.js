import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { getPosts } from '../../actions';
import { getPostData } from '../../actions'
import axios from 'axios'
import './feed.css';

class Feed extends Component {
    state = {
        allPosts: []
    }
    componentDidMount = async () => {
        await this.props.getPosts();
        await this.setPosts()

    }

    renderPosts = () => {
        const posts = this.props.posts.map(async (post) => {
            let userInfo =  await this.props.getPostData(post.account);
            let name = `${userInfo.data[0].firstname} ${userInfo.data[0].lastname}`;
            let content = post.content;
            let datePosted = post.datePosted;
            let postData = {
                name: name,
                content: content,
                datePosted: datePosted
            }
            this.setState(prevState => {
                return {
                    allPosts: [...this.state.allPosts, postData]
                }
            })
       })
    }

    render() {
        return (
            <div className="container">
                <h1>FEED</h1>
        <div>{this.renderPosts()}</div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts.posts,
    }
 }

export default connect(mapStateToProps, {
    getPosts : getPosts,
    getPostData : getPostData,
})(Feed)