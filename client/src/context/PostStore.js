import React, { useReducer, useState } from 'react'
import PostContext from './PostsContext';
import reducer from './Reducer';
import * as ActionTypes from './ActionTypes';
import axios from 'axios';

const PostStore = ({ children }) => {

    /* single post should look like
    {
        Message: String,
        Title: String,
        createdAt: Date,
        img: String,
        like: [Array who liked],
        _id:"mongoose_id/google id"
    }
    */
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.googleId ? user?.googleId : user?._id;

    const [posts, dispatch] = useReducer(reducer, []);
    const [selectedPost, setselectedPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState(false);

    const API = axios.create({ baseURL: 'http://localhost:5000/api/' });

    API.interceptors.request.use((req) => {
        if (localStorage.getItem('token')) {
            req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }

        return req;
    });

    const fetchPosts = () => {
        setLoading(true);
        API.get('/posts')
            .then(res => {
                let post = res.data;
                dispatch({ type: ActionTypes.SET_POSTS, post })
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                seterror(err.message);
                setLoading(false);
            })
    }

    const addPost = (postData) => {
        setLoading(true);
        setselectedPost(0);
        const post = {
            ...postData,
            name: user.name
        }
        API.post("/posts/", post)
            .then(res => {
                console.log(res.data);
                let post = res.data;
                dispatch({ type: ActionTypes.ADD_POST, post })
                setLoading(false);
                clearSelectedPost();
            })
            .catch(err => {
                console.log(err);
                seterror(err.message);
                setLoading(false);
                clearSelectedPost();
            })

    }

    const clearSelectedPost = () => {
        setselectedPost(null);
    }

    const selectPostHandler = (id) => {
        // console.log(`selecting the post with id = ${id}`);
        let PostToSelect = posts.find(post => post._id === id);
        setselectedPost(PostToSelect);
    }

    const editPost = (NewPost) => {
        setLoading(true);
        setselectedPost(null);
        const id = NewPost._id;
        console.log(id);
        const UpdatedPosts = posts.reduce((updatedPost, post) => {
            if (post._id === id) {
                return updatedPost.concat(NewPost);
            } else {
                return updatedPost.concat(post);
            }
        }, [])
        dispatch({ type: ActionTypes.SET_POSTS, post: UpdatedPosts })
        API.patch(`/posts/${id}`, NewPost)
            .then(res => {
                setLoading(false);
                console.log(res.data);
                console.log(`post updated`);
                clearSelectedPost();
            })
            .catch(err => {
                setLoading(false);
                seterror(err.message)
                clearSelectedPost();
            })

    }

    const likePost = (postId) => {
        console.log('inside like post');
        setLoading(true);
        let likedPost = posts.find(ele => ele._id == postId);
        console.log(`this post you liked is : ${likedPost}`);

        const index = likedPost.likes.findIndex((id) => id === userId);

        if (index === -1) {
            likedPost.likes.push(userId);
        } else {
            likedPost.likes = likedPost.likes.filter((id) => id !== userId);
        }

        const UpdatedPosts = posts.reduce((updatedPost, post) => {
            if (post._id === postId) {
                return updatedPost.concat(likedPost);
            } else {
                return updatedPost.concat(post);
            }
        }, [])
        dispatch({ type: ActionTypes.SET_POSTS, post: UpdatedPosts })
        // console.log(PostToUpdate);
        API.patch(`posts/${postId}`, likedPost)
            .then(res => {
                setLoading(false);
                console.log(res.data);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
                seterror(err.message);
            })
    }

    const deletePost = (id) => {
        const UpdatedPosts = posts.reduce((updatedPost, post) => {
            if (post._id === id) {
                return updatedPost;
            } else {
                return updatedPost.concat(post);
            }
        }, [])
        dispatch({ type: ActionTypes.SET_POSTS, post: UpdatedPosts })
        API.delete(`posts/${id}`)
            .then(res => {
                setLoading(false);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                seterror(err.message);
                setLoading(false);
            })
    }

    return (
        <PostContext.Provider value={{
            posts,
            fetchPosts,
            addPost,
            editPost,
            likePost,
            deletePost,
            selectedPost,
            selectPostHandler,
            clearSelectedPost,
            loading,
            error,
        }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostStore;
