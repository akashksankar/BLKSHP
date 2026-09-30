/**
 * BLACK S.H.E.E.P. - Section 17: Subject Radar Visualization
 * Light Theme: Pure White (#FFFFFF), Deep Black (#000000), Scientific Red (#DC2626)
 * Large animated radar visualization with 8 behavioral dimensions
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass } from 'lucide-react';

interface RadarDimension {
  name: string;
  value: number;
}

interface SubjectRadarChartProps {
  dimensions?: Array<{ name: string; value: number }>;
  subjectCode?: string;
}

const DEFAULT_DIMENSIONS: RadarDimension[] = [
  { name: 'Extroversion', value: 92 },
  { name: 'Roasting Tendency', value: 95 },
  { name: 'Rejection Sensitivity', value: 90 },
  { name: 'Attention Seeking', value: 94 },
  { name: 'Backward Retreat', value: 88 },
  { name: 'Outspokenness', value: 96 },
  { name: 'Political Intensity', value: 91 },
  { name: 'Faculty Familiarity', value: 82 },
];

export const SubjectRadarChart: React.FC<SubjectRadarChartProps> = ({
  dimensions,
  subjectCode = 'HX-001',
}) => {
  const [timeFilter, setTimeFilter] = useState<'CURRENT' | '7_DAYS' | '30_DAYS' | 'EXPERIMENT'>('CURRENT');

  const getModifiedDimensions = (): RadarDimension[] => {
    const base = dimensions && dimensions.length >= 8 ? dimensions.slice(0, 8) : DEFAULT_DIMENSIONS;
    if (timeFilter === 'CURRENT') return base;
    if (timeFilter === '7_DAYS') {
      return base.map((d) => ({
        name: d.name,
        value: Math.max(15, Math.min(98, Math.round(d.value * 0.92 + 4))),
      }));
    }
    if (timeFilter === '30_DAYS') {
      return base.map((d) => ({
        name: d.name,
        value: Math.max(15, Math.min(98, Math.round(d.value * 0.85 + 10))),
      }));
    }
    // EXPERIMENT HISTORY: stress & retreat spikes
    return base.map((d) => {
      if (d.name.includes('Retreat') || d.name.includes('Sensitivity')) return { name: d.name, value: 98 };
      if (d.name.includes('Roasting')) return { name: d.name, value: 30 }; // silenced
      return { name: d.name, value: d.value };
    });
  };

  const activeData = getModifiedDimensions();

  const size = 320;
  const center = size / 2;
  const radius = 115;
  const angleStep = (Math.PI * 2) / activeData.length;

  const points = activeData.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (d.value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, name: d.name, value: d.value };
  });

  const polygonPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center p-4 bg-white/95 border border-black/15 rounded-xs select-none font-mono-data shadow-sm relative">
      {/* HUD Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#DC2626]" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#DC2626]" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#DC2626]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#DC2626]" />

      {/* Header & Time Filters */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between pb-3 mb-3 border-b border-black/10 gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#DC2626]" />
          <span className="font-display text-lg text-black tracking-wider">
            BEHAVIORAL MATRIX // {subjectCode}
          </span>
        </div>

        {/* Time Tabs */}
        <div className="flex items-center gap-1 text-[9px]">
          {(['CURRENT', '7_DAYS', '30_DAYS', 'EXPERIMENT'] as const).map((tab) => {
            const label =
              tab === 'CURRENT'
                ? 'CURRENT'
                : tab === '7_DAYS'
                ? '7 DAYS'
                : tab === '30_DAYS'
                ? '30 DAYS'
                : 'EXP HISTORY';
            const isActive = timeFilter === tab;

            return (
              <button
                key={tab}
                onClick={() => setTimeFilter(tab)}
                className={`px-2 py-0.5 rounded-xs border font-bold cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#DC2626] text-white border-[#DC2626]'
                    : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:text-black hover:border-black/30'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Radar Chart */}
      <div className="relative py-2">
        <svg width={size} height={size} className="overflow-visible">
          {/* Concentric Calibration Rings */}
          {[0.25, 0.5, 0.75, 1].map((level, idx) => (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={radius * level}
              fill="none"
              stroke={idx === 3 ? '#DC2626' : '#000000'}
              strokeOpacity={idx === 3 ? 0.3 : 0.1}
              strokeWidth="1"
              strokeDasharray={idx < 3 ? '2 2' : 'none'}
            />
          ))}

          {/* Radial Spokes */}
          {activeData.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#000000"
                strokeOpacity="0.12"
                strokeWidth="1"
              />
            );
          })}

          {/* Animated Polygon */}
          <motion.path
            d={polygonPath}
            fill="rgba(220, 38, 38, 0.16)"
            stroke="#DC2626"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Vertices & Technical Labels */}
          {points.map((p, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelDist = radius + 22;
            const lx = center + labelDist * Math.cos(angle);
            const ly = center + labelDist * Math.sin(angle);

            return (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill="#DC2626"
                  stroke="#000000"
                  strokeWidth="1.2"
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[9px] font-mono-data fill-black font-semibold uppercase tracking-wider"
                >
                  {p.name.split(' ')[0]} ({p.value})
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend & Calibration Footnote */}
      <div className="w-full flex items-center justify-between text-[10px] text-zinc-600 pt-2 border-t border-black/10 mt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
          <span className="text-[#DC2626] font-bold">CALIBRATION RANGE: 0 - 100</span>
        </span>
        <span>SAMPLE TIMEFRAME: {timeFilter.replace('_', ' ')}</span>
      </div>
    </div>
  );
};
