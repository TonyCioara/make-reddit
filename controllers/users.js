const { Router } = require('express');
const router = Router();

const User = require('../models/user');

router.get('/:username', (req, res) => {
    const currentUser = req.user;

    User.find({username: req.params.username}).populate('posts').populate('comments')
    // User.findById(req.params.id)
    .then(user => {
        console.log('user:', user);
        res.render('profile-show', { user, currentUser });
    });
});

module.exports = router;