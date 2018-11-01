const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Show sign-up form
router.get('/signup', (req, res) => {
    res.render('signup-form');
});

// Show login form
router.get('/login', (req, res) => {
    res.render('login-form');
})

// Sign up
// TODO: Make sure to not allow the same username twice
router.post('/signup', (req, res) => {
    const user = new User(req.body);

    user.save()
    .then(user => {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
    })
    .catch(err => {
        console.log(err.message);
        return res.status(400).send({ err: err});
    });
});

// Login
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Find the username
    User.findOne({ username }, 'username password')
    .then(user => {
        if (!user) {
            // User not found
            return res.status(401).send({message: 'Wrong username or password'});
        };
        // Check the password
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(401).send({ message: 'Wrong username or password'})
            };
            // Create a token
            const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                expiresIn: '60 days'
            });
            // Set cookie and redirect to root
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect('/');
        });
    })
    .catch(err => {
        console.log(err);
    });
});

// Log out
router.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

module.exports = router;