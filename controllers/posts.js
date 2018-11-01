const { Router } = require('express');
const router = Router();

const Post = require('../models/post');

// Show new form
router.get('/new', (req, res) => {
    res.render('posts-new');
});

// Show post
router.get('/:id', (req, res) => {
    Post.findById(req.params.id).populate('comments')
    .then(post => {
        res.render('posts-show', { post });
    })
    .catch(err => {
        console.log(err.message);
    });
});

// Post new post
router.post('/new', (req, res) => {
    const post = new Post(req.body);

    post.save((err, post) => {
        return res.redirect('/');
    });
});

module.exports = router;