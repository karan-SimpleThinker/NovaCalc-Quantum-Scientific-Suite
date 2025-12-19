
export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface GraphData {
  points: { x: number; y: number }[];
  equation: string;
}

export type AiAnalysis = {
  explanation: string;
  steps: string[];
  suggestedFormulas: string[];
  plotData?: { x: number; y: number }[];
};
