const { Router } = require('express');
const router = Router();

const Post = require('../models/post');

router.get('/', (req, res) => {
    console.log("COOKIES: ", req.cookies);
    Post.find({})
    .then(posts => {
        res.render("posts-index", { posts });
    })
    .catch(err => {
        console.log(err.message);
    })
});

module.exports = router;