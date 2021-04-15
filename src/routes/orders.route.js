import express from 'express';
import orders from './../controllers/orders.controller';
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post('/orders', orders.create);
router.get('/orders', orders.getOrders);
router.get('/order/:id', orders.read);
router.put('/order/:id', orders.update);
router.get('/my-orders/:id', verifyToken, orders.getMyOrders);

module.exports = router;