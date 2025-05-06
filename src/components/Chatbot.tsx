import React, { useEffect, useState, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hi there! I'm Ronan's virtual assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Add user message
    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    // Generate bot response
    setTimeout(() => {
      const botMessage: Message = {
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };
  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes('name')) {
      return "My name is Ronan Dela Cruz. I'm an aspiring full-stack web developer.";
    } else if (input.includes('experience') || input.includes('work')) {
      return 'I have experience as a Web Developer Intern at Tech Solutions Inc. and as a Junior Frontend Developer at Digital Creations.';
    } else if (input.includes('skill') || input.includes('technologies')) {
      return 'I work with React, JavaScript, TypeScript, Node.js, Express, MongoDB, and more. Check out my Skills section for the complete list!';
    } else if (input.includes('project')) {
      return "I've worked on various projects including a personal portfolio, e-commerce dashboard, and a task management app. You can see them in the Projects section.";
    } else if (input.includes('education') || input.includes('study')) {
      return "I have a Bachelor's degree in Computer Science from University of Technology and completed additional certifications in web development and UI/UX design.";
    } else if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
      return 'You can reach me at ronan@example.com or connect with me on LinkedIn or GitHub. Links are in the footer!';
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Hello there! How can I help you today?';
    } else {
      return "I'm not sure I understand. Could you ask about my skills, experience, projects, education, or contact information?";
    }
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages]);
  return <>
      {/* Chatbot Button - Adjusted for mobile */}
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 p-3 sm:p-4 rounded-full shadow-lg z-40 transition-colors ${isOpen ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'}`}
        aria-label="Toggle chatbot"
      >
        {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <MessageSquare size={20} className="sm:w-6 sm:h-6" />}
      </button>

      {/* Chatbot Panel - Improved for mobile */}
      {isOpen && (
        <div className="fixed bottom-16 sm:bottom-20 right-2 sm:right-6 w-[calc(100vw-16px)] sm:w-80 md:w-96 h-[60vh] sm:h-96 bg-background border border-border rounded-lg shadow-lg flex flex-col z-40 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-border bg-muted/50">
            <h3 className="font-semibold text-sm sm:text-base">Chat with Ronan's Assistant</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
            <div className="space-y-3 sm:space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2 sm:p-3 rounded-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="text-xs sm:text-sm">{message.text}</p>
                    <p className="text-[10px] sm:text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-2 sm:p-4 border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 text-xs sm:text-sm rounded-md border border-input bg-background"
            />
            <button
              type="submit"
              className="p-2 bg-primary text-primary-foreground rounded-md"
              aria-label="Send message"
            >
              <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </form>
        </div>
      )}
    </>;
};
export default Chatbot;