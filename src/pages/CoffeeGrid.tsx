// CoffeeGrid.tsx
import React from "react";
import { featuredProducts } from "../data/coffeeData"; // make sure the path is correct
import CoffeeCard from "../components/CoffeeCard"; // Adjust the import path as necessary


const CoffeeGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProducts.map((product) => (
        <CoffeeCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CoffeeGrid;
