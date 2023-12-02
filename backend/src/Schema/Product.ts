// productModel.ts
import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  id: { type: String, required: true, unique: true },
  productName: { type: String, required: true, maxlength: 30 },
  quantity: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
