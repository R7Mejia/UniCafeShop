import { useState } from "react";
//import { motion } from "framer-motion"; // Import motion for animations

const CafecitoBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 💬 Toggle state

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [{ role: "user", content: input }],
          }),
        }
      );

      const data = await response.json();
      const botMessage =
        data?.choices?.[0]?.message?.content ||
        "I'm sorry, I couldn't understand that.";

      setMessages((prev) => [...prev, { text: botMessage, isBot: true }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Oops! Something went wrong.", isBot: true },
      ]);
    }

    setLoading(false);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="fixed bottom-[4.5rem] right-2 z-50">
      {/* 🧠 Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-[#7c3aed] text-white px-4 py-2 rounded-full shadow-lg">
        {isOpen ? "Close Bot" : "Ask Cafecito"}
      </button>

      {isOpen && (
        <div className="bg-white w-80 h-[400px] mt-4 p-4 rounded-xl shadow-2xl flex flex-col">
          <div className="flex-1 overflow-y-auto mb-2 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md text-sm ${
                  msg.isBot
                    ? "bg-gray-100 text-black"
                    : "bg-indigo-100 text-black self-end"
                }`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              className="flex-1 border px-3 py-1 rounded-md text-sm"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Say something..."
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-indigo-500 text-white px-3 py-1 rounded-md text-sm">
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CafecitoBot;

// import { useState } from "react";

// const CafecitoBot = () => {
//   const [input, setInput] = useState<string>("");
//   const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>(
//     []
//   );
//   const [loading, setLoading] = useState(false);

//   // Function to handle sending the user's message
//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     // Add user message to chat
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: input, isBot: false },
//     ]);
//     setLoading(true);

//     // Prepare the API request
//     const query = input;
//     try {
//       const response = await fetch(
//         "https://api.groq.com/openai/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
//           },
//           body: JSON.stringify({
//             model: "meta-llama/llama-4-scout-17b-16e-instruct",
//             messages: [
//               {
//                 role: "user",
//                 content: query,
//               },
//             ],
//           }),
//         }
//       );

//       const data = await response.json();
//       // ✅ Debug log to check the API response
//       console.log("Bot Response Data:", data);

//       const botMessage =
//         data?.choices?.[0]?.message?.content ||
//         "I'm sorry, I couldn't understand that.";

//       // Add bot's response to chat
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: botMessage, isBot: true },
//       ]);
//     } catch (error) {
//       console.error("Error fetching bot response:", error);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           text: "Oops! Something went wrong. Please try again later.",
//           isBot: true,
//         },
//       ]);
//     }

//     setLoading(false);
//     setInput(""); // Clear the input field
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div style={{ position: "fixed", bottom: 20, right: 20, width: "300px", padding: "1rem", border: "1px solid #ccc", background: "white", borderRadius: "8px", zIndex: 1000 }}>
//       <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "0.5rem" }}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={{ marginBottom: "0.5rem", color: msg.isBot ? "blue" : "black" }}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyDown={handleKeyPress}
//         placeholder="Type your message..."
//         style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
//       />
//       <button
//         onClick={handleSendMessage}
//         disabled={loading}
//         style={{ width: "100%", padding: "0.5rem" }}
//       >
//         {loading ? "Loading..." : "Send"}
//       </button>
//     </div>
//   );
// }

// export default CafecitoBot;
