
import React from 'react';
import { Terminal, User, Briefcase, FileText, Github, Linkedin } from 'lucide-react';
import { WindowType } from '../types';

interface DockProps {
  onAppClick: (app: WindowType) => void;
  openApps: WindowType[];
}

const DockIcon: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; isOpen?: boolean }> = ({ icon, label, onClick, isOpen }) => (
  <div 
    className="group relative flex flex-col items-center"
    onClick={onClick}
  >
    <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-150 bg-black/60 backdrop-blur-md text-white text-[12px] font-medium px-3 py-1 rounded-lg border border-white/20 whitespace-nowrap pointer-events-none">
      {label}
    </div>
    <div className="relative p-2.5 rounded-[13px] transition-all duration-300 ease-out hover:scale-[1.2] hover:-translate-y-4 cursor-pointer active:scale-95 active:translate-y-0 group-hover:mx-2">
      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-b from-white/15 to-white/5 rounded-[13px] border border-white/20 shadow-lg backdrop-blur-xl group-hover:shadow-2xl transition-all duration-300">
        {icon}
      </div>
      {isOpen && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/70 rounded-full" />
      )}
    </div>
  </div>
);

const Dock: React.FC<DockProps> = ({ onAppClick, openApps }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-end h-20 z-[1000]">
      <div className="flex items-center px-3 py-1 space-x-0.5 glass-dock rounded-[24px] border border-white/20 shadow-2xl relative overflow-visible">
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        
        <DockIcon 
          icon={<Terminal size={28} strokeWidth={2} className="text-[#32D74B]" />} 
          label="Terminal" 
          onClick={() => onAppClick('terminal')} 
          isOpen={openApps.includes('terminal')}
        />
        <DockIcon 
          icon={<User size={28} strokeWidth={2} className="text-[#0A84FF]" />} 
          label="About Me" 
          onClick={() => onAppClick('about')} 
          isOpen={openApps.includes('about')}
        />
        <DockIcon 
          icon={<Briefcase size={28} strokeWidth={2} className="text-[#FF9F0A]" />} 
          label="Projects" 
          onClick={() => onAppClick('projects')} 
          isOpen={openApps.includes('projects')}
        />
        <DockIcon 
          icon={<FileText size={28} strokeWidth={2} className="text-[#FF375F]" />} 
          label="Resume" 
          onClick={() => onAppClick('resume')} 
          isOpen={openApps.includes('resume')}
        />
        
        <div className="w-[1px] h-10 bg-white/20 mx-3 self-center" />
        
        <DockIcon 
          icon={<Github size={28} strokeWidth={1.5} className="text-white" />} 
          label="GitHub" 
          onClick={() => window.open('https://github.com/agaafar7', '_blank')} 
        />
        <DockIcon 
          icon={<Linkedin size={28} strokeWidth={1.5} className="text-[#007AFF]" />} 
          label="LinkedIn" 
          onClick={() => window.open('https://linkedin.com/in/agaafar7', '_blank')} 
        />
      </div>
    </div>
  );
};

export default Dock;
