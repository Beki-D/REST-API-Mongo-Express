const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Gets all posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch (err) {
        res.json({ message : err });
    }
    // res.send('Welcome on \'/\' posts');
});

//Submits a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message : err})
    }
});

//Get specific post
router.get('/:postId', async (req, res) => {
    // console.log(req.params.postId);
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({ message : err });
    }
});

//Delete Post
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    }catch(err){
        res.json({ message : err });
    }
})

//Update a post, updateOne is acting weird so I'm using upsert
router.patch('./:postId', async (req, res) => {
    try{
        const filter = { _id: req.params.postId };
        const update = { title: req.body.title };
        
        const updatedPost = await Post.findOneAndUpdate(filter, update);
        res.json(updatedPost);
    }catch(err){
        res.json({ message : err });
    }
})

module.exports = router;