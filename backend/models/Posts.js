import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    name: String,
    creatorId: String,
    title: String,
    msg: String,
    tags: String,
    img: String,
    likes : {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});
const Posts = mongoose.model('Post',postSchema);

export default Posts;