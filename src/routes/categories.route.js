const express = require('express');

const router = express.Router();
const categories = require('./../controllers/categories.controller');

router.post('/categories', categories.create);
router.put('/category/:id', categories.update);
router.delete('/category/:id', categories.delete);

module.exports = router;