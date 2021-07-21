import mongoose from 'mongoose';
import PostModel from '../models/Posts';

export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);

    } catch (error) {
        next(error);
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    // console.log({
    //     ...post,
    //     img: '',
    // });
    const newPost = new PostModel({
        ...post,
        creatorId: req.userId,
        createdAt: new Date().toString()
    })

    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        next(error);
    }

}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    try {
        await PostModel.findByIdAndRemove(id);
        res.json({ msg: "post Deleted Sucessfully" })
    } catch (error) {
        next(error);
    }

}

export const editPost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
    const likedPost = req.body;
    console.log({ ...likedPost, img: '' });
    await PostModel.findByIdAndUpdate(id, likedPost, { new: true });
    res.json(likedPost);
}
