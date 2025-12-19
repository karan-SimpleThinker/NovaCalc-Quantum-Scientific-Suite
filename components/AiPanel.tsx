
import React, { useState } from 'react';
import { analyzeExpression, solveWordProblem } from '../services/geminiService';
import { AiAnalysis } from '../types';

interface AiPanelProps {
  currentExpression: string;
}

const AiPanel: React.FC<AiPanelProps> = ({ currentExpression }) => {
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [problemText, setProblemText] = useState('');

  const handleAnalyze = async () => {
    if (!currentExpression) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeExpression(currentExpression);
      setAnalysis(result);
    } catch (e) {
      setError('Analysis offline. Quantum sync failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSolveProblem = async () => {
    if (!problemText) return;
    setLoading(true);
    setError(null);
    try {
      const result = await solveWordProblem(problemText);
      setAnalysis(result);
    } catch (e) {
      setError('Problem solver offline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex space-x-2">
        <button
          onClick={handleAnalyze}
          disabled={loading || !currentExpression}
          className="flex-1 py-3 px-4 glass rounded-xl text-cyan-400 mono text-xs uppercase tracking-widest hover:border-cyan-500/50 transition-colors disabled:opacity-50"
        >
          {loading ? 'CALCULATING...' : 'ANALYZE_EXPR'}
        </button>
      </div>

      <div className="glass rounded-xl p-4 flex-1 overflow-y-auto space-y-4 relative min-h-[300px]">
        {!analysis && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 mono text-xs text-center p-8">
            <div className="mb-4 text-3xl opacity-20">⚛</div>
            <p>AWAITING INPUT...<br/>SYNCING WITH QUANTUM NODE</p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
            <p className="mono text-[10px] text-cyan-400 animate-pulse">DECRYPTING_MATRICES...</p>
          </div>
        )}

        {analysis && !loading && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
              <h3 className="text-cyan-400 text-[10px] mono mb-1 uppercase tracking-tighter">Explainer_Output</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{analysis.explanation}</p>
            </div>
            
            <div>
              <h3 className="text-cyan-400 text-[10px] mono mb-1 uppercase tracking-tighter">Computation_Steps</h3>
              <ul className="space-y-2">
                {analysis.steps.map((step, i) => (
                  <li key={i} className="flex space-x-3 text-sm text-slate-400">
                    <span className="text-cyan-500/50 mono">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-cyan-400 text-[10px] mono mb-1 uppercase tracking-tighter">Related_Theorems</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.suggestedFormulas.map((formula, i) => (
                  <span key={i} className="px-2 py-1 bg-white/5 rounded-md text-xs text-slate-400 mono border border-white/10">
                    {formula}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <textarea
          value={problemText}
          onChange={(e) => setProblemText(e.target.value)}
          placeholder="ENTER WORD PROBLEM TO SOLVE..."
          className="w-full h-24 bg-slate-900/50 border border-white/10 rounded-xl p-3 text-sm text-slate-300 mono placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 resize-none"
        />
        <button
          onClick={handleSolveProblem}
          className="absolute bottom-2 right-2 p-2 bg-cyan-500 rounded-lg text-slate-950 hover:bg-cyan-400 transition-colors"
          title="Solve Problem"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>

      {error && <p className="text-red-400 text-[10px] mono text-center">{error}</p>}
    </div>
  );
};

export default AiPanel;
