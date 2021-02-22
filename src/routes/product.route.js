const express = require('express');
const router = express.Router();

const multerInstance = require('../config/multer.config');

const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct} = require('../controllers/product.controller');
const {isSignedIn, userData, isAdmin} = require('../controllers/auth.controller');

router.post('/products', isSignedIn, userData, isAdmin, multerInstance.upload.array('image', 12), createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id',isSignedIn, userData, isAdmin, updateProduct);
router.delete('/products/:id',isSignedIn, userData, isAdmin, deleteProduct);

module.exports = router;