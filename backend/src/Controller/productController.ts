
import { Request, Response } from 'express';
import Product from '../Schema/Product.ts';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const { id, productName, quantity } = req.body;

  try {
    const newProduct = new Product({ id, productName, quantity });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { productName, quantity } = req.body;
  
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { id },
        { $set: { productName, quantity } },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(updatedProduct);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const deletedProduct = await Product.findOneAndDelete({ id });
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  };

