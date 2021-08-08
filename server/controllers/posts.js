import PostMessage from "../models/postMessage.js"
import mongoose from 'mongoose'

export const getPosts = async (req, res) => {
   try {
      const postMessage = await PostMessage.find()
      res.status(200).json(postMessage)
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}

export const createPost = async (req, res) => {
   const post = req.body

   const newPost = new PostMessage(post)

   try {
      await newPost.save()
      res.status(200).json(newPost)
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}

export const updatePost = async (req, res) => {
   const { id } = req.params;
   const { title, message, creator, selectedFile, tags } = req.body;

   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

   const newPost = { creator, title, message, tags, selectedFile, _id: id };

   const updatedPost = await PostMessage.findByIdAndUpdate(id, newPost, { new: true });
   res.json(updatedPost);
}

export const deletePost = async (req, res) => {
   const { id: _id } = req.params
   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
   await PostMessage.findByIdAndRemove(_id)

   res.json({ message: 'Post deleted!' })
}

export const likePost = async (req, res) => {
   const { id: _id } = req.params
   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
   const newPost = await PostMessage.findById(_id)
   const updatePost = await PostMessage.findByIdAndUpdate(_id, { likeCount: newPost.likeCount + 1 }, { new: true })

   res.json(updatePost)
}