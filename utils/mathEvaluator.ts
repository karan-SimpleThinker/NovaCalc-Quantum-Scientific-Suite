
export function evaluateExpression(expression: string): string {
  try {
    // Sanitize input
    let sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/\^/g, '**');

    // Use a safer eval approach - although still using Function for simplicity in this demo.
    // In a production app, a real math parser like math.js is better.
    const result = new Function(`return ${sanitized}`)();
    
    if (isNaN(result) || !isFinite(result)) return "Error";
    
    // Formatting result
    if (Math.abs(result) < 0.000001 && result !== 0) {
        return result.toExponential(6);
    }
    return parseFloat(result.toFixed(10)).toString();
  } catch (error) {
    console.error("Evaluation error:", error);
    return "Error";
  }
}

export function generatePoints(equation: string, range: [number, number] = [-10, 10], steps: number = 200) {
    const points: { x: number; y: number }[] = [];
    const step = (range[1] - range[0]) / steps;
    
    for (let x = range[0]; x <= range[1]; x += step) {
        try {
            // Very basic parser for graphing
            const expr = equation.replace(/x/g, `(${x})`).replace(/X/g, `(${x})`);
            const yStr = evaluateExpression(expr);
            const y = parseFloat(yStr);
            if (!isNaN(y) && isFinite(y)) {
                points.push({ x, y });
            }
        } catch (e) {
            // Skip invalid points
        }
    }
    return points;
}
