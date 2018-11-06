const { Router } = require('express');
const router = Router()

const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

// Get form
router.get('/:postId/comments/:commentId/replies/new', (req, res) => {
    Comment.findById(req.params.commentId)
    .then(comment => {
        const postId = (req.params.postId);
        res.render('replies-new', { postId , comment });
    })
    .catch(err => {
        console.log(err.message);
    });
});

// Post reply
router.post('/:postId/comments/:commentId/replies/new', (req, res) => {
    Comment.findById(req.params.commentId)
    .then(comment => {
        console.log('987654321');
        comment.replies.unshift(req.body);
        return comment.save();
    })
    .then(comment => {
        console.log('123456789');
        res.redirect("/posts/" + req.params.postId);
    })
    .catch(err => {
        console.log(err.message);
    });
});

module.exports = router;

