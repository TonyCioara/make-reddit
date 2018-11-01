const { Router } = require('express');
const router = Router();

const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

// Post comment
router.post('/:postId/comments', (req, res) => {
    if (req.user) {
        const comment = new Comment(req.body);
        comment.author = req.user._id;

        comment.save()
        .then(comment => {
            return User.findById(req.user._id);
        })
        .then(user => {
            user.comments.unshift(comment);
            return user.save();
        })
        .then(user => {
            // Redirect to the root
            return Post.findById(req.params.postId);
        })
        .then(post => {
            post.comments.unshift(comment);
            return post.save()
        })
        .then(post => {
            res.redirect('/posts/' + post._id);
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        res.status(401)
    };
});

module.exports = router;