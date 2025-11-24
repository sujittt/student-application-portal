import { FaPaperPlane } from 'react-icons/fa';
import { useChat } from '../hooks/useChat';
import { useTheme } from '../hooks/useTheme';
import { marked } from 'marked';
import { useEffect, useRef } from 'react';

export function ChatInterface() {
  const { messages, isTyping, inputValue, setInputValue, sendMessage } = useChat();
  const { isDark } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
    }
  };

  const renderMarkdown = (content: string) => {
    // Using marked library to parse markdown in assistant responses
    const html = marked(content) as string;
    return { __html: html };
  };

  return (
    <div className={`flex flex-col h-full ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border`}>
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>AI Assistant</h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Ask questions about your college application</p>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`} style={{ minHeight: '400px', maxHeight: '600px' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : isDark ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.role === 'assistant' ? (
                <div
                  className="prose prose-sm max-w-none prose-headings:mt-2 prose-headings:mb-2 prose-p:my-1 prose-ul:my-1 prose-li:my-0"
                  dangerouslySetInnerHTML={renderMarkdown(message.content)}
                />
              ) : (
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg px-4 py-3`}>
              <div className="flex space-x-2">
                <div className={`w-2 h-2 ${isDark ? 'bg-gray-500' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
                <div className={`w-2 h-2 ${isDark ? 'bg-gray-500' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
                <div className={`w-2 h-2 ${isDark ? 'bg-gray-500' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={`p-4 border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question here..."
            className={`flex-1 px-4 py-2 border rounded-lg transition-colors focus:outline-none ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            }`}
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={isTyping || !inputValue.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <FaPaperPlane className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
