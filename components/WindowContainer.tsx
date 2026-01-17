
import React, { useState, useCallback, useEffect } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowContainerProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  children: React.ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  onClick: () => void;
  onDrag: (x: number, y: number) => void;
  position: { x: number; y: number };
  width?: string;
  height?: string;
}

const WindowContainer: React.FC<WindowContainerProps> = ({ 
  title, 
  onClose, 
  onMinimize,
  children, 
  isActive, 
  isMinimized,
  onClick,
  onDrag,
  position,
  width = "w-[800px]",
  height = "h-[500px]"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    onClick();
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      const clampedY = Math.max(28, newY);
      onDrag(newX, clampedY);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onDrag]);

  if (isMinimized) return null;

  return (
    <div 
      onClick={onClick}
      style={{ 
        left: position.x, 
        top: position.y,
        transform: 'none',
      }}
      className={`absolute flex flex-col glass rounded-[14px] overflow-hidden ${width} ${height} ${isActive ? 'active-window-glow z-50 scale-100' : 'z-10 scale-[0.99] brightness-75 mac-window-shadow'} transition-transform duration-300 ease-out ${isDragging ? 'transition-none cursor-grabbing opacity-90' : 'cursor-default'}`}
    >
      <div 
        onMouseDown={handleMouseDown}
        className="h-[44px] bg-white/[0.03] flex items-center justify-between px-5 border-b border-white/10 shrink-0 cursor-grab active:cursor-grabbing"
      >
        <div className="flex space-x-2.5 w-24 window-controls">
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-[13px] h-[13px] rounded-full bg-[#ff5f56] border border-black/10 flex items-center justify-center group">
            <X size={8} className="text-black/60 hidden group-hover:block" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-[13px] h-[13px] rounded-full bg-[#ffbd2e] border border-black/10 flex items-center justify-center group">
            <Minus size={8} className="text-black/60 hidden group-hover:block" />
          </button>
          <button className="w-[13px] h-[13px] rounded-full bg-[#27c93f] border border-black/10 flex items-center justify-center group">
            <Maximize2 size={8} className="text-black/60 hidden group-hover:block" />
          </button>
        </div>
        <div className="text-[12px] font-bold text-white/50 select-none pointer-events-none tracking-widest uppercase">{title}</div>
        <div className="w-24" />
      </div>
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};

export default WindowContainer;
