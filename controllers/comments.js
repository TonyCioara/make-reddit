const { Router } = require('express');
const router = Router();

const Comment = require('../models/comment');
const Post = require('../models/post');

// Post comment
router.post('/:postId/comments', (req, res) => {
    const comment = new Comment(req.body);

    comment.save()
    .then(comment => {
        // Redirect to the root
        return Post.findById(req.params.postId);
    })
    .then(post => {
        post.comments.unshift(comment);
        return post.save()
    })
    .then(post => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;