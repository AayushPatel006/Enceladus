import React, { useState } from 'react';
import Fuse from 'fuse.js'; // Import the fuzzy matching library
import './Chatbot.css'; // Import your CSS for styling

const predefinedAnswers = {
  "hi": "Hello! How can I assist you today?",
  "hello": "Hi there! What would you like to know about exoplanets?",
  "hey": "Hey! Feel free to ask me anything about exoplanets.",
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

  const handleSend = () => {
    if (input.trim()) {
      const normalizedInput = input.toLowerCase().replace(/[.,!?]/g, '').trim();
      setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);

      // Fuzzy search for the best match
      const results = fuse.search(normalizedInput);
      const bestMatch = results.length > 0 ? results[0].item : null;

      const response = bestMatch ? predefinedAnswers[bestMatch] : "Sorry, I don't have an answer for that.";
      setMessages((prevMessages) => [...prevMessages, { text: response, sender: 'gemini' }]);
      
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
