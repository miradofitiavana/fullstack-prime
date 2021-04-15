const express = require('express');

const router = express.Router();
const products = require('./../controllers/products.controller');

router.get('/products', products.list);
router.post('/products', products.create);
router.get('/product/:id', products.read);
router.put('/product/:id', products.update);
router.delete('/product/:id', products.delete);

module.exports = router;