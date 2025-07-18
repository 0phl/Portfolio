import React, { useEffect, useState, useRef } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { apiRequest, API_CONFIG } from '../config/api';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  id: string; // Add unique ID for messages
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false); // Start with typing indicator inactive
  const [initialGreetingShown, setInitialGreetingShown] = useState(false);
  const [showInitialTyping, setShowInitialTyping] = useState(false); // Track initial typing state
  const [isProcessing, setIsProcessing] = useState(false); // Track if bot is processing a response
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [animationStage, setAnimationStage] = useState<'initial' | 'entering' | 'entered' | 'exiting' | 'exited'>('initial');
  const [renderedMessages, setRenderedMessages] = useState<Set<string>>(new Set());

  // Add animations to document head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes chatboxIn {
        0% { opacity: 0; transform: translateY(20px) scale(0.95); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes chatboxOut {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(20px) scale(0.95); }
      }

      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .animate-chatbox-in {
        animation: chatboxIn 0.5s ease-out forwards;
      }

      .animate-chatbox-out {
        animation: chatboxOut 0.5s ease-in forwards;
      }

      .animate-fade-in {
        animation: fadeIn 0.3s ease-out forwards;
      }

      @keyframes subtle-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }

      .animate-subtle-bounce {
        animation: subtle-bounce 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  // Show new message indicator immediately when there's a new message
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  const handleClose = () => {
    setAnimationStage('exiting');
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setAnimationStage('exited');
    }, 500); // Increased to ensure animation completes
  };

  const toggleChatbot = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      setAnimationStage('entering');

      // Show typing animation if initial greeting hasn't been shown yet
      if (!initialGreetingShown && !showInitialTyping) {
        setShowInitialTyping(true);
        setIsTyping(true);
      }

      setTimeout(() => {
        setAnimationStage('entered');
        // Scroll to bottom when opening
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
        }
      }, 50);
    }
    if (hasNewMessage) setHasNewMessage(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing || isTyping) return; // Prevent submission if processing or typing

    // Set processing state to prevent spam
    setIsProcessing(true);

    // Ensure initial greeting is shown if it hasn't been already
    if (!initialGreetingShown) {
      // Force the initial greeting to be shown immediately
      setShowInitialTyping(false);
      setInitialGreetingShown(true);
      setIsTyping(false);
      const welcomeMessageId = 'welcome-message';
      const welcomeMessage: Message = {
        text: "Hi there! I'm Ronan's AI assistant, How can i help you today?",
        sender: 'bot',
        timestamp: new Date(),
        id: welcomeMessageId
      };
      setMessages([welcomeMessage]);
      setRenderedMessages(prev => {
        const updated = new Set(prev);
        updated.add(welcomeMessageId);
        return updated;
      });
    }

    // Add user message
    const userMessageId = `user-${Date.now()}`;
    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
      id: userMessageId
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Show typing indicator
    setIsTyping(true);

    // Generate bot response using RAG API
    getBotResponseFromAPI(input);
  };

  // Track which messages have been rendered to avoid re-animating them
  useEffect(() => {
    const newMessageIds = messages.map(m => m.id).filter(id => !renderedMessages.has(id));
    if (newMessageIds.length > 0) {
      setRenderedMessages(prev => {
        const updated = new Set(prev);
        newMessageIds.forEach(id => updated.add(id));
        return updated;
      });
    }
  }, [messages]);

  const getBotResponseFromAPI = async (userInput: string) => {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.CHAT, {
        method: 'POST',
        body: JSON.stringify({
          message: userInput
        })
      });

      const data = await response.json();
      
      const botMessageId = `bot-${Date.now()}`;
      const botMessage: Message = {
        text: data.response || "I apologize, but I didn't receive a proper response. Could you please try asking your question again?",
        sender: 'bot',
        timestamp: new Date(),
        id: botMessageId
      };
      
      setIsTyping(false);
      setIsProcessing(false); // Reset processing state
      setMessages(prev => [...prev, botMessage]);
      if (!isOpen) setHasNewMessage(true);

    } catch (error) {
      console.error('Error calling RAG API:', error);

      const errorMessageId = `bot-error-${Date.now()}`;
      const errorMessage: Message = {
        text: "I'm sorry, I'm having trouble connecting to my knowledge base right now.",
        sender: 'bot',
        timestamp: new Date(),
        id: errorMessageId
      };

      setIsTyping(false);
      setIsProcessing(false); // Reset processing state on error
      setMessages(prev => [...prev, errorMessage]);
      if (!isOpen) setHasNewMessage(true);
    }
  };

  // Scroll to bottom when messages change or typing indicator appears
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping, isOpen]);

  // Scroll to bottom when chat is opened
  useEffect(() => {
    if (isOpen && animationStage === 'entered' && messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 100);
    }
  }, [isOpen, animationStage]);

  // Handle initial greeting with typing animation
  useEffect(() => {
    // Only proceed if typing is shown and chatbot is open
    if (showInitialTyping && isOpen && !initialGreetingShown) {
      // Simulate typing delay then add the welcome message
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        const welcomeMessageId = 'welcome-message';
        const welcomeMessage: Message = {
          text: "Hi there! I'm Ronan's AI assistant, How can i help you today?",
          sender: 'bot',
          timestamp: new Date(),
          id: welcomeMessageId
        };
        setMessages([welcomeMessage]);
        setRenderedMessages(prev => {
          const updated = new Set(prev);
          updated.add(welcomeMessageId);
          return updated;
        });
        setInitialGreetingShown(true);
      }, 1500); // Adjust typing delay as needed

      return () => clearTimeout(typingTimer);
    }
  }, [showInitialTyping, isOpen, initialGreetingShown]);

  return <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChatbot}
        className={`
          fixed bottom-6 right-6 z-50
          p-3 rounded-full
          bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500
          text-white
          shadow-lg shadow-blue-500/20 dark:shadow-blue-400/20
          transition-all duration-300 ease-in-out
          hover:shadow-xl hover:scale-105
          active:scale-95
          ${hasNewMessage && !isOpen ? 'animate-subtle-bounce' : ''}
          border border-white/20 dark:border-white/10
          backdrop-blur-sm
        `}
        aria-label="Toggle chatbot"
      >
        <div className="relative">
          <div className="transition-transform duration-300 ease-in-out transform">
            {isOpen ? (
              <X
                size={20}
                className="transition-all duration-300 ease-in-out transform rotate-0 hover:rotate-90"
              />
            ) : (
              <div className="relative">
                <MessageSquare
                  size={20}
                  className="transition-all duration-300 ease-in-out transform hover:scale-110"
                />

                {/* Notification Badge */}
                {hasNewMessage && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </button>

      {/* Chat Panel */}
      {(isOpen || isClosing) && (
        <div className={`
          fixed bottom-24 right-6 w-[350px] h-[550px]
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-800
          rounded-2xl shadow-2xl
          flex flex-col z-50
          overflow-hidden
          transform-gpu
          transition-all duration-500 ease-in-out
          ${isClosing || animationStage === 'exiting'
            ? 'opacity-0 translate-y-10 scale-95 pointer-events-none'
            : animationStage === 'entering'
              ? 'opacity-0 translate-y-10 scale-95'
              : 'opacity-100 translate-y-0 scale-100'
          }
          motion-safe:animate-chatbox-${isClosing ? 'out' : 'in'}
        `}>
          {/* Header */}
          <div className={`
            p-4 border-b border-gray-200 dark:border-gray-800
            bg-gradient-to-r from-blue-500/5 via-blue-500/10 to-blue-500/5
            transition-all duration-300
            ${isClosing ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'}
          `}>
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <h3 className={`
                  font-semibold text-base
                  bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500
                  bg-clip-text text-transparent
                  transition-all duration-300
                  ${isClosing ? 'opacity-0 transform -translate-x-2' : 'opacity-100 transform translate-x-0'}
                `}>
                  Chat with Ronan's Assistant
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
                </div>
              </div>
              <button
                onClick={toggleChatbot}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={18} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div
            className={`
              flex-1 px-4 py-4 overflow-y-auto
              scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent
              transition-all duration-500
              ${isClosing ? 'opacity-0 scale-95 transform translate-y-4' : 'opacity-100 scale-100 transform translate-y-0'}
            `}
            id="chat-messages-container"
          >
            <div className="space-y-4">
              {messages.map((message) => {
                const isNewMessage = !renderedMessages.has(message.id) || renderedMessages.has(message.id) && isOpen && animationStage === 'entering';

                return (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}
                              ${isNewMessage ? 'animate-fade-in' : ''}`}
                    style={{
                      opacity: isClosing ? 0 : 1,
                      transform: isClosing ? 'translateY(10px)' : 'translateY(0)',
                      transition: 'opacity 300ms, transform 300ms',
                    }}
                  >
                    <div
                      className={`
                        relative group max-w-[85%] rounded-2xl
                        ${message.text.length < 15
                          ? 'py-1.5 px-3'
                          : message.text.length < 30
                            ? 'py-2 px-3.5'
                            : 'py-2.5 px-4'
                        }
                        ${message.sender === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        }
                        transition-all duration-300 hover:shadow-md
                      `}
                    >
                      <p className={`
                        text-sm break-words whitespace-pre-wrap mb-0.5
                        ${message.text.length < 30 ? 'leading-snug' : 'leading-relaxed'}
                      `}>
                        {message.text}
                      </p>
                      <span className="block text-[9px] opacity-70 text-right">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {/* Chat bubble tail */}
                      {message.sender === 'bot' ? (
                        <svg
                          className="absolute left-[-6px] bottom-[8px]"
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 8L8 0L0 8L8 8Z"
                            fill="#F3F4F6"
                            className="dark:fill-gray-800"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="absolute right-[-6px] bottom-[8px]"
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 8L0 0L8 8L0 8Z"
                            className="fill-blue-500 dark:fill-blue-400"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="relative bg-gray-100 dark:bg-gray-800 py-1.5 px-2.5 rounded-2xl">
                    <div className="flex space-x-1.5 items-center h-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                    {/* Typing indicator tail */}
                    <svg
                      className="absolute left-[-6px] bottom-[8px]"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 8L8 0L0 8L8 8Z"
                        fill="#F3F4F6"
                        className="dark:fill-gray-800"
                      />
                    </svg>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className={`
            p-4 border-t border-gray-200 dark:border-gray-800
            bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900
            transition-all duration-500
            ${isClosing ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}
          `}>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex gap-2 items-start">
                <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={e => {
                    const value = e.target.value;
                    if (value.length <= 1000) {
                      setInput(value);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (input.trim() && !isProcessing && !isTyping) handleSubmit(e);
                    }
                  }}
                  placeholder={isProcessing || isTyping ? "Please wait for response..." : "Type your message..."}
                  disabled={isProcessing || isTyping}
                  maxLength={1000}
                  className={`w-full px-4 py-2 text-sm rounded-2xl border border-gray-200 dark:border-gray-700
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                          focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50
                          transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500
                          resize-none min-h-[40px] max-h-[100px] overflow-y-auto
                          scrollbar-none
                          ${isProcessing || isTyping ? 'opacity-60 cursor-not-allowed' : ''}`}
                />
                </div>
                <button
                type="submit"
                disabled={!input.trim() || isProcessing || isTyping}
                className={`
                  h-[40px] w-[40px] rounded-full flex items-center justify-center shrink-0
                  transition-all duration-300 ease-in-out
                  ${input.trim() && !isProcessing && !isTyping
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  }
                `}
                aria-label="Send message"
              >
                <Send size={16} className="transform rotate-45" />
                </button>
              </div>
              {/* Character counter */}
              <div className={`text-xs text-right transition-all duration-200 ${
                input.length > 900
                  ? 'text-red-500 dark:text-red-400'
                  : input.length > 800
                    ? 'text-yellow-500 dark:text-yellow-400'
                    : 'text-gray-400 dark:text-gray-500'
              }`}>
                {input.length}/1000
              </div>
            </form>
          </div>
        </div>
      )}
    </>;
};

export default Chatbot;