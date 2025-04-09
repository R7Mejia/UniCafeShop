
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { coffeeProducts } from '../data/coffeeData';
import { CoffeeProduct } from '../components/CoffeeCard';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState<CoffeeProduct[]>(coffeeProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct | null>(null);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (product: CoffeeProduct) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleDelete = (product: CoffeeProduct) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
      setProducts(updatedProducts);
      setDeleteDialogOpen(false);
      toast({
        title: "Product deleted",
        description: `${selectedProduct.name} has been removed`,
      });
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-coffee-dark text-white p-4 flex items-center">
        <Link to="/account" className="mr-3">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">Manage Products</h1>
      </div>

      {/* Search and Add */}
      <div className="p-4 flex items-center space-x-2">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Link 
          to="/admin/products/new" 
          className="bg-coffee-dark text-white p-2 rounded-md flex items-center"
        >
          <Plus size={20} />
        </Link>
      </div>

      {/* Products List */}
      <div className="p-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No products found
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg shadow-sm p-3 flex items-center"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-3 flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.origin} • {product.roastLevel} roast</p>
                  <p className="font-semibold">${product.price.toFixed(2)}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="p-2 text-coffee-dark hover:bg-gray-100 rounded-full"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(product)}
                    className="p-2 text-red-500 hover:bg-gray-100 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2 mt-4">
            <button 
              onClick={() => setDeleteDialogOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button 
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog - In a real app, this would be a form */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            You are editing "{selectedProduct?.name}". In a complete implementation, this would be a form to update the product details.
          </p>
          <div className="flex justify-end mt-4">
            <button 
              onClick={() => setEditDialogOpen(false)}
              className="px-4 py-2 bg-coffee-dark text-white rounded-md"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
