
import React from 'react';
import { StarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CoffeeProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  origin: string;
  roastLevel: 'light' | 'medium' | 'dark';
  rating: number;
  reviews: number;
}

interface CoffeeCardProps {
  product: CoffeeProduct;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ product }) => {
  const { id, name, price, image, origin, roastLevel, rating, reviews } = product;
  
  const getRoastColor = () => {
    switch (roastLevel) {
      case 'light': return 'bg-coffee-cream text-coffee-dark';
      case 'medium': return 'bg-coffee-light text-white';
      case 'dark': return 'bg-coffee-dark text-white';
      default: return 'bg-coffee-medium text-white';
    }
  };

  return (
    <Link to={`/product/${id}`} className="coffee-card">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs ${getRoastColor()}`}>
          {roastLevel} roast
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-coffee-medium mb-1">{origin}</div>
        <h3 className="font-semibold text-coffee-dark">{name}</h3>
        
        <div className="flex items-center mt-1">
          <div className="flex text-yellow-500 mr-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i}
                size={14}
                fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                className={i < Math.floor(rating) ? "" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <span className="font-bold">${price.toFixed(2)}</span>
          <button className="coffee-btn text-sm py-1">Add to cart</button>
        </div>
      </div>
    </Link>
  );
};

export default CoffeeCard;
