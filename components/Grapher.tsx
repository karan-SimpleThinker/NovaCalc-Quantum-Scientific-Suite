
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GrapherProps {
  points: { x: number; y: number }[];
  title?: string;
}

const Grapher: React.FC<GrapherProps> = ({ points, title }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || points.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const xExtent = d3.extent(points, d => d.x) as [number, number];
    const yExtent = d3.extent(points, d => d.y) as [number, number];

    const xScale = d3.scaleLinear()
      .domain([xExtent[0] || -10, xExtent[1] || 10])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([yExtent[0] || -10, yExtent[1] || 10])
      .range([height - margin.bottom, margin.top]);

    // Grid lines
    svg.append("g")
      .attr("class", "grid")
      .attr("stroke", "rgba(255,255,255,0.05)")
      .call(d3.axisBottom(xScale).tickSize(-height + margin.top + margin.bottom).tickFormat(() => ""));
    
    svg.append("g")
      .attr("class", "grid")
      .attr("stroke", "rgba(255,255,255,0.05)")
      .call(d3.axisLeft(yScale).tickSize(-width + margin.left + margin.right).tickFormat(() => ""));

    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("color", "rgba(255,255,255,0.3)")
      .call(d3.axisBottom(xScale).ticks(5));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("color", "rgba(255,255,255,0.3)")
      .call(d3.axisLeft(yScale).ticks(5));

    // Line
    const line = d3.line<{ x: number; y: number }>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(points)
      .attr("fill", "none")
      .attr("stroke", "#22d3ee")
      .attr("stroke-width", 2)
      .attr("d", line)
      .attr("stroke-dasharray", function() { return this.getTotalLength(); })
      .attr("stroke-dashoffset", function() { return this.getTotalLength(); })
      .transition()
      .duration(1500)
      .attr("stroke-dashoffset", 0);

  }, [points]);

  return (
    <div className="w-full h-48 md:h-64 glass rounded-2xl p-4 overflow-hidden mb-4 border-cyan-500/20 border">
      <div className="text-xs text-cyan-400 mb-2 mono flex justify-between">
        <span>QUANTUM_VISUALIZER // {title || 'AUTO'}</span>
        <span className="animate-pulse">● LIVE_FEED</span>
      </div>
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default Grapher;
