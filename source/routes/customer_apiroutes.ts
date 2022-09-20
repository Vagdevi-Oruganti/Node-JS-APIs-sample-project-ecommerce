import express from 'express';
const router = express.Router();
import {customer} from '../controller/index'


//crud apis for Customer

router.get('/customers', customer.getCustomers);
router.get('/getcustomer/:id',customer.getCustomer);
router.put('/customer/:id', customer.updateCustomer);
router.post('/customer', customer.addCustomer);
//router.delete('/customer/:id', customer.deleteCustomer);


export = router;