import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Bot, User, Send, Sparkles, ShieldCheck, Power, BrainCircuit, UserRound, MessageCircle, BookOpen, Code2, HelpCircle, Lightbulb, Search, Cpu } from 'lucide-react';
import './style.css';

const botRules = {
  hello: 'Hi there! Welcome to DecodeLabs AI Project 1.',
  hi: 'Hello! I am your rule-based AI chatbot.',
  hey: 'Hey! How can I help you today?',
  salam: 'Wa Alaikum Assalam! Welcome to DecodeBot.',
  'good morning': 'Good morning! Hope you are ready to build something amazing.',
  'good evening': 'Good evening! How can I assist you?',
  'how are you': 'I am working perfectly using rule-based logic. How are you?',
  'what is your name': 'My name is DecodeBot, a professional rule-based AI chatbot.',
  'who created you': 'I was created by Muhammad Anas Murtaza for DecodeLabs AI Project 1.',
  'what is ai': 'AI means Artificial Intelligence. It helps machines simulate intelligent behavior.',
  'what is chatbot': 'A chatbot is a program that talks with users through text or voice.',
  'what is rule based chatbot': 'A rule-based chatbot gives responses using predefined rules, conditions, and exact keyword matching.',
  'project info': 'Project 1 requires a chatbot that handles greetings, exit commands, if-else/dictionary logic, fallback responses, and a continuous loop.',
  requirements: 'Main requirements: greetings, exit command, input sanitation, control flow, predefined responses, and continuous interaction.',
  skills: 'This project practices control flow, decision-making logic, input sanitation, dictionary lookup, fallback handling, and basic AI concepts.',
  commands: 'Available options: hello, what is ai, what is chatbot, project info, requirements, skills, logic, input sanitation, dictionary, examples, contact, bye.',
  help: 'You can click the option buttons or type: hello, what is ai, project info, requirements, skills, logic, examples, or bye.',
  logic: 'This bot uses deterministic logic: user input → clean text → match rule → return response.',
  'input sanitation': 'Input sanitation means converting text to lowercase and removing extra spaces, so Hello, hello, and HELLO work the same.',
  dictionary: 'A dictionary stores key-value pairs. Example: "hello" is the key and "Hi there!" is the value.',
  fallback: 'Fallback response is used when the bot does not understand the user input.',
  examples: 'Try these: hello, what is ai, what is your name, project info, requirements, skills, input sanitation, dictionary, bye.',
  contact: 'DecodeLabs contact: decodelabs.tech@gmail.com | www.decodelabs.tech',
  thanks: 'You are welcome!',
  'thank you': 'You are welcome! Keep building.',
  bye: 'Goodbye! Your chatbot session has ended.',
  exit: 'Goodbye! Your chatbot session has ended.',
  quit: 'Goodbye! Your chatbot session has ended.',
  close: 'Goodbye! Your chatbot session has ended.',
};

const exitCommands = ['bye', 'exit', 'quit', 'close'];
const quickOptions = [
  { label: 'Help', value: 'help', icon: HelpCircle },
  { label: 'Project Info', value: 'project info', icon: BookOpen },
  { label: 'Requirements', value: 'requirements', icon: ShieldCheck },
  { label: 'Skills', value: 'skills', icon: BrainCircuit },
  { label: 'Who Created?', value: 'who created you', icon: UserRound },
  { label: 'What is AI?', value: 'what is ai', icon: Cpu },
  { label: 'Rule Chatbot', value: 'what is rule based chatbot', icon: Bot },
  { label: 'Logic', value: 'logic', icon: Code2 },
  { label: 'Examples', value: 'examples', icon: Lightbulb },
];

function getBotReply(input) {
  const cleanInput = input.toLowerCase().trim();
  if (exitCommands.includes(cleanInput)) return { text: botRules[cleanInput], end: true };
  if (botRules[cleanInput]) return { text: botRules[cleanInput], end: false };
  if (cleanInput.includes('require')) return { text: botRules.requirements, end: false };
  if (cleanInput.includes('sanit')) return { text: botRules['input sanitation'], end: false };
  if (cleanInput.includes('dictionary') || cleanInput.includes('hash')) return { text: botRules.dictionary, end: false };
  if (cleanInput.includes('logic') || cleanInput.includes('if else')) return { text: botRules.logic, end: false };
  if (cleanInput.includes('ai')) return { text: botRules['what is ai'], end: false };
  if (cleanInput.includes('project')) return { text: botRules['project info'], end: false };
  return { text: "Sorry, I don't understand that yet. Click an option above or type 'help'.", end: false };
}

function App() {
  const [messages, setMessages] = useState([{ sender: 'bot', text: "Assalam-o-Alaikum! I am DecodeBot. Click any option or type 'help' to see what you can search." }]);
  const [input, setInput] = useState('');
  const [isEnded, setIsEnded] = useState(false);
  const chatEndRef = useRef(null);
  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);
  function sendMessage(text) {
    if (!text.trim() || isEnded) return;
    const botReply = getBotReply(text);
    setMessages(prev => [...prev, { sender: 'user', text: text.trim() }, { sender: 'bot', text: botReply.text }]);
    setInput('');
    if (botReply.end) setIsEnded(true);
  }
  function restartChat() { setMessages([{ sender: 'bot', text: "Session restarted. Click any option or type 'help' to begin." }]); setIsEnded(false); setInput(''); }
  return <main className="app-shell">
    <div className="orb orb-one"></div><div className="orb orb-two"></div><div className="grid-light"></div>
    <section className="hero-card glass-panel led-frame">
      <div className="brand-row"><div className="logo-badge led-pulse"><Bot size={34}/></div><div><p className="eyebrow"><Sparkles size={16}/> DecodeLabs Project 1</p><h1>Rule-Based AI Chatbot</h1></div></div>
      <p className="subtitle">Professional chatbot using deterministic rules, input sanitation, fallback responses, quick search options, and a modern glassmorphism interface.</p>
      <div className="stats-row"><div><ShieldCheck size={26}/><span><b>Safe Rules</b><small>Secure & Reliable</small></span></div><div><BrainCircuit size={26}/><span><b>Logic Engine</b><small>Deterministic Logic</small></span></div><div><MessageCircle size={26}/><span><b>Friendly UI</b><small>Clean & Modern</small></span></div></div>
      <div className="search-help glass-mini"><h3><Search size={22}/> What can you search?</h3><p>AI, chatbot, project info, requirements, skills, logic, input sanitation, dictionary, examples, contact, bye.</p></div>
    </section>
    <section className="chat-card glass-panel led-frame">
      <header className="chat-header"><div><h2><Bot size={25}/> DecodeBot <span className="online-dot"></span></h2><p>{isEnded ? 'Session ended' : 'Online • Rule Engine Active'}</p></div><button className="restart-btn" onClick={restartChat}><Power size={18}/> Restart</button></header>
      <div className="quick-options">{quickOptions.map((option) => { const Icon = option.icon; return <button key={option.value} disabled={isEnded} onClick={() => sendMessage(option.value)}><Icon size={16}/> {option.label}</button>; })}</div>
      <div className="chat-window">{messages.map((message,index)=><div key={index} className={`message-row ${message.sender}`}><div className="avatar">{message.sender==='bot'?<Bot size={18}/>:<User size={18}/>}</div><div className="message-bubble">{message.text}</div></div>)}<div ref={chatEndRef}></div></div>
      <form className="input-area" onSubmit={(e)=>{e.preventDefault();sendMessage(input)}}><input value={input} onChange={(e)=>setInput(e.target.value)} disabled={isEnded} placeholder={isEnded?'Session ended. Click Restart.':'Type your message or click an option...'}/><button disabled={isEnded || !input.trim()}><Send size={20}/></button></form>
    </section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App/>);
