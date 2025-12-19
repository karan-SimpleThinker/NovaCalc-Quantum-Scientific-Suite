
import React from 'react';

interface DisplayProps {
  expression: string;
  result: string;
}

const Display: React.FC<DisplayProps> = ({ expression, result }) => {
  return (
    <div className="w-full p-6 mb-4 glass rounded-2xl flex flex-col items-end justify-end overflow-hidden relative">
      <div className="scanline"></div>
      <div className="text-cyan-400/60 mono text-sm mb-1 truncate w-full text-right h-6">
        {expression || 'Ready_'}
      </div>
      <div className="text-4xl md:text-5xl font-bold mono neon-text text-white truncate w-full text-right tracking-tight">
        {result || '0'}
      </div>
      <div className="absolute top-2 left-3 flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-red-500/50 animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-cyan-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-purple-500/50"></div>
      </div>
    </div>
  );
};

export default Display;
