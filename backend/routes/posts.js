import express from 'express';
import { getPost, getPosts, createPost, deletePost, editPost } from '../controllers/posts';
import {auth} from '../middlewares/auth'
const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.get("/:id", getPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, editPost);


export default router;
