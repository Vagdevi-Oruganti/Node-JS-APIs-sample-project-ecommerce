import express from 'express';
import {supplier} from '../controller/index'

const router = express.Router();
 //crud apis for supplier
router.get('/suppliers', supplier.getSuppliers);
router.get('/getsupplier/:id', supplier.getSupplier);
router.put('/supplier/:id', supplier.updateSupplier);
router.post('/supplier', supplier.addSupplier);
//router.delete('/supplier/:id', supplier.deleteSupplier);
export = router;