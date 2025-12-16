import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, User, Bot, Loader2, Eraser } from 'lucide-react';
import { Message, SenderType } from '../types';
import { sendMessageToGemini } from '../services/gemini';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou seu assistente de licitações. Em que posso ajudar hoje? (Ex: Como comprar 50 lápis? Quais os documentos para um Pregão?)',
      sender: SenderType.BOT,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: SenderType.USER,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const aiResponseText = await sendMessageToGemini(inputText);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: SenderType.BOT,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
        {
          id: '1',
          text: 'Histórico limpo. Como posso ajudar com sua nova consulta?',
          sender: SenderType.BOT,
          timestamp: new Date(),
        },
    ]);
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header Area */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Consultas Normativas</h2>
          <p className="text-sm text-slate-500">Tire dúvidas sobre a Lei 14.133/2021 e processos operacionais.</p>
        </div>
        <button 
            onClick={clearChat}
            className="text-slate-500 hover:text-red-500 transition-colors p-2"
            title="Limpar conversa"
        >
            <Eraser className="w-5 h-5"/>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === SenderType.USER ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.sender === SenderType.USER ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
              }`}
            >
              {msg.sender === SenderType.USER ? <User size={16} /> : <Bot size={16} />}
            </div>
            
            <div
              className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-4 shadow-sm text-sm leading-relaxed ${
                msg.sender === SenderType.USER
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none prose prose-sm max-w-none'
              }`}
            >
              {msg.sender === SenderType.USER ? (
                msg.text
              ) : (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span className="text-xs text-slate-500 font-medium">Analisando legislação...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-4 md:p-6">
        <div className="max-w-4xl mx-auto relative flex items-end gap-2 bg-slate-50 border border-slate-300 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-shadow">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Descreva sua dúvida (ex: documentos para dispensa de licitação)"
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-2.5 px-3 text-slate-800 placeholder-slate-400 text-sm"
            rows={1}
            style={{ minHeight: '44px' }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className={`p-2.5 rounded-lg mb-0.5 transition-all ${
              inputText.trim() && !isLoading
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-2">
          As respostas são baseadas na Lei 14.133/2021. Verifique sempre com a assessoria jurídica.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;