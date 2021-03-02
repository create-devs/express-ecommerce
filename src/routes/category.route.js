const express = require('express');
const router = express.Router();

const {createCategory, getAllCategories, getCategoryById, deleteCategory, updateCategory} = require('../controllers/category.controller');
const {isSignedIn, userData, isAdmin} = require('../controllers/auth.controller');

router.post('/categories', isSignedIn, userData, isAdmin, createCategory);
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.delete('/categories/:id', isSignedIn, userData, isAdmin, deleteCategory);
router.put('/categories/:id', isSignedIn, userData, isAdmin, updateCategory);

module.exports = router;