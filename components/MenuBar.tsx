
import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Battery, Search, Terminal as TerminalIcon, Power, Info, RefreshCw } from 'lucide-react';

interface MenuItemProps {
  label: string;
  items: { label: string; icon?: React.ReactNode; onClick?: () => void; divider?: boolean }[];
}

const MenuDropdown: React.FC<MenuItemProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative h-full flex items-center" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1 rounded-md transition-colors text-[13px] font-medium outline-none ${isOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
      >
        {label}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 glass rounded-lg border border-white/10 shadow-2xl overflow-hidden py-1 z-[2000] animate-in fade-in zoom-in duration-75">
          {items.map((item, idx) => (
            item.divider ? (
              <div key={idx} className="h-[1px] bg-white/10 my-1 mx-2" />
            ) : (
              <button
                key={idx}
                onClick={() => { item.onClick?.(); setIsOpen(false); }}
                className="w-full text-left px-4 py-1.5 hover:bg-blue-600 flex items-center justify-between group"
              >
                <span className="text-[13px] text-white/90 group-hover:text-white">{item.label}</span>
                {item.icon && <span className="opacity-50 group-hover:opacity-100">{item.icon}</span>}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};

const MenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const systemMenu = [
    { label: 'About DevOS', icon: <Info size={14} /> },
    { divider: true },
    { label: 'System Preferences...' },
    { label: 'App Store...' },
    { divider: true },
    { label: 'Restart Shell', icon: <RefreshCw size={14} />, onClick: () => window.location.reload() },
    { label: 'Shut Down...', icon: <Power size={14} /> },
  ];

  const fileMenu = [
    { label: 'New Window', icon: <span className="text-[10px]">⌘N</span> },
    { label: 'New Tab', icon: <span className="text-[10px]">⌘T</span> },
    { divider: true },
    { label: 'Close Window', icon: <span className="text-[10px]">⌘W</span> },
  ];

  return (
    <div className="h-7 glass w-full flex items-center justify-between px-2 fixed top-0 z-[1000] text-white/90 select-none">
      <div className="flex items-center space-x-1 h-full">
        <div className="px-3 flex items-center">
          <TerminalIcon size={16} className="text-emerald-400" />
        </div>
        <MenuDropdown label="DevOS" items={systemMenu} />
        <MenuDropdown label="File" items={fileMenu} />
        <MenuDropdown label="Edit" items={[
          { label: 'Undo', icon: <span className="text-[10px]">⌘Z</span> },
          { label: 'Redo', icon: <span className="text-[10px]">⇧⌘Z</span> },
          { divider: true },
          { label: 'Cut' }, { label: 'Copy' }, { label: 'Paste' }
        ]} />
        <MenuDropdown label="View" items={[
          { label: 'Toggle Full Screen' },
          { label: 'Show Sidebar' }
        ]} />
        <MenuDropdown label="Help" items={[
          { label: 'Terminal Help' },
          { label: 'Architecture Docs' }
        ]} />
      </div>
      <div className="flex items-center space-x-4 px-4 h-full">
        <Wifi size={15} strokeWidth={2} />
        <div className="flex items-center space-x-1">
          <span className="text-[11px] font-medium">85%</span>
          <Battery size={16} strokeWidth={2} className="rotate-0" />
        </div>
        <Search size={15} strokeWidth={2} />
        <span className="text-[13px] font-medium tracking-tight">{time}</span>
      </div>
    </div>
  );
};

export default MenuBar;
