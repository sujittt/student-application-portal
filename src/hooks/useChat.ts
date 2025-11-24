import { useState } from 'react';
import { ChatMessage } from '../types';
import { useLocalStorage } from './useLocalStorage';

// TODO: Replace with actual API integration later
const mockAIResponses = [
  "I'd be happy to help you with your college application! What specific question do you have?",
  "That's a great question. Based on your application, I recommend focusing on your unique experiences and achievements.",
  "For the essay section, make sure to be authentic and showcase your personality. Admissions officers want to know the real you.",
  "Your academic record looks strong. Consider highlighting your extracurricular activities that demonstrate leadership.",
  "Remember to proofread all documents before submission. Small errors can make a big difference.",
  "I recommend having your essay reviewed by a teacher or counselor before final submission.",
  "Make sure all your PDF documents are clear and readable. Poor quality scans can hurt your application.",
];

export function useChat() {
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>('chatHistory', [
    {
      id: '1',
      content: 'Hello! I\'m your AI college application assistant. I can help answer questions about:\n\n- **Application requirements**\n- **Essay writing tips**\n- **Document preparation**\n- **Deadlines and procedures**\n\nFeel free to ask me anything!',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response with random delay for more realistic feel
    setTimeout(() => {
      const randomResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const clearHistory = () => {
    // Reset chat to initial welcome message
    setMessages([
      {
        id: '1',
        content: 'Hello! I\'m your AI college application assistant. How can I help you today?',
        role: 'assistant',
        timestamp: new Date(),
      },
    ]);
  };

  return {
    messages,
    isTyping,
    inputValue,
    setInputValue,
    sendMessage,
    clearHistory,
  };
}
