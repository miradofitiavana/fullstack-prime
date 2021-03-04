const express = require('express');

const router = express.Router();
const products = require('./../controllers/products.controller');

router.post('/products', products.create);

module.exports = router;