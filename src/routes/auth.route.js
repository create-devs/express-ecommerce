const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {signUp, signIn, signOut} = require('../controllers/auth.controller');

// Authentication
router.post('/signup',[
    check('name', 'Name should be at least 3 char').isLength({min: 3}),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password should be at least 6 char').isLength({min: 6}),
], signUp);

router.post('/signin',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password field is required').isLength({min: 1}),
], signIn);

router.get('/signout', signOut);

module.exports = router;
