const express = require("express");
const router = express.Router();

const Post = require('../models/post');

router.post("", (req, res, next) => {
    // const post = req.body;
    // console.log(post);
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        // console.log(result);
        res.status(201).json({
            message: "Post added successfully.",
            postId: createdPost._id
        });
    });
});

router.get('', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: "Posts fetched successfully",
            posts: documents
        });
    });
});

router.delete("/:id", (req, res, next) => {
    // console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!" });
    })
});

module.exports = router;