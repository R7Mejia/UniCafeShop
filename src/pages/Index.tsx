
import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowRight, Leaf, Award, Globe } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import CoffeeCard from '../components/CoffeeCard';
import CafecitoBot from '../components/CafecitoBot';
import { featuredProducts } from '../data/coffeeData';

const Index = () => {
  return (
    <div className="pb-20"> {/* Padding bottom for nav bar */}
      {/* Hero Section */}
      <div className="relative h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark/80 to-coffee-dark/20 z-10" />
        <img
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1471&auto=format&fit=crop"
          alt="Coffee beans"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex flex-col justify-center px-6">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-2">UniCafe</h1>
            <p className="text-coffee-cream text-lg mb-6">Ethically sourced, fair trade coffee</p>
            <Link 
              to="/shop" 
              className="bg-coffee-accent text-white px-6 py-3 rounded-lg inline-flex items-center"
            >
              Shop Now
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-10 px-6 bg-coffee-cream">
        <h2 className="text-2xl font-bold text-coffee-dark text-center mb-8">Why Choose UniCafe?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-4 rounded-full mb-4 shadow-md">
              <Leaf size={32} className="text-coffee-medium" />
            </div>
            <h3 className="font-semibold mb-2">Sustainable</h3>
            <p className="text-sm text-coffee-dark/80">Eco-friendly practices from farm to cup</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-4 rounded-full mb-4 shadow-md">
              <Award size={32} className="text-coffee-medium" />
            </div>
            <h3 className="font-semibold mb-2">Premium Quality</h3>
            <p className="text-sm text-coffee-dark/80">Expertly selected and roasted beans</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-4 rounded-full mb-4 shadow-md">
              <Globe size={32} className="text-coffee-medium" />
            </div>
            <h3 className="font-semibold mb-2">Fair Trade</h3>
            <p className="text-sm text-coffee-dark/80">Supporting coffee farmers worldwide</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-coffee-dark">Featured Coffee</h2>
          <Link to="/shop" className="text-coffee-accent flex items-center text-sm">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <CoffeeCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="py-10 px-6 bg-coffee-dark text-white">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
        
        <div className="max-w-lg mx-auto">
          <div className="bg-coffee-dark/50 p-6 rounded-lg mb-6 border border-coffee-medium">
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="mb-4 italic">"The Ethiopian Yirgacheffe has completely changed my morning routine. The fruity notes and smooth finish are unmatched!"</p>
            <div className="font-semibold">- Maria S.</div>
          </div>
          
          <div className="bg-coffee-dark/50 p-6 rounded-lg border border-coffee-medium">
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="mb-4 italic">"I appreciate that UniCafe is committed to fair trade practices. Knowing my coffee purchase makes a positive impact makes it taste even better."</p>
            <div className="font-semibold">- James L.</div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-10 px-6 bg-coffee-cream">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-bold text-coffee-dark mb-2">Join Our Coffee Club</h2>
          <p className="text-coffee-medium mb-4">Get updates, special offers and brewing tips</p>
          
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 px-4 py-3 rounded-l-lg border-y border-l border-coffee-light focus:outline-none"
            />
            <button className="bg-coffee-dark text-white px-4 py-3 rounded-r-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <NavigationBar />
      <CafecitoBot />
    </div>
  );
};

export default Index;
