
import express from 'express';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../Controller/productController';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/add', addProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;
