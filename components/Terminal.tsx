
import React, { useState, useRef, useEffect } from 'react';
import { TerminalLine, Project } from '../types';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES, EDUCATION } from '../constants';
import { translateToCommand, getCommandSuggestion, getAIProjectDeepDive } from '../services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';

interface TerminalProps {
  onRunProject: (project: Project) => void;
  onClear: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onRunProject, onClear }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'DevOS Kernel v1.2.0-stable (Build: 2024.03.15)' },
    { type: 'output', content: 'User Ahmed Gaafar authenticated. System ready.' },
    { type: 'output', content: 'Type "help" to see available commands or describe what you want in plain English.' },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Handle clicking anywhere in terminal to focus input
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const addLine = (type: TerminalLine['type'], content: string) => {
    setHistory(prev => [...prev, { type, content }]);
  };

  const handleCommand = async (cmd: string) => {
    const raw = cmd.trim();
    if (!raw) return;

    addLine('input', raw);
    setInput('');
    setIsProcessing(true);

    if (await executeDirectCommand(raw)) {
      setIsProcessing(false);
      return;
    }

    try {
      const translated = await translateToCommand(raw);
      if (translated && translated !== 'unknown' && translated !== raw.toLowerCase()) {
        addLine('ai', `✨ AI translation: executing "${translated}"...`);
        await executeDirectCommand(translated);
      } else {
        const suggestion = await getCommandSuggestion(raw);
        addLine('error', `Command not found: "${raw}"`);
        addLine('output', `Did you mean: ${suggestion}?`);
      }
    } catch (err) {
      addLine('error', "AI Reasoning Engine error. Falling back to local shell.");
    }

    setIsProcessing(false);
  };

  const executeDirectCommand = async (rawCmd: string): Promise<boolean> => {
    const parts = rawCmd.toLowerCase().split(' ');
    const cmd = parts[0];

    switch (cmd) {
      case 'help':
        addLine('output', `DevOS Command Reference:
  whoami       - Technical summary of Ahmed
  education    - Academic background & honors
  experience   - Professional history & organizations
  skills       - Tech stack & proficiency
  projects     - Engineering portfolio
  project run <id> - Launch visual deployment
  project describe <id> [--ai] - Detailed specs
  clear        - Flush terminal buffer
  contact      - Professional links`);
        return true;

      case 'whoami':
        addLine('output', `${PERSONAL_INFO.name}\n${PERSONAL_INFO.role}\n\n${PERSONAL_INFO.summary}`);
        return true;

      case 'education':
        EDUCATION.forEach(edu => {
          addLine('output', `[${edu.period}] ${edu.institution}\n${edu.degree}\n> ${edu.notable}\n`);
        });
        return true;

      case 'experience':
        EXPERIENCES.forEach(exp => {
          addLine('output', `[${exp.period}] ${exp.role} at ${exp.company}`);
          exp.highlights.forEach(h => addLine('output', `  ▹ ${h}`));
          addLine('output', '');
        });
        return true;

      case 'skills':
        addLine('output', `Languages: ${SKILLS.languages.join(', ')}`);
        addLine('output', `Technologies: ${SKILLS.technologies.join(', ')}`);
        addLine('output', `Architectures: ${SKILLS.architectures.join(', ')}`);
        return true;

      case 'projects':
      case 'project':
        if (parts[1] === 'list' || parts.length === 1) {
          addLine('output', `Portfolio Items:`);
          PROJECTS.forEach(p => addLine('output', `  - ${p.id}: ${p.shortDescription}`));
          return true;
        }
        if (parts[1] === 'describe') {
          const name = parts[2];
          const project = PROJECTS.find(p => p.id === name);
          if (project) {
            addLine('output', `\nProject: ${project.name}\n---`);
            addLine('output', `Overview: ${project.fullDescription}`);
            addLine('output', `Stack: ${project.techStack.join(', ')}`);
            if (rawCmd.includes('--ai')) {
               addLine('ai', "🤖 Analyzing architectural depth with Gemini...");
               const deepDive = await getAIProjectDeepDive(project.id);
               addLine('ai', deepDive);
            }
          } else addLine('error', `Project "${name}" not found.`);
          return true;
        }
        if (parts[1] === 'run') {
          const name = parts[2];
          const project = PROJECTS.find(p => p.id === name);
          if (project) {
            onRunProject(project);
            addLine('output', `Initiating visual container for ${project.name}...`);
          } else addLine('error', `Project "${name}" not found.`);
          return true;
        }
        return false;

      case 'clear':
        setHistory([]);
        return true;

      case 'contact':
        addLine('output', `Email: ${PERSONAL_INFO.email}\nGitHub: ${PERSONAL_INFO.socials.github}\nLinkedIn: ${PERSONAL_INFO.socials.linkedin}`);
        return true;

      default:
        return false;
    }
  };

  return (
    <div 
      className="flex flex-col h-full terminal-font text-[14px] leading-relaxed text-white/95 p-5 overflow-hidden cursor-text"
      onClick={handleTerminalClick}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1.5 mb-2 scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className={`flex items-start ${line.type === 'error' ? 'text-rose-400' : line.type === 'ai' ? 'text-emerald-300 italic opacity-90' : line.type === 'input' ? 'text-emerald-400 font-medium' : ''}`}>
            {line.type === 'input' && <span className="mr-3 opacity-70">dev@agaafar:~$</span>}
            {line.type === 'ai' && <Sparkles size={14} className="mr-3 mt-1.5 flex-shrink-0 text-emerald-400" />}
            <pre className="whitespace-pre-wrap font-[inherit]">{line.content}</pre>
          </div>
        ))}
        {isProcessing && (
          <div className="flex items-center text-emerald-400/60 animate-pulse">
            <Loader2 size={14} className="mr-3 animate-spin" />
            <span>AI Processing System Call...</span>
          </div>
        )}
      </div>
      <form 
        onSubmit={(e) => { e.preventDefault(); handleCommand(input); }}
        className="flex items-center border-t border-white/5 pt-3"
      >
        <span className="text-emerald-400/70 mr-3 shrink-0 font-medium">dev@agaafar:~$</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isProcessing}
          className="bg-transparent border-none outline-none flex-1 text-white caret-emerald-400 selection:bg-emerald-500/30"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
};

export default Terminal;
