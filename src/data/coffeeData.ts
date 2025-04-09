
import { CoffeeProduct } from "../components/CoffeeCard";

// Images would typically come from a CDN in a real app
export const coffeeProducts: CoffeeProduct[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=1470&auto=format&fit=crop",
    origin: "Ethiopia",
    roastLevel: "light",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Colombian Supremo",
    price: 15.49,
    image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?q=80&w=1470&auto=format&fit=crop",
    origin: "Colombia",
    roastLevel: "medium",
    rating: 4.5,
    reviews: 96
  },
  {
    id: 3,
    name: "Sumatra Mandheling",
    price: 17.99,
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=1470&auto=format&fit=crop",
    origin: "Indonesia",
    roastLevel: "dark",
    rating: 4.7,
    reviews: 89
  },
  {
    id: 4,
    name: "Guatemala Antigua",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1584&auto=format&fit=crop",
    origin: "Guatemala",
    roastLevel: "medium",
    rating: 4.6,
    reviews: 75
  },
  {
    id: 5,
    name: "Kenya AA",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1571267431280-125dbc96f327?q=80&w=1471&auto=format&fit=crop",
    origin: "Kenya",
    roastLevel: "medium",
    rating: 4.9,
    reviews: 112
  },
  {
    id: 6,
    name: "Costa Rica Tarrazu",
    price: 16.49,
    image: "https://images.unsplash.com/photo-1570017885078-1df551d9520e?q=80&w=1470&auto=format&fit=crop",
    origin: "Costa Rica",
    roastLevel: "light",
    rating: 4.4,
    reviews: 67
  },
];

export const featuredProducts = coffeeProducts.slice(0, 3);

// In a real app, these functions would interact with a database
export const addProduct = (product: Omit<CoffeeProduct, 'id' | 'rating' | 'reviews'>) => {
  const newId = Math.max(...coffeeProducts.map(p => p.id)) + 1;
  const newProduct: CoffeeProduct = {
    ...product,
    id: newId,
    rating: 0,
    reviews: 0
  };
  coffeeProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = (id: number, updates: Partial<CoffeeProduct>) => {
  const index = coffeeProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    coffeeProducts[index] = { ...coffeeProducts[index], ...updates };
    return coffeeProducts[index];
  }
  return null;
};

export const deleteProduct = (id: number) => {
  const index = coffeeProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    const deletedProduct = coffeeProducts[index];
    coffeeProducts.splice(index, 1);
    return deletedProduct;
  }
  return null;
};
