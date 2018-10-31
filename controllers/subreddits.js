const { Router } = require('express');
const router = Router()

const Post = require('../models/post');

// Show a subreddit
router.get('/:subreddit', (req, res) => {
    Post.find({ subreddit: req.params.subreddit})
        .then(posts => {
            res.render("posts-index", { posts });
        }).catch(err => {
            console.log(err);
        })
});

module.exports = router;