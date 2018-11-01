const { Router } = require('express');
const router = Router();

const Post = require('../models/post');

// Show new form
router.get('/new', (req, res) => {
    const currentUser = req.user;

    res.render('posts-new', {currentUser});
});

// Show post
router.get('/:id', (req, res) => {
    const currentUser = req.user;

    Post.findById(req.params.id).populate('comments')
    .then(post => {
        res.render('posts-show', { post, currentUser });
    })
    .catch(err => {
        console.log(err.message);
    });
});

// Post new post
router.post('/new', (req, res) => {
    if (req.user) {
        const post = new Post(req.body);

        post.save((err, post) => {
            return res.redirect('/');
        });
    } else {
        res.status(401);
    };
});

module.exports = router;