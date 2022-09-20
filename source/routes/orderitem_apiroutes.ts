import express from 'express';
import {orderitem} from '../controller/index'

const router = express.Router();
 //crud apis for orderitems
 router.get('/orderItems', orderitem.getOrderItems);
 router.get('/getorderItem/:id', orderitem.getOrderItem);
 router.put('/orderItem/:id', orderitem.updateOrderItem);
 router.post('/orderItem', orderitem.addOrderItem);
 //router.delete('/orderItem/:id', orderitem.deleteOrderItem);
 
 export = router;
