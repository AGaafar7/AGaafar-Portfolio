
import React, { useState, useMemo, useCallback } from 'react';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import WindowContainer from './components/WindowContainer';
import Terminal from './components/Terminal';
import ProjectWindow from './components/ProjectWindow';
import { WindowState, WindowType, Project } from './types';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES, EDUCATION } from './constants';
import { Code, BookOpen, GraduationCap, Award, Star, Github, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const getInitialPosition = useCallback((offset = 0) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      x: (width / 2) - 375 + offset, 
      y: (height / 2) - 250 + offset 
    };
  }, []);

  const [windows, setWindows] = useState<WindowState[]>([
    { 
      id: 'initial-terminal', 
      type: 'terminal', 
      isOpen: true, 
      isMinimized: false, 
      isMaximized: false, 
      zIndex: 10,
      position: getInitialPosition()
    }
  ]);
  const [activeWindowId, setActiveWindowId] = useState<string>('initial-terminal');

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId('');
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindowId === id) setActiveWindowId('');
  };

  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    setWindows(prev => prev.map(w => ({
      ...w,
      zIndex: w.id === id ? 100 : 10,
      isMinimized: w.id === id ? false : w.isMinimized
    })));
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x, y } } : w));
  };

  const toggleApp = (type: WindowType, data?: any) => {
    const existingWindow = windows.find(w => 
      w.type === type && (type !== 'project' || w.data?.id === data?.id)
    );

    if (existingWindow) {
      if (existingWindow.id === activeWindowId && !existingWindow.isMinimized) {
        minimizeWindow(existingWindow.id);
      } else {
        focusWindow(existingWindow.id);
      }
    } else {
      const newId = `${type}-${Date.now()}`;
      const offset = (windows.length * 30) % 200;
      const newWindow: WindowState = {
        id: newId,
        type,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 100,
        position: getInitialPosition(offset),
        data
      };
      setWindows(prev => [...prev.map(w => ({ ...w, zIndex: 10 })), newWindow]);
      setActiveWindowId(newId);
    }
  };

  const openAppsTypes = useMemo(() => windows.map(w => w.type), [windows]);

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[#0a0a0c]">
      {/* Coder For Life Banner Background */}
      <div className="absolute inset-0 z-0 bg-[#0f0f12]">
        {/* Abstract pattern simulating the banner visual */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.1),_transparent_70%)]" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-10 blur-sm">
           <h1 className="text-[12vw] font-black tracking-tighter text-white uppercase italic">Coder For Life</h1>
        </div>
        {/* Highlight shapes */}
        <div className="absolute top-20 left-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-30" />
        <div className="absolute bottom-40 right-1/4 w-64 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20" />
      </div>
      
      <MenuBar />
      
      <div className="relative z-10 w-full h-full pt-7 pb-20">
        {windows.map(win => (
          <WindowContainer
            key={win.id}
            title={win.type === 'project' ? `Deploying :: ${win.data?.name}` : win.type.toUpperCase()}
            isActive={activeWindowId === win.id}
            isMinimized={win.isMinimized}
            position={win.position}
            onDrag={(x, y) => updateWindowPosition(win.id, x, y)}
            onClick={() => focusWindow(win.id)}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            width={win.type === 'project' ? "w-[90vw] md:w-[950px]" : "w-[90vw] md:w-[780px]"}
            height={win.type === 'project' ? "h-[85vh]" : "h-[550px]"}
          >
            {win.type === 'terminal' && (
              <Terminal onRunProject={(p) => toggleApp('project', p)} onClear={() => setWindows([])} />
            )}
            {win.type === 'project' && win.data && (
              <ProjectWindow project={win.data} />
            )}
            {win.type === 'about' && (
              <div className="p-10 text-white/80 leading-relaxed overflow-y-auto h-full bg-[#0d0d10]">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/10 flex items-center justify-center border border-white/10 shadow-xl">
                     <Code size={40} className="text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">{PERSONAL_INFO.name}</h2>
                    <p className="text-emerald-400 font-mono text-sm tracking-wide">{PERSONAL_INFO.role}</p>
                  </div>
                </div>
                <p className="mb-6 text-xl text-white/95 font-medium leading-snug">{PERSONAL_INFO.summary}</p>
                <p className="mb-8 text-base text-white/60 leading-relaxed">I am focused on the intersection of human-centric mobile interfaces and robust system architectures. From creating custom Flutter plugins to competing in global programming challenges, I view code as a medium for innovation and precision engineering.</p>
                
                <div className="grid grid-cols-2 gap-6 mt-10">
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-colors">
                    <h4 className="text-white font-semibold mb-3 flex items-center text-sm">
                      <GraduationCap size={18} className="mr-3 text-emerald-400" /> Education
                    </h4>
                    <p className="text-[11px] text-white/40 mb-1">{EDUCATION[0].institution}</p>
                    <p className="text-[13px] text-white/80 font-medium">{EDUCATION[0].degree}</p>
                  </div>
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-yellow-500/30 transition-colors">
                    <h4 className="text-white font-semibold mb-3 flex items-center text-sm">
                      <Star size={18} className="mr-3 text-yellow-400" /> Top Award
                    </h4>
                    <p className="text-[13px] text-white/80 font-medium">3rd Place @ X-Coders</p>
                    <p className="text-[11px] text-white/40">Competitive Programming Contest</p>
                  </div>
                </div>
              </div>
            )}
            {win.type === 'projects' && (
              <div className="p-10 text-white/80 overflow-y-auto h-full bg-[#0d0d10]">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-bold text-white tracking-tight flex items-center">
                    <BookOpen size={28} className="mr-4 text-emerald-400" />
                    Engineering Ledger
                  </h2>
                </div>
                <div className="grid gap-6">
                  {PROJECTS.map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => toggleApp('project', p)}
                      className="group p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all hover:-translate-y-1 shadow-md hover:shadow-emerald-500/5"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{p.name}</h3>
                        <div className="flex items-center space-x-2">
                           <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500/80 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Active</span>
                           <ExternalLink size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                        </div>
                      </div>
                      <p className="text-[15px] text-white/60 mb-5 leading-relaxed">{p.shortDescription}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.techStack.map(s => <span key={s} className="text-[10px] px-3 py-1 bg-white/5 text-white/50 rounded-lg border border-white/10">{s}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {win.type === 'resume' && (
              <div className="p-10 overflow-y-auto h-full bg-[#0d0d10]">
                <div className="max-w-2xl mx-auto border border-white/10 p-12 bg-black/50 rounded-3xl shadow-2xl backdrop-blur-md">
                  <header className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">{PERSONAL_INFO.name.toUpperCase()}</h1>
                    <div className="flex items-center justify-center space-x-3 text-emerald-400 font-mono text-xs uppercase tracking-widest">
                       <span>Flutter Specialist</span>
                       <span className="text-white/20">|</span>
                       <span>Computer Engineering</span>
                    </div>
                  </header>
                  
                  <section className="mb-10">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 border-b border-white/10 pb-3 mb-6">Expertise Vectors</h3>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-[10px] text-emerald-500/60 font-bold uppercase mb-3">Languages</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/80">
                          {SKILLS.languages.map(l => <span key={l}>{l}</span>)}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-blue-500/60 font-bold uppercase mb-3">Systems</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/80">
                          {SKILLS.technologies.map(t => <span key={t}>{t}</span>)}
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="mb-10">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 border-b border-white/10 pb-3 mb-6">Experience History</h3>
                    <div className="space-y-8">
                      {EXPERIENCES.map(exp => (
                        <div key={exp.company}>
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-base font-bold text-white">{exp.company}</h4>
                            <span className="text-[11px] text-white/30 font-mono">{exp.period}</span>
                          </div>
                          <p className="text-xs text-emerald-500/80 mb-3 font-medium tracking-wide">{exp.role}</p>
                          <ul className="space-y-2">
                            {exp.highlights.map((h, i) => (
                              <li key={i} className="flex text-[12px] text-white/50 leading-relaxed">
                                <span className="mr-3 text-emerald-500/40">»</span>{h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 border-b border-white/10 pb-3 mb-6">Core Commits</h3>
                    <div className="grid grid-cols-1 gap-4 text-[12px] text-white/60">
                      <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/5">
                        <Award size={16} className="text-yellow-500/60" />
                        <span>Winner: RoboPirates Design Contest (AASTMT)</span>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/5">
                        <Star size={16} className="text-emerald-500/60" />
                        <span>Google Cloud Arcade Facilitator Facilitator</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}
          </WindowContainer>
        ))}

        {/* Desktop Icons */}
        <div className="absolute right-8 top-20 flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center group cursor-pointer" onClick={() => toggleApp('terminal')}>
             <div className="p-4 glass rounded-[1.5rem] mac-window-shadow mb-2 group-hover:bg-white/10 group-active:scale-95 transition-all duration-200">
               <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-emerald-400 text-xs font-mono font-black">SYS</span>
               </div>
             </div>
             <span className="text-white/80 text-[11px] font-semibold drop-shadow-lg tracking-tight">Main Terminal</span>
          </div>
          
          <div className="flex flex-col items-center group cursor-pointer" onClick={() => toggleApp('resume')}>
             <div className="p-4 glass rounded-[1.5rem] mac-window-shadow mb-2 group-hover:bg-white/10 group-active:scale-95 transition-all duration-200">
               <div className="w-8 h-8 flex items-center justify-center">
                  <BookOpen size={24} className="text-white/60" />
               </div>
             </div>
             <span className="text-white/80 text-[11px] font-semibold drop-shadow-lg tracking-tight">Vitals.dat</span>
          </div>
        </div>
      </div>

      <Dock onAppClick={(app) => toggleApp(app)} openApps={openAppsTypes} />
    </div>
  );
};

export default App;
