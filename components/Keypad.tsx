
import React from 'react';

interface KeypadProps {
  onAction: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onEvaluate: () => void;
}

const Keypad: React.FC<KeypadProps> = ({ onAction, onClear, onDelete, onEvaluate }) => {
  const buttons = [
    { label: 'C', action: onClear, color: 'text-red-400 bg-red-500/10 hover:bg-red-500/20' },
    { label: 'DEL', action: onDelete, color: 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20' },
    { label: '(', action: () => onAction('('), color: 'text-cyan-300' },
    { label: ')', action: () => onAction(')'), color: 'text-cyan-300' },
    
    { label: 'sin', action: () => onAction('sin('), color: 'text-purple-300' },
    { label: 'cos', action: () => onAction('cos('), color: 'text-purple-300' },
    { label: 'tan', action: () => onAction('tan('), color: 'text-purple-300' },
    { label: '÷', action: () => onAction('÷'), color: 'text-cyan-400 font-bold' },
    
    { label: 'log', action: () => onAction('log('), color: 'text-purple-300' },
    { label: '7', action: () => onAction('7'), color: 'text-white' },
    { label: '8', action: () => onAction('8'), color: 'text-white' },
    { label: '9', action: () => onAction('9'), color: 'text-white' },
    { label: '×', action: () => onAction('×'), color: 'text-cyan-400 font-bold' },
    
    { label: 'ln', action: () => onAction('ln('), color: 'text-purple-300' },
    { label: '4', action: () => onAction('4'), color: 'text-white' },
    { label: '5', action: () => onAction('5'), color: 'text-white' },
    { label: '6', action: () => onAction('6'), color: 'text-white' },
    { label: '-', action: () => onAction('-'), color: 'text-cyan-400 font-bold' },
    
    { label: 'π', action: () => onAction('π'), color: 'text-purple-300' },
    { label: '1', action: () => onAction('1'), color: 'text-white' },
    { label: '2', action: () => onAction('2'), color: 'text-white' },
    { label: '3', action: () => onAction('3'), color: 'text-white' },
    { label: '+', action: () => onAction('+'), color: 'text-cyan-400 font-bold' },
    
    { label: 'sqrt', action: () => onAction('sqrt('), color: 'text-purple-300' },
    { label: 'e', action: () => onAction('e'), color: 'text-purple-300' },
    { label: '0', action: () => onAction('0'), color: 'text-white' },
    { label: '.', action: () => onAction('.'), color: 'text-white' },
    { label: '=', action: onEvaluate, color: 'bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]' },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 md:gap-3">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.action}
          className={`
            ${btn.label === '=' ? 'col-span-1' : ''}
            h-12 md:h-14 rounded-xl glass mono text-base md:text-lg transition-all active:scale-95 flex items-center justify-center
            ${btn.color || 'text-slate-200 hover:bg-white/10'}
          `}
        >
          {btn.label}
        </button>
      ))}
      <button 
        onClick={() => onAction('^')}
        className="col-span-1 h-12 md:h-14 rounded-xl glass mono text-purple-300 hover:bg-white/10 flex items-center justify-center"
      >
        x<sup>y</sup>
      </button>
    </div>
  );
};

export default Keypad;
