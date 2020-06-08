import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { getPosts } from '../../actions';
import { getPostData } from '../../actions'
import { submitPost } from '../../actions'
import './feed.css';

class Feed extends Component {
    state = {
        posts: []
    }
    componentDidMount = async () => {
        await this.props.getPosts();
        await this.setPostsToState()

    }

    setPostsToState = async () => {
        this.props.posts.map(async (post, i) => {
            let userData = await this.props.getPostData(post.account)
            post.firstname = userData.data[0].firstname
            post.lastname = userData.data[0].lastname
            this.setState(prevState => ({
                posts: [...prevState.posts, post]
            }))
        })
    }

    handlePost = async (values) => {
        await this.props.submitPost(values) 
        await this.props.getPosts();
    }

    renderPosts = () => {
        const post = this.state.posts.map((post, i) => {
            return(
                <div key={i}>
                    <p>{`${post.firstname} ${post.lastname}`}</p>
                    <p>{post.content}</p>
                </div>
            )

        })

        return post
    }


    render() {
        const { handleSubmit, signInError } = this.props
        return (
            <div className="container">
                <h1>FEED</h1>
                <div className="post-area">
                    <form onSubmit={handleSubmit(this.handlePost)}>
                        <Field name="post" component='textarea'/>
                        <button className="btn">POST</button>
                    </form>
                </div>
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

 function validate() {

}

Feed = reduxForm({
   form: 'feed',
   validate: validate
})(Feed);

export default connect(mapStateToProps, {
    getPosts : getPosts,
    getPostData : getPostData,
    submitPost: submitPost
})(Feed)