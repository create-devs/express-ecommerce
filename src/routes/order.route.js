const express = require('express');
const router = express.Router();

const {createOrder, getSingleUserOrder, getOrderById, deleteOrder} = require('../controllers/order.controller');
const {isSignedIn, isAdmin, userData} = require('../controllers/auth.controller');

router.post('/orders', isSignedIn, userData, createOrder);
router.get('/orders/me', isSignedIn, userData, getSingleUserOrder);
router.get('/orders/:id', isSignedIn, userData, getOrderById);
router.delete('/orders/:id', isSignedIn, userData, isAdmin, deleteOrder);

module.exports = router;