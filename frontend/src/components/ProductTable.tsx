// ProductTable.tsx
import React, { useState } from 'react';

interface Product {
  id: string;
  productName: string;
  quantity: number;
}

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, newProductName: string, newQuantity: number) => void;
  newProduct: { id: string; productName: string; quantity: number };
  onNewProductChange: (newProduct: { id: string; productName: string; quantity: number }) => void;
  onCreate: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onDelete,
  onUpdate,
  newProduct,
  onNewProductChange,
  onCreate,
}) => {
  const [editProduct, setEditProduct] = useState<{
    id: string;
    productName: string;
    quantity: number;
  } | null>(null);

  const handleEdit = (product: Product) => {
    console.log('Editing product:', product);
    setEditProduct({
      id: product.id,
      productName: product.productName,
      quantity: product.quantity,
    });
  };

  const handleCancelEdit = () => {
    setEditProduct(null);
  };

  const handleUpdate = () => {
    if (editProduct) {
      onUpdate(editProduct.id, editProduct.productName, editProduct.quantity);
      setEditProduct(null);
    }
  };

  return (
    
    <div>
      <center>
      <h1>Product Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editProduct && editProduct.id === product.id ? (
                  <input
                    value={editProduct.productName}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        productName: e.target.value,
                      })
                    }
                  />
                ) : (
                  product.productName
                )}
              </td>
              <td>
                {editProduct && editProduct.id === product.id ? (
                  <input
                    type="number"
                    value={editProduct.quantity}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        quantity: parseInt(e.target.value, 10),
                      })
                    }
                  />
                ) : (
                  product.quantity
                )}
              </td>
              <td>
                {editProduct && editProduct.id === product.id ? (
                  <>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(product)}>Edit</button>
                    <button onClick={() => onDelete(product.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Add New Product</h2>
        <label>ID</label>
        <input
          type="text"
          value={newProduct.id}
          onChange={(e) =>
            onNewProductChange({
              ...newProduct,
              id: e.target.value,
            })
          }
        />
        <label>Product Name</label>
        <input
          type="text"
          value={newProduct.productName}
          onChange={(e) =>
            onNewProductChange({
              ...newProduct,
              productName: e.target.value,
            })
          }
        />
        <label>Quantity</label>
        <input
          type="number"
          value={newProduct.quantity}
          onChange={(e) =>
            onNewProductChange({
              ...newProduct,
              quantity: parseInt(e.target.value, 10),
            })
          }
        />
        <button onClick={onCreate}>Create</button>
      </div>
      </center>
    </div>
  );
};

export default ProductTable;
