
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type FormData = {
  name: string;
  price: string;
  origin: string;
  roastLevel: 'light' | 'medium' | 'dark';
  image: string;
};

const AdminProductForm = () => {
  const navigate = useNavigate();
  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      price: '',
      origin: '',
      roastLevel: 'medium',
      image: '',
    }
  });

  const onSubmit = (data: FormData) => {
    // In a real app, this would save to a database
    toast({
      title: "Product created",
      description: `${data.name} has been added to the inventory`,
    });
    navigate('/admin/products');
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-coffee-dark text-white p-4 flex items-center">
        <Link to="/admin/products" className="mr-3">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">Add New Product</h1>
      </div>

      {/* Form */}
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Ethiopian Yirgacheffe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="15.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Ethiopia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roastLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roast Level</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full p-2 border rounded-md"
                      {...field}
                    >
                      <option value="light">Light</option>
                      <option value="medium">Medium</option>
                      <option value="dark">Dark</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full py-3 bg-coffee-dark text-white rounded-lg"
              >
                Add Product
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminProductForm;
