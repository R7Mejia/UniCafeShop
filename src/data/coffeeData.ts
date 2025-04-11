import { CoffeeProduct } from "../components/CoffeeCard";

// Master product list
export const coffeeProducts: CoffeeProduct[] = [
  {
    id: 1,
    name: "Honduran Coffee",
    price: 15.99,
    image: "/public/assets/img/LOTR.jpeg",
    origin: "Honduras",
    roastLevel: "light",
    rating: 4.5,
    reviews: 12,
  },
  {
    id: 2,
    name: "Honduran",
    price: 14.5,
    image: "/public/assets/img/halo.jpeg",
    origin: "Comayagua, Honduras",
    roastLevel: "medium",
    rating: 4.2,
    reviews: 9,
  },
  // Add more...
  {
    id: 3,
    name: "Honduran",
    price: 14.5,
    image: "/public/assets/img/halo.jpeg",
    origin: "Comayagua, Honduras",
    roastLevel: "medium",
    rating: 4.5,
    reviews: 1,
  },
  {
    id: 4,
    name: "Honduran",
    price: 14.5,
    image: "/public/assets/img/halo.jpeg",
    origin: "Comayagua, Honduras",
    roastLevel: "medium",
    rating: 4.4,
    reviews: 59,
  },
  {
    id: 5,
    name: "Honduran",
    price: 14.5,
    image: "/public/assets/img/halo.jpeg",
    origin: "Comayagua, Honduras",
    roastLevel: "medium",
    rating: 4.5,
    reviews: 90,
  },
];

// Featured products (derived from master list)
export const featuredProducts = coffeeProducts.slice(0, 3);

// --- Utility Functions ---

export const addProduct = (
  product: Omit<CoffeeProduct, "id" | "rating" | "reviews">
) => {
  const newId = Math.max(...coffeeProducts.map((p) => p.id)) + 1;
  const newProduct: CoffeeProduct = {
    ...product,
    id: newId,
    rating: 0,
    reviews: 0,
  };
  coffeeProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = (id: number, updates: Partial<CoffeeProduct>) => {
  const index = coffeeProducts.findIndex((p) => p.id === id);
  if (index !== -1) {
    coffeeProducts[index] = { ...coffeeProducts[index], ...updates };
    return coffeeProducts[index];
  }
  return null;
};

export const deleteProduct = (id: number) => {
  const index = coffeeProducts.findIndex((p) => p.id === id);
  if (index !== -1) {
    const deletedProduct = coffeeProducts[index];
    coffeeProducts.splice(index, 1);
    return deletedProduct;
  }
  return null;
};
