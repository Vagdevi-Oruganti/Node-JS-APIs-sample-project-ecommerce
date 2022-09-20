import express from 'express';
import {order} from '../controller/index'

const router = express.Router();

//crud apis for order
router.get('/orders', order.getorders);
router.get('/getorder/:id', order.getOrder);
router.put('/order/:id', order.updateOder);
router.post('/order', order.addOrder);
//router.delete('/order/:id', order.deleteOrder);
export = router;
