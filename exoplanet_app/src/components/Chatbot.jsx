import React, { useState } from 'react';
import Fuse from 'fuse.js'; // Import the fuzzy matching library
import './Chatbot.css'; // Import your CSS for styling


const predefinedAnswers = {
  "what is an exoplanet": "An exoplanet is a planet that orbits a star outside our solar system.",
  "how do exoplanets form": "Exoplanets form from the dust and gas surrounding a new star, gradually coalescing into larger bodies.",
  "what are the types of exoplanets": "Exoplanets can be classified into several types, including gas giants, rocky planets, and super-Earths.",
  "how many exoplanets have been discovered": "As of now, thousands of exoplanets have been confirmed, with many more candidates awaiting verification.",
  "what is the significance of exoplanets": "Studying exoplanets helps us understand the formation of planetary systems and the potential for life beyond Earth.",
  "can humans live on exoplanets": "Currently, we do not have the technology to live on exoplanets, but studying them helps us understand the potential for life elsewhere.",
  "what is the closest exoplanet": "The closest known exoplanet is Proxima Centauri b, located about 4.24 light-years away from Earth.",
  "how do we discover exoplanets": "Exoplanets are discovered using various methods, including the transit method and radial velocity method.",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to manage chat visibility

  const fuse = new Fuse(Object.keys(predefinedAnswers), { // Initialize Fuse.js
    includeScore: true,
    threshold: 0.3, // Adjust threshold for sensitivity
  });

  const handleSend = async () => { // Change to async function
    if (input.trim()) {
      const normalizedInput = input.toLowerCase().replace(/[.,!?]/g, '').trim();
      setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Use the correct prefix

      console.log("API Key:", apiKey);

      // Send input to Gemini API
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "contents":[{"parts":[{"text":normalizedInput}]}] }), // Send user input
        });
        const data = await response.json();
        console.log("Gemini Response", data.candidates[0].content.parts[0].text)
        const geminiResponse = data.candidates[0].content.parts[0].text || "Sorry, I don't have an answer for that."; // Adjust based on API response structure

        setMessages((prevMessages) => [...prevMessages, { text: geminiResponse, sender: 'gemini' }]);
      } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        setMessages((prevMessages) => [...prevMessages, { text: "Sorry, there was an error contacting the service.", sender: 'gemini' }]);
      }
      
      setInput(''); // Clear the input field
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen); // Toggle chat visibility
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChat}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about exoplanets..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
