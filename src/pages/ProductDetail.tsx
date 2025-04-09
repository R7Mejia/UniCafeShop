
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Minus, Plus, Coffee, Package, ShoppingCart } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import CafecitoBot from '../components/CafecitoBot';
import { coffeeProducts } from '../data/coffeeData';
import { toast } from '@/components/ui/use-toast';

type GrindOption = 'whole-bean' | 'french-press' | 'drip' | 'espresso';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = coffeeProducts.find(p => p.id === Number(id));
  
  const [quantity, setQuantity] = useState(1);
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>('whole-bean');

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product?.name} (${selectedGrind.replace('-', ' ')})`,
    });
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-coffee-accent hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20"> {/* Padding bottom for nav bar */}
      {/* Back button */}
      <div className="p-4 border-b border-coffee-cream">
        <Link to="/shop" className="flex items-center text-coffee-medium">
          <ArrowLeft size={18} className="mr-1" />
          <span>Back to Shop</span>
        </Link>
      </div>

      {/* Product Image */}
      <div className="h-64 sm:h-80 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm ${
          product.roastLevel === 'light' ? 'bg-coffee-cream text-coffee-dark' :
          product.roastLevel === 'medium' ? 'bg-coffee-light text-white' :
          'bg-coffee-dark text-white'
        }`}>
          {product.roastLevel} roast
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="text-sm text-coffee-medium mb-1">{product.origin}</div>
        <h1 className="text-2xl font-bold text-coffee-dark mb-2">{product.name}</h1>
        
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-500 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={18}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-sm">{product.rating} ({product.reviews} reviews)</span>
        </div>
        
        <div className="text-xl font-bold mb-6">${product.price.toFixed(2)}</div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-coffee-dark/80">
            Our {product.name} comes from the pristine highlands of {product.origin}. 
            This {product.roastLevel} roast offers 
            {product.roastLevel === 'light' ? ' bright acidity with floral and fruity notes' :
              product.roastLevel === 'medium' ? ' balanced flavor with notes of chocolate and nuts' :
              ' bold, smoky flavor with low acidity and a full body'
            }. Each batch is roasted to perfection in small batches to ensure maximum freshness.
          </p>
        </div>

        {/* Grind Options */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Grind</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {([
              {value: 'whole-bean', label: 'Whole Bean', icon: Coffee},
              {value: 'french-press', label: 'French Press', icon: Package},
              {value: 'drip', label: 'Drip', icon: Package},
              {value: 'espresso', label: 'Espresso', icon: Package}
            ] as {value: GrindOption, label: string, icon: typeof Coffee}[]).map(option => (
              <button
                key={option.value}
                onClick={() => setSelectedGrind(option.value)}
                className={`border rounded-lg p-2 flex flex-col items-center justify-center text-sm ${
                  selectedGrind === option.value 
                    ? 'border-coffee-dark bg-coffee-cream' 
                    : 'border-coffee-cream'
                }`}
              >
                <option.icon size={18} className="mb-1" />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Quantity</h3>
          <div className="flex items-center">
            <button 
              onClick={decreaseQuantity}
              className="border border-coffee-cream w-10 h-10 flex items-center justify-center rounded-l-lg"
            >
              <Minus size={16} />
            </button>
            <div className="border-y border-coffee-cream w-12 h-10 flex items-center justify-center">
              {quantity}
            </div>
            <button 
              onClick={increaseQuantity}
              className="border border-coffee-cream w-10 h-10 flex items-center justify-center rounded-r-lg"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <button 
          onClick={handleAddToCart}
          className="w-full py-3 bg-coffee-dark text-white rounded-lg flex items-center justify-center"
        >
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </button>
        
        {/* Reviews Section */}
        <div className="mt-10 border-t border-coffee-cream pt-6">
          <h3 className="font-bold text-xl mb-4">Customer Reviews</h3>
          
          <div className="space-y-4">
            <div className="border-b border-coffee-cream pb-4">
              <div className="flex text-yellow-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="font-medium mb-1">Incredible depth of flavor</p>
              <p className="text-sm text-coffee-dark/80 mb-2">
                This coffee has amazing complexity with notes of berry and chocolate. Perfect morning brew!
              </p>
              <p className="text-xs text-gray-500">Sarah T. - 2 months ago</p>
            </div>
            
            <div className="border-b border-coffee-cream pb-4">
              <div className="flex text-yellow-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="font-medium mb-1">Great coffee, fast delivery</p>
              <p className="text-sm text-coffee-dark/80 mb-2">
                Beans arrived fresh and the aroma is incredible. Love that it's fair trade too.
              </p>
              <p className="text-xs text-gray-500">Michael D. - 2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>

      <NavigationBar />
      <CafecitoBot />
    </div>
  );
};

export default ProductDetail;
