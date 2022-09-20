import express from 'express';
import {products} from '../controller/index'

const router = express.Router();

 //crud apis for products
 router.get('/products', products.getProducts);
 router.get('/getproduct/:id', products.getProduct);
 router.put('/product/:id', products.updateProduct);
 router.post('/product', products.addProduct);
 //router.delete('/product/:id', products.deleteProduct);

export = router;
 