import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { 
  Clock, 
  Users, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  UserCheck, 
  CreditCard,
  AlertTriangle
} from 'lucide-react';

export const QueuesPage: React.FC = () => {
  const { 
    queues, 
    queuePrediction, 
    executeQueueRecommendation 
  } = useAppStore();

  const [timeRange, setTimeRange] = useState<'Today' | 'Yesterday' | 'This Week'>('Today');

  const chartPoints = [
    { hour: '10 AM', wait: 2.1 },
    { hour: '11 AM', wait: 3.4 },
    { hour: '12 PM', wait: 5.8 },
    { hour: '1 PM', wait: 8.2 },
    { hour: '2 PM', wait: 6.4 },
    { hour: '3 PM', wait: 3.9 },
    { hour: '4 PM', wait: 4.8 },
    { hour: '5 PM', wait: 7.1 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Queue Operations & Predictive Congestion</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
              Checkout Computer Vision
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time cashier line length monitoring, wait-time forecasting, and automated lane load balancing.
          </p>
        </div>

        {queuePrediction.congestionRisk === 'High' && (
          <button
            onClick={executeQueueRecommendation}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-sm"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Open Checkout 4 (Execute Action)</span>
          </button>
        )}
      </div>

      {/* Queue Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {queues.map((counter) => {
          const isCongested = counter.status === 'congested';
          const isClosed = counter.status === 'closed';

          return (
            <div
              key={counter.id}
              className={`bg-white border rounded-xl p-5 shadow-card transition ${
                isCongested
                  ? 'border-rose-300 ring-2 ring-rose-100'
                  : isClosed
                  ? 'border-slate-200 opacity-60'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-900">{counter.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isCongested
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : isClosed
                    ? 'bg-slate-100 text-slate-500'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {counter.status}
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <span className={`text-3xl font-extrabold tracking-tight ${
                    isCongested ? 'text-rose-600' : isClosed ? 'text-slate-400' : 'text-slate-900'
                  }`}>
                    {counter.people}
                  </span>
                  <span className="text-xs text-slate-500 ml-1.5">queued</span>
                </div>

                <div className="text-right">
                  <div className={`text-sm font-mono font-bold ${
                    isCongested ? 'text-rose-600' : isClosed ? 'text-slate-400' : 'text-slate-800'
                  }`}>
                    Wait: {counter.waitTime}
                  </div>
                  <div className="text-[10px] text-slate-400">Avg. service</div>
                </div>
              </div>

              {/* Graphic queue dots */}
              <div className="py-2 px-2.5 rounded-lg bg-slate-50 border border-slate-100 mb-3 flex items-center gap-1.5 overflow-hidden">
                {counter.people === 0 ? (
                  <span className="text-[10px] text-slate-400 italic">No customers</span>
                ) : (
                  Array.from({ length: counter.people }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full ${
                        isCongested ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                    />
                  ))
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1 text-[11px]">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>{counter.operator}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Cam #03</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Queue Forecast / Prediction Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-card space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                Predictive Queue Forecast
              </h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Analyzes incoming basket sizes and footfall velocities approaching registers to forecast congestion 10 minutes ahead.
            </p>
          </div>

          {/* Forecast Progression */}
          <div className="flex items-center gap-3 sm:gap-6 bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Current</span>
              <span className="text-2xl font-bold text-slate-900 font-mono">{queuePrediction.currentCount}</span>
              <span className="text-[10px] text-slate-400 block">people</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-amber-700 block mb-1">In 5 Min</span>
              <span className="text-2xl font-bold text-amber-700 font-mono">{queuePrediction.in5Min}</span>
              <span className="text-[10px] text-amber-600 block">predicted</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-rose-700 block mb-1">In 10 Min</span>
              <span className="text-2xl font-bold text-rose-700 font-mono">{queuePrediction.in10Min}</span>
              <span className="text-[10px] text-rose-600 block">predicted</span>
            </div>
          </div>

          {/* Risk & Recommendation */}
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 max-w-xs w-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-900">Congestion Risk:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                ⚠ {queuePrediction.congestionRisk}
              </span>
            </div>
            <div className="text-xs font-bold text-purple-950">
              {queuePrediction.recommendedAction}
            </div>
            <button
              onClick={executeQueueRecommendation}
              disabled={queuePrediction.congestionRisk !== 'High'}
              className="w-full py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition"
            >
              Execute Recommendation
            </button>
          </div>
        </div>
      </div>

      {/* Average Waiting Time Curve */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Average Waiting Time (Hourly)</h2>
            <span className="text-xs text-slate-500">Benchmark SLA cap: 5.0 minutes</span>
          </div>

          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            {(['Today', 'Yesterday', 'This Week'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeRange(filter)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                  timeRange === filter ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Line Chart SVG */}
        <div className="w-full h-52 relative bg-slate-50 rounded-xl p-4 border border-slate-200">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 700 180" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waitLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid */}
            <line x1="40" y1="20" x2="680" y2="20" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
            <text x="15" y="24" fill="#94A3B8" fontSize="10">8m</text>

            <line x1="40" y1="60" x2="680" y2="60" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
            <text x="15" y="64" fill="#94A3B8" fontSize="10">6m</text>

            <line x1="40" y1="100" x2="680" y2="100" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
            <text x="15" y="104" fill="#94A3B8" fontSize="10">4m</text>

            <line x1="40" y1="140" x2="680" y2="140" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
            <text x="15" y="144" fill="#94A3B8" fontSize="10">2m</text>

            {/* SLA Cap */}
            <line x1="40" y1="80" x2="680" y2="80" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Chart Area */}
            <path
              d="M 60 140 L 140 115 L 220 70 L 300 18 L 380 50 L 460 102 L 540 85 L 620 40 L 620 160 L 60 160 Z"
              fill="url(#waitLight)"
            />

            {/* Curve */}
            <path
              d="M 60 140 L 140 115 L 220 70 L 300 18 L 380 50 L 460 102 L 540 85 L 620 40"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {chartPoints.map((p, idx) => (
              <text key={idx} x={60 + idx * 80} y="175" fill="#64748B" fontSize="10" textAnchor="middle">
                {p.hour}
              </text>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};
