const { Router } = require('express');
const router = Router();

const Comment = require('../models/comment');

// Post comment
router.post('/:postId/comments', (req, res) => {
    const comment = new Comment(req.body);

    comment.save()
    .then(comment => {
        // Redirect to the root
        return res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;