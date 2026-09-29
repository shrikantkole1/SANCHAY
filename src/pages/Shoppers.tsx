import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  Flame, 
  Compass, 
  Layers, 
  ArrowDown, 
  Activity, 
  CheckCircle,
  Eye,
  Filter
} from 'lucide-react';

export const ShoppersPage: React.FC = () => {
  const { 
    activeShoppers, 
    footfallToday, 
    avgDwellTime, 
    zones, 
    timeFilter, 
    setTimeFilter, 
    heatmapMode, 
    setHeatmapMode,
    simulateShopperEntrance
  } = useAppStore();

  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  // Hourly traffic curve for chart
  const hourlyData = [
    { time: '09:00', count: 64, dwell: '3.1m' },
    { time: '10:00', count: 142, dwell: '3.8m' },
    { time: '11:00', count: 218, dwell: '4.5m' },
    { time: '12:00', count: 320, dwell: '5.2m' },
    { time: '13:00', count: 280, dwell: '4.8m' },
    { time: '14:00', count: 185, dwell: '4.1m' },
    { time: '15:00', count: 210, dwell: '4.3m' },
    { time: '16:00', count: 260, dwell: '4.6m' }
  ];

  const maxTraffic = Math.max(...hourlyData.map(d => d.count));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Shopper Footfall & Spatial Heatmaps</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              Spatial Intelligence
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tracking customer journeys, dwell times, and conversion funnels derived from edge computer vision.
          </p>
        </div>

        <button
          onClick={simulateShopperEntrance}
          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
        >
          <Users className="w-3.5 h-3.5" />
          <span>Simulate +1 Shopper Entry</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Live Visitors */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Live Visitors</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{activeShoppers}</span>
            <span className="text-xs text-emerald-700 font-medium flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
              Live inside store
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Aggregated across all 4 zones</p>
        </div>

        {/* Today's Traffic */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Today's Traffic</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-600 tracking-tight">
              {footfallToday.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12.4% vs avg
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Total Turnstile & Camera Entries</p>
        </div>

        {/* Average Dwell */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Dwell</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{avgDwellTime}</span>
            <span className="text-xs text-slate-500 font-medium">+18s vs benchmark</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Average store visit duration</p>
        </div>
      </div>

      {/* Shopper Heatmap (Visual Core) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-600" />
              <h2 className="text-base font-bold text-slate-900">
                Spatial Density & Trajectory Heatmap
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualizes pedestrian hotspots, dwell concentration, and transit paths from entrance to checkout.
            </p>
          </div>

          {/* Controls: Time & Heatmap Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Time Filter */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              {(['Today', '7 Days', '30 Days'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                    timeFilter === t
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Mode Filter */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              {(['Traffic', 'Dwell', 'Movement'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setHeatmapMode(m)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                    heatmapMode === m
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{m}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Heatmap Visual Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-xl p-6 relative min-h-[420px] flex flex-col items-center justify-between shadow-inner overflow-hidden">
            {/* Architectural Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

            {/* ENTRANCE */}
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-4 py-1 rounded-full border border-emerald-200 shadow-sm">
                ENTRANCE
              </span>
              <div className="flex gap-2 text-emerald-600 my-1 animate-bounce">
                <ArrowDown className="w-3 h-3" />
                <ArrowDown className="w-3 h-3" />
              </div>
            </div>

            {/* SVG Layer */}
            <div className="relative z-10 w-full max-w-xl h-60 my-2 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 240">
                <defs>
                  <radialGradient id="heatHigh" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="heatMed" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </radialGradient>

                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#059669" />
                  </marker>
                </defs>

                {/* Perimeter */}
                <rect x="20" y="10" width="460" height="220" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4" />

                {/* Zone Boxes */}
                <rect x="40" y="30" width="190" height="85" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                <text x="50" y="50" fill="#475569" fontSize="11" fontWeight="bold">GROCERY (ZONE A)</text>

                <rect x="270" y="30" width="190" height="85" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                <text x="280" y="50" fill="#475569" fontSize="11" fontWeight="bold">ELECTRONICS (ZONE B)</text>

                <rect x="40" y="130" width="190" height="85" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                <text x="50" y="150" fill="#475569" fontSize="11" fontWeight="bold">BEVERAGES (ZONE C)</text>

                <rect x="270" y="130" width="190" height="85" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                <text x="280" y="150" fill="#475569" fontSize="11" fontWeight="bold">PERSONAL CARE (ZONE D)</text>

                {/* Flow lines */}
                {(heatmapMode === 'Movement' || heatmapMode === 'Traffic') && (
                  <g opacity="0.8">
                    <path d="M 250 15 Q 150 40 135 75" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                    <path d="M 135 90 L 135 150" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                    <path d="M 150 190 Q 250 200 370 215" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                  </g>
                )}

                {/* Heat Blobs */}
                <circle
                  cx="130"
                  cy="170"
                  r={heatmapMode === 'Dwell' ? '55' : '48'}
                  fill="url(#heatHigh)"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredHotspot('Beverage Zone C: High density dwell (4m 18s)')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                />

                <circle
                  cx="120"
                  cy="75"
                  r="42"
                  fill="url(#heatMed)"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredHotspot('Grocery Zone A: Steady basket shopping')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                />

                <ellipse
                  cx="390"
                  cy="205"
                  rx="45"
                  ry="25"
                  fill="url(#heatHigh)"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredHotspot('Checkout: Surge at Counter 2')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                />
              </svg>
            </div>

            {/* CHECKOUT */}
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-rose-800 bg-rose-50 px-4 py-1 rounded-full border border-rose-200 shadow-sm">
                CHECKOUT LANES
              </span>
            </div>

            {hoveredHotspot && (
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow-elevated">
                {hoveredHotspot}
              </div>
            )}
          </div>

          {/* Heatmap Legend */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Density Gradient</span>
              </h3>

              <div className="space-y-1.5 mb-3">
                <div className="h-3 w-full rounded-full bg-gradient-to-r from-blue-400 via-emerald-400 via-amber-400 to-rose-500 shadow-inner" />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High Dwell</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-900">Current Mode: {heatmapMode}</div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  {heatmapMode === 'Traffic'
                    ? 'Total count of footfall detections aggregated from ceiling camera coordinates.'
                    : heatmapMode === 'Dwell'
                    ? 'Highlights stationary customer evaluation (> 2.5 minutes) along display racks.'
                    : 'Shows trajectory vectors from Entrance through grocery down to checkout.'}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Top Findings
              </span>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
                <span className="font-bold text-rose-700 block">Cooler Wall Hotspot</span>
                <span className="text-[11px] text-slate-500">34% of morning customer dwell is focused in Zone C.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
                <span className="font-bold text-emerald-700 block">Smooth Entry Gate</span>
                <span className="text-[11px] text-slate-500">Zero entry bottlenecks at turnstiles.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Activity Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
        <h2 className="text-sm font-bold text-slate-900 mb-3">
          Zone Activity & Traffic Breakdown
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Zone</th>
                <th className="py-2.5 px-4">Visitors</th>
                <th className="py-2.5 px-4">Avg. Dwell</th>
                <th className="py-2.5 px-4">Activity</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {zones.map((zone) => (
                <tr key={zone.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{zone.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{zone.code}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                    {zone.shoppers}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700 font-semibold">
                    {zone.avgDwell}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      zone.activity === 'high'
                        ? 'bg-rose-50 text-rose-700'
                        : zone.activity === 'medium'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {zone.activity.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {zone.alertCount > 0 ? (
                      <span className="text-amber-700 font-medium">
                        {zone.alertCount} Alert Requires Attention
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Optimal
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
