
import React, { useState } from 'react';
import { Coffee, X, ChevronUp, MessageCircle, Send } from 'lucide-react';

const CafecitoBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([
    { text: "Hi! I'm Cafecito, your coffee assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const toggleBot = () => setIsOpen(!isOpen);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: input, isBot: false }]);
    
    // Simulate bot response (we'd integrate with a real API in production)
    setTimeout(() => {
      const botResponses = [
        "I recommend trying our Ethiopian beans if you enjoy fruity notes in your coffee!",
        "For a bold morning brew, our dark roast Colombian coffee is perfect.",
        "Did you know? Fair trade coffee ensures farmers receive fair compensation for their work.",
        "Looking for something smooth? Our medium roast from Guatemala has chocolatey notes with low acidity.",
        "The best grind size depends on your brewing method. For pour-over, a medium-fine grind works well!"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
    }, 1000);
    
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Bot Icon */}
      <button 
        onClick={toggleBot} 
        className={`fixed bottom-20 right-4 z-50 p-3 rounded-full shadow-lg ${isOpen ? 'bg-coffee-accent' : 'bg-coffee-dark'} text-white`}
      >
        {isOpen ? <X size={24} /> : <Coffee size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-32 right-4 w-80 h-96 bg-white rounded-2xl shadow-xl z-40 flex flex-col overflow-hidden border border-coffee-cream animate-fade-in">
          {/* Header */}
          <div className="bg-coffee-dark text-white p-4 flex items-center">
            <Coffee size={20} className="mr-2" />
            <div>
              <h3 className="font-bold">Cafecito</h3>
              <p className="text-xs opacity-75">Your Coffee Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isBot 
                    ? 'bg-coffee-cream text-coffee-dark mr-auto' 
                    : 'bg-coffee-dark text-white ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-coffee-cream bg-white flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about coffee..."
              className="flex-1 border border-coffee-cream rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-coffee-medium"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-coffee-dark text-white rounded-r-lg px-3"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CafecitoBot;
