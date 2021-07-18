import React, { useReducer, useState } from 'react'
import PostContext from './PostsContext';
import reducer from './Reducer';
import * as ActionTypes from './ActionTypes';
import axios from 'axios';

const PostStore = ({ children }) => {
    
    /* single post should look like
    {
        Creator: String,
        Message: String,
        Tags: String,
        Title: String,
        createdAt: Date,
        img: String,
        like: Number,
        _id:"mongoose_id"
    }
    */

    const [Posts, dispatch] = useReducer(reducer, []);
    const [selectedPost, setselectedPost] = useState(null);
    const [loading, setLoading ] = useState(false);
    const [error, seterror ] = useState(false);

    const url = "http://localhost:5000/api/posts";

    const fetchPosts = () => {
        setLoading(true);
        axios.get(url)
            .then(res => {
                let post = res.data;
                dispatch({ type: ActionTypes.SET_POSTS, post })
                setLoading(false);
            })
            .catch(err=>{
                console.log(err);
                seterror(err.message);
                setLoading(false);
            })
    }

    const AddPost = (postToAdd) => {
        console.log('now we are in Add post');
        setLoading(true);
        setselectedPost(0);
        axios.post(url, postToAdd)
            .then(res => {
                // console.log(res.data);
                let post = res.data;
                dispatch({ type: ActionTypes.ADD_POST, post })
                setLoading(false);
                clearselectedPost();
            })
            .catch(err=>{
                console.log(err);
                seterror(err.message);
                setLoading(false);
                clearselectedPost();
            })
        
    }

    const clearselectedPost = () => {
        setselectedPost(null);
    }

    const selectPost = (id) => {
        // console.log(`selecting the post with id = ${id}`);
        let PostToSelect = Posts.find(post => post._id === id);
        setselectedPost(PostToSelect);
    }

    const editPost = (NewPost) => {
        setLoading(true);
        setselectedPost(0);
        const id = NewPost._id;
        const UpdatedPosts = Posts.reduce((updatedPost, post) => {
            if (post._id === id) {
                return updatedPost.concat(NewPost);
            } else {
                return updatedPost.concat(post);
            }
        }, [])
        dispatch({ type: ActionTypes.SET_POSTS, post: UpdatedPosts })
        axios.patch(`${url}/${id}`,NewPost)
            .then(res=>{
                setLoading(false); 
                // console.log(res.data);
                    console.log(`post updated`);
                    clearselectedPost();
            })
            .catch( err=>{
                setLoading(false);
                seterror(err.message)
                clearselectedPost();
            })
        
    }

    const likePost = (id) => {
        setLoading(true);
        let PostToUpdate = null;
        const UpdatedPosts = Posts.reduce((updatedPost, post) => {
            if (post._id === id) {
                PostToUpdate={
                    ...post,
                    like: post.like + 1,
                };
                return updatedPost.concat(PostToUpdate);
            } else {
                return updatedPost.concat(post);
            }
        }, [])
        dispatch({ type: ActionTypes.SET_POSTS, post: UpdatedPosts })
        // console.log(PostToUpdate);
        axios.patch(`${url}/${id}`,PostToUpdate)
            .then(res=>{
                setLoading(false);
                // console.log(res.data);
                console.log(`post updated`);
            })
            .catch(err=>{
                setLoading(false);
                console.log(err);
                seterror(err.message);
            })
    }

    const deletePost = (id) => {
        let PostToUpdate = null;
        const UpdatedPosts = Posts.reduce((updatedPost, post) => {
            if (post._id === id) {
                return updatedPost;
            } else {
                return updatedPost.concat(post);
            }
        }, [])
        dispatch({ type: ActionTypes.SET_POSTS, post: UpdatedPosts })
        axios.delete(`${url}/${id}`,PostToUpdate)
            .then(res=>{
                setLoading(false);
                // console.log(res.data);
                // console.log(Posts);
            })
            .catch(err=>{
                console.log(err);
                seterror(err.message);
                setLoading(false);
            })
    }

    return (
        <PostContext.Provider value={{
            Posts,
            fetchPosts,
            AddPost,
            editPost,
            likePost,
            deletePost,
            selectedPost,
            selectPost,
            clearselectedPost,
            loading,
            error,
        }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostStore;
