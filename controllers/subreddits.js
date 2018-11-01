const { Router } = require('express');
const router = Router()

const Post = require('../models/post');

// Show a subreddit
router.get('/:subreddit', (req, res) => {
    const currentUser = req.user;

    Post.find({ subreddit: req.params.subreddit})
        .then(posts => {
            res.render("posts-index", { posts, currentUser });
        }).catch(err => {
            console.log(err);
        })
});

module.exports = router;