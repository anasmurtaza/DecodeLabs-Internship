import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Sparkles,
  Brain,
  Cpu,
  Code2,
  Database,
  Cloud,
  Shield,
  Globe,
  Bot,
  Star,
  RotateCcw,
  Zap,
  Target,
  Layers,
  CheckCircle2,
  Gauge,
} from 'lucide-react';
import './style.css';

const interests = [
  { id: 'python', label: 'Python', icon: Code2 },
  { id: 'ai', label: 'Artificial Intelligence', icon: Brain },
  { id: 'ml', label: 'Machine Learning', icon: Cpu },
  { id: 'web', label: 'Web Development', icon: Globe },
  { id: 'data', label: 'Data Science', icon: Database },
  { id: 'cloud', label: 'Cloud Computing', icon: Cloud },
  { id: 'cyber', label: 'Cyber Security', icon: Shield },
  { id: 'automation', label: 'Automation', icon: Zap },
];

const recommendationItems = [
  {
    title: 'Python for AI Beginners',
    category: 'Course',
    level: 'Beginner',
    tags: ['python', 'ai', 'ml'],
    description: 'Start your AI journey with Python basics, logic building, and small AI projects.',
  },
  {
    title: 'Machine Learning Starter Path',
    category: 'Learning Path',
    level: 'Intermediate',
    tags: ['ml', 'python', 'data'],
    description: 'Learn supervised learning, classification, model training, and evaluation.',
  },
  {
    title: 'AI Recommendation Systems Mini Project',
    category: 'Project',
    level: 'Intermediate',
    tags: ['ai', 'ml', 'data'],
    description: 'Build recommendation logic using user preferences, similarity scoring, and ranking.',
  },
  {
    title: 'React Frontend Developer Toolkit',
    category: 'Course',
    level: 'Beginner',
    tags: ['web', 'automation'],
    description: 'Create modern user interfaces with React, Vite, components, and state management.',
  },
  {
    title: 'Data Analytics with Python',
    category: 'Course',
    level: 'Intermediate',
    tags: ['python', 'data'],
    description: 'Analyze datasets, visualize patterns, and prepare data for AI models.',
  },
  {
    title: 'Cloud AI Deployment Basics',
    category: 'Guide',
    level: 'Advanced',
    tags: ['cloud', 'ai', 'automation'],
    description: 'Understand how AI apps can be deployed, scaled, and monitored in the cloud.',
  },
  {
    title: 'Cyber Security Essentials for Developers',
    category: 'Course',
    level: 'Beginner',
    tags: ['cyber', 'web', 'cloud'],
    description: 'Learn authentication, secure coding, network basics, and protection practices.',
  },
  {
    title: 'Automation with Python Scripts',
    category: 'Project',
    level: 'Beginner',
    tags: ['automation', 'python'],
    description: 'Automate repetitive tasks using Python logic, file handling, and scheduling concepts.',
  },
  {
    title: 'Full Stack AI Web App',
    category: 'Capstone Idea',
    level: 'Advanced',
    tags: ['web', 'ai', 'python', 'cloud'],
    description: 'Combine frontend, backend, AI logic, and deployment into one portfolio project.',
  },
  {
    title: 'Data-Driven Security Monitoring',
    category: 'Project',
    level: 'Advanced',
    tags: ['data', 'cyber', 'automation'],
    description: 'Use data patterns to flag unusual activity and recommend security actions.',
  },
];

function calculateScore(userTags, itemTags) {
  if (userTags.length === 0) return 0;
  const overlap = itemTags.filter((tag) => userTags.includes(tag)).length;
  const union = new Set([...userTags, ...itemTags]).size;
  const jaccardScore = overlap / union;
  const preferenceBoost = overlap / userTags.length;
  return Math.round(((jaccardScore * 0.65) + (preferenceBoost * 0.35)) * 100);
}

function App() {
  const [selected, setSelected] = useState(['python', 'ai']);
  const [topN, setTopN] = useState(5);

  const recommendations = useMemo(() => {
    return recommendationItems
      .map((item) => ({
        ...item,
        score: calculateScore(selected, item.tags),
        matchedTags: item.tags.filter((tag) => selected.includes(tag)),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);
  }, [selected, topN]);

  function toggleInterest(id) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function reset() {
    setSelected(['python', 'ai']);
    setTopN(5);
  }

  return (
    <main className="app">
      <div className="grid-bg" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />

      <section className="hero glass neon-border">
        <div className="brand">
          <div className="logo"><Bot size={34} /></div>
          <div>
            <p className="eyebrow"><Sparkles size={16} /> DecodeLabs AI Project 3</p>
            <h1>AI Recommendation Logic</h1>
          </div>
        </div>
        <p className="subtitle">
          A professional content-based recommendation system that maps user interests to item attributes using similarity logic and dynamic ranking.
        </p>
        <div className="flow">
          <div><Target size={22} /><span>User Preferences</span></div>
          <div><Layers size={22} /><span>Similarity Engine</span></div>
          <div><Star size={22} /><span>Top-N Results</span></div>
        </div>
      </section>

      <section className="workspace">
        <div className="selector glass neon-border">
          <div className="section-title">
            <h2><Brain size={22} /> Select Your Interests</h2>
            <button onClick={reset}><RotateCcw size={16} /> Reset</button>
          </div>
          <p className="hint">Choose multiple interests. The engine will compare your selected tags with each item and rank the best matches.</p>

          <div className="interest-grid">
            {interests.map((interest) => {
              const Icon = interest.icon;
              const active = selected.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  className={active ? 'interest active' : 'interest'}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <Icon size={21} />
                  <span>{interest.label}</span>
                  {active && <CheckCircle2 size={18} className="check" />}
                </button>
              );
            })}
          </div>

          <div className="control-card">
            <label>Number of Recommendations: <strong>{topN}</strong></label>
            <input
              type="range"
              min="3"
              max="8"
              value={topN}
              onChange={(event) => setTopN(Number(event.target.value))}
            />
          </div>

          <div className="logic-box">
            <h3><Gauge size={18} /> Recommendation Formula</h3>
            <p>Score = tag overlap + preference boost. Higher overlap means stronger recommendation alignment.</p>
          </div>
        </div>

        <div className="results glass neon-border">
          <div className="section-title">
            <h2><Star size={22} /> Recommended for You</h2>
            <span className="badge">{recommendations.length} Matches</span>
          </div>

          {recommendations.length === 0 ? (
            <div className="empty-state">
              <Bot size={44} />
              <h3>No recommendations yet</h3>
              <p>Select at least one interest to generate a personalized list.</p>
            </div>
          ) : (
            <div className="recommendation-list">
              {recommendations.map((item, index) => (
                <article key={item.title} className="recommendation-card">
                  <div className="rank">#{index + 1}</div>
                  <div className="rec-content">
                    <div className="rec-head">
                      <h3>{item.title}</h3>
                      <span>{item.score}% Match</span>
                    </div>
                    <p>{item.description}</p>
                    <div className="meta-row">
                      <small>{item.category}</small>
                      <small>{item.level}</small>
                      <small>Matched: {item.matchedTags.join(', ')}</small>
                    </div>
                    <div className="progress"><div style={{ width: `${item.score}%` }} /></div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
