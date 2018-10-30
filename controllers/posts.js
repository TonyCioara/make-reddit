const { Router } = require('express');
const router = Router();

const Post = require('../models/post');

router.get('/new', (req, res) => {
    res.render('posts-new');
});

router.post('/new', (req, res) => {
    const post = new Post(req.body);

    post.save((err, post) => {
        return res.redirect('/');
    });
});

module.exports = router;