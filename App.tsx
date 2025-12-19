
import React, { useState, useEffect, useCallback } from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';
import AiPanel from './components/AiPanel';
import Grapher from './components/Grapher';
import { evaluateExpression, generatePoints } from './utils/mathEvaluator';
import { CalculationHistory } from './types';

const App: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [graphPoints, setGraphPoints] = useState<{ x: number; y: number }[]>([]);
  const [isGraphing, setIsGraphing] = useState(false);

  const handleAction = (val: string) => {
    setExpression(prev => prev + val);
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
    setGraphPoints([]);
    setIsGraphing(false);
  };

  const handleDelete = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const handleEvaluate = useCallback(() => {
    if (!expression) return;
    
    // Check if it's a function to graph (contains 'x' or 'X')
    if (expression.toLowerCase().includes('x')) {
      const points = generatePoints(expression);
      setGraphPoints(points);
      setIsGraphing(true);
      setResult("Function Graphed");
      return;
    }

    const evalResult = evaluateExpression(expression);
    setResult(evalResult);
    
    if (evalResult !== 'Error') {
      const newHistory: CalculationHistory = {
        id: Math.random().toString(36).substr(2, 9),
        expression,
        result: evalResult,
        timestamp: Date.now(),
      };
      setHistory(prev => [newHistory, ...prev].slice(0, 10));
    }
  }, [expression]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleAction(e.key);
      if (['+', '-', '*', '/'].includes(e.key)) handleAction(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
      if (e.key === 'Enter' || e.key === '=') handleEvaluate();
      if (e.key === 'Backspace') handleDelete();
      if (e.key === 'Escape') handleClear();
      if (e.key === '.') handleAction('.');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEvaluate]);

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center bg-[#020617] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[150px] rounded-full"></div>
      </div>

      <main className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 z-10">
        
        {/* Left Section: Calculator & Graph */}
        <div className="lg:col-span-7 flex flex-col">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tighter text-white mono flex items-center">
                <span className="text-cyan-400 mr-2">NOVACALC_</span> v3.0
              </h1>
              <p className="text-[10px] text-slate-500 mono uppercase tracking-[0.2em]">Quantum Scientific Computation Suite</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-slate-500 mono uppercase">Current_Sync</p>
                <p className="text-xs text-cyan-400 mono">ONLINE_NODE_7</p>
              </div>
              <div className="w-10 h-10 glass rounded-full flex items-center justify-center border-cyan-500/30">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              </div>
            </div>
          </header>

          <Display expression={expression} result={result} />
          
          <div className="flex-1">
            {isGraphing && graphPoints.length > 0 && (
              <Grapher points={graphPoints} title={expression} />
            )}
            <Keypad 
              onAction={handleAction} 
              onClear={handleClear} 
              onDelete={handleDelete} 
              onEvaluate={handleEvaluate} 
            />
          </div>

          {/* History Sidebar - Mobile Horizontal */}
          <div className="mt-8 flex flex-col space-y-3">
            <h2 className="text-[10px] text-cyan-400 mono uppercase tracking-widest">History_Logs</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {history.length === 0 ? (
                <p className="text-slate-600 text-xs mono">NO RECENT CALCULATIONS_</p>
              ) : (
                history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setExpression(item.expression);
                      setResult(item.result);
                    }}
                    className="flex-shrink-0 glass p-3 rounded-lg text-left hover:border-cyan-500/30 transition-all min-w-[140px]"
                  >
                    <p className="text-[10px] text-slate-500 truncate mono mb-1">{item.expression}</p>
                    <p className="text-sm text-white mono font-bold">{item.result}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Section: AI Analysis & Insights */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="flex items-center space-x-2 mb-4">
             <div className="w-2 h-2 rounded-full bg-purple-500"></div>
             <h2 className="text-sm font-bold text-white mono uppercase tracking-widest">Neural_Sync Engine</h2>
          </div>
          <AiPanel currentExpression={expression} />
          
          <div className="mt-8 glass rounded-xl p-4 border-slate-800">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-[10px] text-cyan-400 mono uppercase">System_Metrics</h3>
               <span className="text-[10px] text-slate-600 mono">v3.0.4-LATEST</span>
             </div>
             <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 mono">MEM_ALLOC</span>
                  <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-cyan-500"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 mono">CPU_LOAD</span>
                  <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-purple-500"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 mono">QUANTUM_STABILITY</span>
                  <span className="text-[10px] text-green-400 mono">99.98%</span>
                </div>
             </div>
          </div>
        </div>

      </main>

      {/* Decorative Scanline Overlays */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 mix-blend-overlay opacity-30 select-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      </div>
    </div>
  );
};

export default App;
