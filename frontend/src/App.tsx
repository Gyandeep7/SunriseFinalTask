// App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from './components/ProductTable';

const App: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ id: '', productName: '', quantity: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get('http://localhost:5000/api/products');
      setProducts(result.data);
    } catch (error:any) {
      console.error('Error fetching products:', error.message);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/api/products/add', newProduct);
      setNewProduct({ id: '', productName: '', quantity: 0 });
      fetchData();
    } catch (error:any) {
      console.error('Error creating product:', error.message);
    }
  };

  const handleUpdate = async (id: string, newProductName: string, newQuantity: number) => {
    try {
      await axios.put(`http://localhost:5000/api/products/update/${id}`, {
        productName: newProductName,
        quantity: newQuantity,
      });
      fetchData();
    } catch (error:any) {
      console.error('Error updating product:', error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
      fetchData();
    } catch (error:any) {
      console.error('Error deleting product:', error.message);
    }
  };

  return (
    <div className="App">
      <ProductTable
        products={products}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        newProduct={newProduct}
        onNewProductChange={setNewProduct}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default App;
