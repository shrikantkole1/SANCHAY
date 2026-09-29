import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { 
  Camera, 
  Eye, 
  Layers, 
  Sliders, 
  Maximize2, 
  ShoppingBag, 
  Tv, 
  Coffee, 
  Sparkles, 
  CreditCard, 
  ArrowDown, 
  Activity, 
  Clock, 
  AlertTriangle,
  Flame,
  CheckCircle2,
  Info
} from 'lucide-react';

export const LiveStorePage: React.FC = () => {
  const { zones, cameras, queues, inventory, setSelectedProduct, setActiveTab } = useAppStore();
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-c');
  const [showAiBoxes, setShowAiBoxes] = useState<boolean>(true);
  const [showDensityMesh, setShowDensityMesh] = useState<boolean>(true);

  const selectedZone = zones.find(z => z.id === selectedZoneId) || zones[0];
  const associatedCamera = cameras.find(c => c.zoneId === selectedZone.id) || cameras[1];

  const getZoneIcon = (id: string) => {
    switch (id) {
      case 'zone-a': return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case 'zone-b': return <Tv className="w-4 h-4 text-blue-600" />;
      case 'zone-c': return <Coffee className="w-4 h-4 text-amber-600" />;
      case 'zone-d': return <Sparkles className="w-4 h-4 text-pink-600" />;
      default: return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Live Store Operations & Spatial Grid</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              4 Cameras Active • 30 FPS Edge
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Interactive store floor layout combined with on-premise neural camera feeds and shelf telemetry.
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAiBoxes(!showAiBoxes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
              showAiBoxes
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>AI Bounding Boxes: {showAiBoxes ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Store Layout Map (Left) + Integrated Live Camera Feed (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Floor Map */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Floor Activity Blueprint</h2>
              <span className="text-xs text-slate-500">Select any zone to synchronize the camera viewport</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Store #104 Flagship</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative min-h-[460px] flex flex-col justify-between overflow-hidden">
            {/* Subtle Architectural Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

            {/* 1. Entrance Gateway */}
            <div className="relative z-10 w-full py-2 px-4 bg-white border border-slate-200 rounded-lg shadow-sm text-center mb-4 flex flex-col items-center">
              <span className="text-xs font-bold text-slate-800 tracking-wider uppercase">
                NORTH STORE ENTRANCE
              </span>
              <span className="text-[11px] text-emerald-600 font-mono">
                Overhead Cam #01 • 1,248 Turnstile Entries
              </span>
              <div className="flex gap-2 text-emerald-600 mt-1 animate-bounce">
                <ArrowDown className="w-3.5 h-3.5" />
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* 2. Zones Grid (2x2) */}
            <div className="relative z-10 grid grid-cols-2 gap-4 flex-1">
              {zones.map((zone) => {
                const isSelected = selectedZoneId === zone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-slate-100 border border-slate-200">
                          {getZoneIcon(zone.id)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">{zone.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{zone.code}</span>
                        </div>
                      </div>
                      {zone.alertCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          {zone.alertCount} Alert
                        </span>
                      )}
                    </div>

                    {/* Zone Capacity & Dwell */}
                    <div className="my-3 py-2 px-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-slate-900">{zone.shoppers}</span>
                        <span className="text-[10px] text-slate-500 block">current shoppers</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-slate-700 block">{zone.avgDwell}</span>
                        <span className="text-[10px] text-slate-400">avg dwell</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <span className="text-[11px] text-slate-500">Camera: {zone.cameraId}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        zone.activity === 'high' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {zone.activity.toUpperCase()} ACTIVITY
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3. Checkout Lanes Bottom */}
            <div className="relative z-10 mt-4 pt-3 border-t border-slate-200 bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-slate-900">Checkout Lanes 1 - 4</span>
              </div>
              <div className="flex items-center gap-2">
                {queues.map((q) => (
                  <span
                    key={q.id}
                    className={`px-2 py-1 rounded text-xs font-medium border ${
                      q.status === 'congested'
                        ? 'bg-rose-50 text-rose-700 border-rose-300 font-bold'
                        : q.status === 'open'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}
                  >
                    C{q.id}: {q.status === 'closed' ? 'Closed' : `${q.people} queued`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Integrated Simulated Camera Viewport */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-card flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {associatedCamera.name}
                  </h3>
                  <span className="text-[10px] text-slate-400">{associatedCamera.location}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                LIVE EDGE
              </span>
            </div>

            {/* Video Viewport Canvas */}
            <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden shadow-inner my-4 flex items-center justify-center p-4">
              <div className="absolute top-3 left-3 text-[10px] font-mono text-emerald-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                {associatedCamera.id} • {associatedCamera.fps} FPS • {associatedCamera.edgeLatencyMs}ms
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                1080p Neural Feed
              </div>

              {/* Central Viewport Information */}
              <div className="text-center z-10">
                <div className="w-10 h-10 rounded-full bg-white/10 text-white mx-auto mb-2 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-sm font-bold text-white tracking-wide">{selectedZone.name}</div>
                <div className="text-xs text-emerald-400 font-mono mt-0.5">
                  {selectedZone.shoppers} Shoppers Detected
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Average Dwell: {selectedZone.avgDwell}</div>
              </div>

              {/* Simulated AI Bounding Boxes */}
              {showAiBoxes && (
                <>
                  <div className="absolute top-10 left-12 w-20 h-28 border-2 border-emerald-400 bg-emerald-500/10 rounded flex items-start justify-start p-1">
                    <span className="text-[9px] bg-emerald-700 text-white px-1 font-mono rounded">
                      person 94%
                    </span>
                  </div>
                  {selectedZone.id === 'zone-c' && (
                    <div className="absolute inset-x-12 bottom-6 h-16 border-2 border-dashed border-amber-400 bg-amber-500/10 rounded flex items-center justify-between px-2">
                      <span className="text-[9px] bg-amber-600 text-white font-bold px-1.5 py-0.5 rounded">
                        ⚠ Shelf Gap: Milk 1L (17/42 left)
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Zone Telemetry Details */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  Computer Vision Diagnostics
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedZone.id === 'zone-c'
                    ? 'High dwell in dairy cooler. Customer shelf interaction rate is 78%. Low availability warning generated for Milk 1L.'
                    : selectedZone.id === 'zone-a'
                    ? 'Steady footfall flow. Restocking verification completed for Basmati Rice. All facings verified full.'
                    : 'Customer dwell is optimal with active product exploration.'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('shoppers')}
            className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
          >
            View Detailed Shopper Heatmaps →
          </button>
        </div>
      </div>
    </div>
  );
};
