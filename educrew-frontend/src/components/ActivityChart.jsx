// src/components/ActivityChart.jsx - Multi-View Activity Chart Component
import React, { useState, useMemo } from 'react';

const Icons = {
  barChart: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  lineChart: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  areaChart: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  radarChart: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  calendar: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  chevronLeft: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  chevronRight: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
};

// --- Mock Data Generators ---
const generateWeeklyData = () => [
  { day: 'Mon', study: 4, code: 2, presentations: 1, total: 7 },
  { day: 'Tue', study: 3, code: 4, presentations: 0, total: 7 },
  { day: 'Wed', study: 2, code: 3, presentations: 2, total: 7 },
  { day: 'Thu', study: 5, code: 1, presentations: 1, total: 7 },
  { day: 'Fri', study: 3, code: 5, presentations: 0, total: 8 },
  { day: 'Sat', study: 6, code: 2, presentations: 1, total: 9 },
  { day: 'Sun', study: 2, code: 1, presentations: 0, total: 3 },
];

const generateMonthlyData = () => [
  { day: 'Week 1', study: 15, code: 12, presentations: 5, total: 32 },
  { day: 'Week 2', study: 18, code: 14, presentations: 3, total: 35 },
  { day: 'Week 3', study: 12, code: 20, presentations: 7, total: 39 },
  { day: 'Week 4', study: 22, code: 10, presentations: 4, total: 36 },
];

const generateAllTimeData = () => [
  { day: 'Jan', study: 45, code: 38, presentations: 12, total: 95 },
  { day: 'Feb', study: 52, code: 41, presentations: 15, total: 108 },
  { day: 'Mar', study: 48, code: 55, presentations: 10, total: 113 },
  { day: 'Apr', study: 60, code: 42, presentations: 18, total: 120 },
  { day: 'May', study: 55, code: 48, presentations: 14, total: 117 },
  { day: 'Jun', study: 62, code: 50, presentations: 20, total: 132 },
];

// --- Chart Components ---

// 1. Animated Stacked Bar Chart
const BarChartView = ({ data, maxValue }) => {
  return (
    <div className="flex items-end justify-between h-64 px-2 pb-2 relative gap-2">
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border-t border-slate-600 w-full" />
        ))}
      </div>

      {data.map((item, idx) => {
        const totalHeight = Math.max((item.total / maxValue) * 100, 5);
        
        return (
          <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group relative">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap z-20 pointer-events-none shadow-xl transform translate-y-2 group-hover:translate-y-0 min-w-[120px]">
              <div className="font-bold mb-2 border-b border-slate-600 pb-1 text-sm">{item.day}</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Study</span>
                  <span className="font-mono">{item.study}h</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Code</span>
                  <span className="font-mono">{item.code}h</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Pres</span>
                  <span className="font-mono">{item.presentations}h</span>
                </div>
              </div>
              <div className="mt-2 pt-1 border-t border-slate-600 flex justify-between font-bold text-yellow-400">
                <span>Total</span>
                <span>{item.total}h</span>
              </div>
            </div>

            {/* Bar Container */}
            <div 
              className="w-full max-w-[50px] relative flex flex-col justify-end rounded-t-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:brightness-110 cursor-pointer"
              style={{ height: `${totalHeight}%` }}
            >
              {/* Stacked Segments */}
              <div className="w-full bg-emerald-400 transition-all duration-700 ease-out hover:bg-emerald-300" style={{ height: `${(item.presentations / item.total) * 100}%`, animationDelay: `${idx * 0.05}s` }} />
              <div className="w-full bg-purple-500 transition-all duration-700 ease-out hover:bg-purple-400" style={{ height: `${(item.code / item.total) * 100}%`, animationDelay: `${idx * 0.05 + 0.1}s` }} />
              <div className="w-full bg-blue-500 transition-all duration-700 ease-out hover:bg-blue-400" style={{ height: `${(item.study / item.total) * 100}%`, animationDelay: `${idx * 0.05 + 0.2}s` }} />
              
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
            </div>

            <span className="text-xs font-semibold text-slate-400 mt-3 group-hover:text-blue-600 transition-colors">{item.day}</span>
          </div>
        );
      })}
    </div>
  );
};

// 2. Smooth Line Chart
const LineChartView = ({ data, maxValue }) => {
  const svgWidth = 800;
  const svgHeight = 300;
  const padding = 40;
  
  const points = {
    study: data.map((d, i) => ({
      x: padding + (i * (svgWidth - 2 * padding) / (data.length - 1)),
      y: svgHeight - padding - (d.study / maxValue) * (svgHeight - 2 * padding)
    })),
    code: data.map((d, i) => ({
      x: padding + (i * (svgWidth - 2 * padding) / (data.length - 1)),
      y: svgHeight - padding - (d.code / maxValue) * (svgHeight - 2 * padding)
    })),
    presentations: data.map((d, i) => ({
      x: padding + (i * (svgWidth - 2 * padding) / (data.length - 1)),
      y: svgHeight - padding - (d.presentations / maxValue) * (svgHeight - 2 * padding)
    }))
  };

  const createPath = (points) => {
    if (points.length === 0) return '';
    return points.reduce((acc, point, i) => {
      if (i === 0) return `M ${point.x} ${point.y}`;
      const prev = points[i - 1];
      const cp1x = prev.x + (point.x - prev.x) / 3;
      const cp1y = prev.y;
      const cp2x = prev.x + 2 * (point.x - prev.x) / 3;
      const cp2y = point.y;
      return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
    }, '');
  };

  return (
    <div className="relative h-64 w-full">
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
        {/* Grid Lines */}
        {[...Array(5)].map((_, i) => {
          const y = padding + (i * (svgHeight - 2 * padding) / 4);
          return (
            <line key={i} x1={padding} y1={y} x2={svgWidth - padding} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
          );
        })}

        {/* Lines */}
        <path d={createPath(points.study)} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" className="drop-shadow-md animate-draw-line" />
        <path d={createPath(points.code)} fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" className="drop-shadow-md animate-draw-line" style={{ animationDelay: '0.2s' }} />
        <path d={createPath(points.presentations)} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" className="drop-shadow-md animate-draw-line" style={{ animationDelay: '0.4s' }} />

        {/* Data Points */}
        {points.study.map((p, i) => (
          <g key={`s-${i}`} className="group">
            <circle cx={p.x} cy={p.y} r="6" fill="#3b82f6" stroke="white" strokeWidth="2" className="cursor-pointer hover:r-8 transition-all" />
            <title>{data[i].day}: Study {data[i].udy}h</title>
          </g>
        ))}
        {points.code.map((p, i) => (
          <circle key={`c-${i}`} cx={p.x} cy={p.y} r="6" fill="#a855f7" stroke="white" strokeWidth="2" className="cursor-pointer hover:r-8 transition-all">
            <title>{data[i].day}: Code {data[i].code}h</title>
          </circle>
        ))}
        {points.presentations.map((p, i) => (
          <circle key={`p-${i}`} cx={p.x} cy={p.y} r="6" fill="#10b981" stroke="white" strokeWidth="2" className="cursor-pointer hover:r-8 transition-all">
            <title>{data[i].day}: Presentations {data[i].presentations}h</title>
          </circle>
        ))}

        {/* X Axis Labels */}
        {data.map((d, i) => (
          <text key={i} x={padding + (i * (svgWidth - 2 * padding) / (data.length - 1))} y={svgHeight - 10} textAnchor="middle" className="fill-slate-400 text-xs font-medium">{d.day}</text>
        ))}
      </svg>
    </div>
  );
};

// 3. Area Chart (Gradient Fill)
const AreaChartView = ({ data, maxValue }) => {
  const svgWidth = 800;
  const svgHeight = 300;
  const padding = 40;

  const getPoints = (key) => data.map((d, i) => ({
    x: padding + (i * (svgWidth - 2 * padding) / (data.length - 1)),
    y: svgHeight - padding - (d[key] / maxValue) * (svgHeight - 2 * padding)
  }));

  const createAreaPath = (points) => {
    const linePath = points.reduce((acc, point, i) => {
      if (i === 0) return `M ${point.x} ${point.y}`;
      const prev = points[i - 1];
      const cp1x = prev.x + (point.x - prev.x) / 2;
      return `${acc} Q ${cp1x} ${prev.y}, ${point.x} ${point.y}`;
    }, '');
    return `${linePath} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z`;
  };

  const studyPoints = getPoints('study');
  const codePoints = getPoints('code');
  const presPoints = getPoints('presentations');

  return (
    <div className="relative h-64 w-full">
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="gradStudy" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="gradCode" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="gradPres" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <path d={createAreaPath(studyPoints)} fill="url(#gradStudy)" className="animate-fade-in" />
        <path d={createAreaPath(codePoints)} fill="url(#gradCode)" className="animate-fade-in" style={{ animationDelay: '0.1s' }} />
        <path d={createAreaPath(presPoints)} fill="url(#gradPres)" className="animate-fade-in" style={{ animationDelay: '0.2s' }} />

        {/* Top Lines */}
        <path d={createAreaPath(studyPoints).replace(`L ${studyPoints[studyPoints.length-1].x} ${svgHeight-padding} L ${studyPoints[0].x} ${svgHeight-padding} Z`, '')} fill="none" stroke="#3b82f6" strokeWidth="2" />
        <path d={createAreaPath(codePoints).replace(`L ${codePoints[codePoints.length-1].x} ${svgHeight-padding} L ${codePoints[0].x} ${svgHeight-padding} Z`, '')} fill="none" stroke="#a855f7" strokeWidth="2" />
        <path d={createAreaPath(presPoints).replace(`L ${presPoints[presPoints.length-1].x} ${svgHeight-padding} L ${presPoints[0].x} ${svgHeight-padding} Z`, '')} fill="none" stroke="#10b981" strokeWidth="2" />

        {data.map((d, i) => (
          <text key={i} x={padding + (i * (svgWidth - 2 * padding) / (data.length - 1))} y={svgHeight - 10} textAnchor="middle" className="fill-slate-400 text-xs font-medium">{d.day}</text>
        ))}
      </svg>
    </div>
  );
};

// 4. Radar Chart (Spider Web)
const RadarChartView = ({ data }) => {
  const size = 280;
  const center = size / 2;
  const radius = 100;
  const angleStep = (2 * Math.PI) / data.length;

  const getPoint = (value, max, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / max) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const maxVal = Math.max(...data.map(d => Math.max(d.study, d.code, d.presentations))) * 1.2;

  const createPolygon = (key) => {
    const points = data.map((d, i) => {
      const p = getPoint(d[key], maxVal, i);
      return `${p.x},${p.y}`;
    });
    return points.join(' ');
  };

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <div className="flex items-center justify-center h-64">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid */}
        {gridLevels.map((level, i) => (
          <polygon
            key={i}
            points={data.map((_, idx) => {
              const angle = idx * angleStep - Math.PI / 2;
              const r = radius * level;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            }).join(' ')}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {data.map((d, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <g key={i}>
              <line x1={center} y1={center} x2={x} y2={y} stroke="#e2e8f0" strokeWidth="1" />
              <text x={x + (x > center ? 10 : -10)} y={y + (y > center ? 10 : -5)} textAnchor={x > center ? 'start' : 'end'} className="fill-slate-500 text-xs font-medium">{d.day}</text>
            </g>
          );
        })}

        {/* Data Polygons */}
        <polygon points={createPolygon('study')} fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2" className="animate-scale-in" />
        <polygon points={createPolygon('code')} fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth="2" className="animate-scale-in" style={{ animationDelay: '0.2s' }} />
        <polygon points={createPolygon('presentations')} fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2" className="animate-scale-in" style={{ animationDelay: '0.4s' }} />

        {/* Points */}
        {data.map((d, i) => {
          const pStudy = getPoint(d.study, maxVal, i);
          const pCode = getPoint(d.code, maxVal, i);
          const pPres = getPoint(d.presentations, maxVal, i);
          return (
            <g key={`pts-${i}`}>
              <circle cx={pStudy.x} cy={pStudy.y} r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
              <circle cx={pCode.x} cy={pCode.y} r="4" fill="#a855f7" stroke="white" strokeWidth="2" />
              <circle cx={pPres.x} cy={pPres.y} r="4" fill="#10b981" stroke="white" strokeWidth="2" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// --- Main Component ---
const ActivityChart = ({ weeklyData = generateWeeklyData(), monthlyData = generateMonthlyData(), allTimeData = generateAllTimeData() }) => {
  const [period, setPeriod] = useState('weekly'); // weekly, monthly, all
  const [chartType, setChartType] = useState('bar'); // bar, line, area, radar

  const data = useMemo(() => {
    switch(period) {
      case 'monthly': return monthlyData;
      case 'all': return allTimeData;
      default: return weeklyData;
    }
  }, [period, weeklyData, monthlyData, allTimeData]);

  const maxValue = Math.max(...data.map(d => d.total), 1);

  const renderChart = () => {
    switch(chartType) {
      case 'line': return <LineChartView data={data} maxValue={maxValue} />;
      case 'area': return <AreaChartView data={data} maxValue={maxValue} />;
      case 'radar': return <RadarChartView data={data} />;
      default: return <BarChartView data={data} maxValue={maxValue} />;
    }
  };

  const chartTypes = [
    { key: 'bar', icon: Icons.barChart, label: 'Bars' },
    { key: 'line', icon: Icons.lineChart, label: 'Trend' },
    { key: 'area', icon: Icons.areaChart, label: 'Area' },
    { key: 'radar', icon: Icons.radarChart, label: 'Radar' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Activity Overview</h3>
          <p className="text-sm text-slate-400">Track your learning patterns over time</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Period Selector */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            {['weekly', 'monthly', 'all'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${
                  period === p 
                    ? 'bg-white text-slate-800 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {p === 'all' ? 'All Time' : p}
              </button>
            ))}
          </div>

          {/* Chart Type Selector */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            {chartTypes.map((type) => (
              <button
                key={type.key}
                onClick={() => setChartType(type.key)}
                title={type.label}
                className={`p-1.5 rounded-md transition-all ${
                  chartType === type.key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {type.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative min-h-[280px]">
        {renderChart()}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></div>
          <span className="text-sm font-medium text-slate-600">Study Materials</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500 shadow-sm shadow-purple-200"></div>
          <span className="text-sm font-medium text-slate-600">Code Practice</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></div>
          <span className="text-sm font-medium text-slate-600">Presentations</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { label: 'Total Study', value: data.reduce((a, b) => a + b.study, 0), color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Code', value: data.reduce((a, b) => a + b.code, 0), color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Total Pres.', value: data.reduce((a, b) => a + b.presentations, 0), color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} rounded-xl p-3 text-center`}>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}h</div>
            <div className="text-xs text-slate-500 font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes draw-line {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
        .animate-draw-line {
          animation: draw-line 1.5s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        @keyframes scale-in {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          transform-origin: center;
          animation: scale-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ActivityChart;