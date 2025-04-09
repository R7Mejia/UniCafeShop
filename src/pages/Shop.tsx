
import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import CoffeeCard from '../components/CoffeeCard';
import CafecitoBot from '../components/CafecitoBot';
import { coffeeProducts } from '../data/coffeeData';

type RoastLevel = 'all' | 'light' | 'medium' | 'dark';
type SortOption = 'popular' | 'priceAsc' | 'priceDesc' | 'rating';

const Shop = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [roastFilter, setRoastFilter] = useState<RoastLevel>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const toggleFilters = () => setFilterOpen(!filterOpen);

  const filteredProducts = coffeeProducts
    .filter(product => roastFilter === 'all' || product.roastLevel === roastFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc': return a.price - b.price;
        case 'priceDesc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return b.reviews - a.reviews; // popular
      }
    });

  return (
    <div className="pb-20"> {/* Padding bottom for nav bar */}
      {/* Header */}
      <div className="bg-coffee-dark text-white p-6">
        <h1 className="text-2xl font-bold">Shop Our Coffee</h1>
        <p className="text-coffee-cream">Ethically sourced, expertly roasted</p>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-20 bg-white border-b border-coffee-cream shadow-sm">
        <div className="flex justify-between items-center p-4">
          <div>
            <span className="text-sm text-gray-500">
              {filteredProducts.length} products
            </span>
          </div>
          <button 
            onClick={toggleFilters}
            className="flex items-center text-coffee-dark"
          >
            <Filter size={18} className="mr-1" />
            <span>Filter & Sort</span>
          </button>
        </div>

        {/* Filter Drawer */}
        {filterOpen && (
          <div className="border-t border-coffee-cream p-4 bg-white shadow-md animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={toggleFilters}>
                <X size={18} />
              </button>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Roast Level</h4>
              <div className="flex flex-wrap gap-2">
                {(['all', 'light', 'medium', 'dark'] as RoastLevel[]).map(level => (
                  <button
                    key={level}
                    onClick={() => setRoastFilter(level)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      roastFilter === level 
                        ? 'bg-coffee-dark text-white' 
                        : 'bg-white text-coffee-dark'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Sort By</h4>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="w-full p-2 border border-coffee-cream rounded-lg"
              >
                <option value="popular">Most Popular</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <CoffeeCard key={product.id} product={product} />
        ))}
      </div>

      <NavigationBar />
      <CafecitoBot />
    </div>
  );
};

export default Shop;
