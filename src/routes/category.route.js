const express = require('express');
const router = express.Router();

const {createCategory, getAllCategories, getCategoryById} = require('../controllers/category.controller');
const {isSignedIn, userData, isAdmin} = require('../controllers/auth.controller');

router.post('/categories', isSignedIn, userData, isAdmin, createCategory);
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);

module.exports = router;