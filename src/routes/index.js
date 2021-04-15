const express = require('express');
const router = express.Router();
const usersRouter = require('./users.route');
const productsRouter = require('./products.route');
const ordersRouter = require('./orders.route');
const categoriesRouter = require('./categories.route');

router.use(usersRouter);
router.use(productsRouter);
router.use(ordersRouter);
router.use(categoriesRouter);

module.exports = router