
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Mic, MicOff, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { AIMessage } from '../types';
import { PRODUCTS } from '../constants';

// Manual base64 helpers as per instructions
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    { role: 'assistant', text: "Welcome to MayGloss! I'm your beauty concierge. How can I help you find your perfect glow today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMessage: AIMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = PRODUCTS.map(p => `${p.name}: ${p.description} ($${p.price}, shade: ${p.shade})`).join('\n');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are the MayGloss Beauty Assistant. You are elegant, helpful, and an expert in our products.
        Use this product list for context:
        ${context}
        
        Answer user questions about lip gloss, beauty tips, and our catalog. Keep responses concise and luxurious.
        
        User: ${textToSend}`,
      });

      const assistantMessage: AIMessage = { role: 'assistant', text: response.text || "I'm sorry, I'm having trouble connecting right now." };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Forgive me, my connection seems a bit dim. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleVoice = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[150] bg-neutral-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>

      <div className={`fixed bottom-0 right-0 h-full w-full max-w-md bg-white z-[151] shadow-2xl transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-neutral-100 bg-neutral-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest">MayGloss Assistant</h2>
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-tighter">Online</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-neutral-900 text-white rounded-br-none' : 'bg-neutral-50 text-neutral-800 rounded-bl-none border border-neutral-100'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 flex space-x-1">
                <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-neutral-100">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="w-full bg-neutral-50 border border-neutral-100 py-4 pl-6 pr-24 rounded-full text-sm outline-none focus:border-neutral-900 focus:bg-white transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <button 
                onClick={toggleVoice}
                className={`p-2 rounded-full transition-colors ${isListening ? 'bg-rose-100 text-rose-500 animate-pulse' : 'text-neutral-400 hover:text-neutral-900'}`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="bg-neutral-900 text-white p-2 rounded-full disabled:opacity-30 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-[10px] text-neutral-400 mt-4 text-center uppercase tracking-widest italic">
            Powered by Gemini Intelligence
          </p>
        </div>
      </div>
    </>
  );
};
