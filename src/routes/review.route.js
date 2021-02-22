const express = require('express');
const router = express.Router();

const {createReview} = require('../controllers/review.controller');
const {isSignedIn} = require('../controllers/auth.controller');

router.post('/reviews', isSignedIn, createReview);

module.exports = router;