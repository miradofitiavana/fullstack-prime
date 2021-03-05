import express from 'express';
import orders from './../controllers/orders.controller';

const router = express.Router();

router.post('/orders', orders.create);
router.get('/orders', orders.getOrders);
router.get('/orders/:id', orders.read);

module.exports = router;