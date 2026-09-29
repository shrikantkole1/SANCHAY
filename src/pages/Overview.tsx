import React from 'react';
import { useAppStore } from '../store/appStore';
import { 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  Clock3, 
  CheckSquare, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Camera, 
  MapPin, 
  CheckCircle2,
  ChevronRight,
  Flame,
  Clock
} from 'lucide-react';

export const OverviewPage: React.FC = () => {
  const { 
    footfallToday, 
    activeShoppers, 
    zones, 
    inventory, 
    queues, 
    tasks, 
    alerts, 
    queuePrediction,
    setActiveTab, 
    executeQueueRecommendation,
    setSelectedProduct,
    verifyTaskWithCamera
  } = useAppStore();

  const stockAlertsCount = inventory.filter(i => i.status !== 'optimal').length;
  const pendingTasksCount = tasks.filter(t => t.status !== 'Verified').length;
  const activeQueuesCount = queues.filter(q => q.status !== 'closed').length;

  return (
    <div className="space-y-6">
      {/* Top Banner / SaaS Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Store Operations Command Center
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Edge AI Live
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Real-time computer vision inference analyzing store footfall, shelf availability, and cashier wait times.
          </p>
        </div>

        {/* Action Flow summary pill */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600">
          <span className="text-slate-400">Pipeline:</span>
          <span className="text-slate-900 font-semibold">See</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-semibold">Understand</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-semibold">Act</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="text-emerald-700 font-bold">Verify</span>
        </div>
      </div>

      {/* Primary KPI Cards (5 metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Footfall Today */}
        <div 
          onClick={() => setActiveTab('shoppers')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-card hover:shadow-elevated hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Footfall Today</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{footfallToday.toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> 12%
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex justify-between">
            <span>Turnstile & Gate CV</span>
            <span className="text-emerald-600 font-medium">Tracking</span>
          </div>
        </div>

        {/* 2. Active Shoppers */}
        <div 
          onClick={() => setActiveTab('shoppers')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-card hover:shadow-elevated hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Shoppers</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{activeShoppers}</span>
            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
              Inside
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex justify-between">
            <span>Across 4 zones</span>
            <span className="text-blue-600 font-medium">Dwell: 4m 32s</span>
          </div>
        </div>

        {/* 3. Inventory Alerts */}
        <div 
          onClick={() => setActiveTab('inventory')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-card hover:shadow-elevated hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Inventory Alerts</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-600">{stockAlertsCount}</span>
            <span className="text-xs font-medium text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
              Needs Action
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex justify-between">
            <span>Low stock / voids</span>
            <span className="text-rose-600 font-medium">Milk 1L Risk</span>
          </div>
        </div>

        {/* 4. Queue Status */}
        <div 
          onClick={() => setActiveTab('queues')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-card hover:shadow-elevated hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Queue Status</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Clock3 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{activeQueuesCount}</span>
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              Active Lanes
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex justify-between">
            <span>Max wait: 5m 42s</span>
            <span className="text-amber-600 font-medium">Lane 2 Peak</span>
          </div>
        </div>

        {/* 5. Pending Tasks */}
        <div 
          onClick={() => setActiveTab('tasks')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-card hover:shadow-elevated hover:border-slate-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Tasks</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{pendingTasksCount}</span>
            <span className="text-xs font-medium text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
              In Workflow
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex justify-between">
            <span>Staff assigned</span>
            <span className="text-purple-600 font-medium">Ready to verify</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Store Layout Mini-Map + Predictive Queue Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Store Activity Preview */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Live Store Activity Overview</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </h2>
              <p className="text-xs text-slate-500">Real-time zone occupancy and spatial telemetry.</p>
            </div>
            <button
              onClick={() => setActiveTab('livestore')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Full Store Layout</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Clean Floorplan Map Grid */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative overflow-hidden">
            {/* Entrance Header */}
            <div className="text-center py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 mb-4 shadow-sm flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>NORTH MAIN ENTRANCE (Turnstiles Active)</span>
            </div>

            {/* 4 Zone Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  onClick={() => setActiveTab('livestore')}
                  className="bg-white border border-slate-200 hover:border-emerald-500 rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{zone.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{zone.code}</span>
                    </div>
                    {zone.alertCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {zone.alertCount} Alert
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-baseline justify-between text-xs">
                    <div>
                      <span className="text-lg font-bold text-slate-900">{zone.shoppers}</span>
                      <span className="text-[10px] text-slate-500 ml-1">shoppers</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">Dwell: {zone.avgDwell}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Area Bottom */}
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center justify-between text-xs shadow-sm">
              <div className="flex items-center gap-2">
                <Clock3 className="w-4 h-4 text-purple-600" />
                <span className="font-bold text-slate-900">Checkout Lanes 1 - 4</span>
              </div>
              <div className="flex items-center gap-2">
                {queues.map((q) => (
                  <span
                    key={q.id}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                      q.status === 'congested'
                        ? 'bg-rose-50 text-rose-700 border-rose-200 font-bold'
                        : q.status === 'open'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}
                  >
                    C{q.id}: {q.status === 'closed' ? 'Off' : `${q.people}q`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Predictive Queue Ops + Top Action Alert */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {/* Predictive Queue Operations Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock3 className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-slate-900">Queue Forecast & Prediction</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                Risk: {queuePrediction.congestionRisk}
              </span>
            </div>

            {/* 3 Step Forecast */}
            <div className="grid grid-cols-3 gap-2 my-4 text-center">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Now</span>
                <span className="text-lg font-bold text-slate-900 font-mono">{queuePrediction.currentCount}</span>
                <span className="text-[10px] text-slate-500 block">people</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-800 block mb-0.5">In 5 Min</span>
                <span className="text-lg font-bold text-amber-900 font-mono">{queuePrediction.in5Min}</span>
                <span className="text-[10px] text-amber-700 block">predicted</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                <span className="text-[10px] uppercase font-bold text-rose-800 block mb-0.5">In 10 Min</span>
                <span className="text-lg font-bold text-rose-900 font-mono">{queuePrediction.in10Min}</span>
                <span className="text-[10px] text-rose-700 block">predicted</span>
              </div>
            </div>

            {/* Recommended Action CTA */}
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-700 block">Recommended Action</span>
                <span className="text-xs font-bold text-purple-950">{queuePrediction.recommendedAction}</span>
              </div>
              {queuePrediction.congestionRisk === 'High' && (
                <button
                  onClick={executeQueueRecommendation}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition"
                >
                  Open Counter 4
                </button>
              )}
            </div>
          </div>

          {/* Inventory Physical-Digital Reconciliation Snapshot */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">Physical–Digital Reconciliation</h3>
              </div>
              <button
                onClick={() => {
                  setSelectedProduct(inventory[0]);
                  setActiveTab('inventory');
                }}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Inspect
              </button>
            </div>

            <div className="my-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Milk 1L (Whole Farm Fresh)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  🔴 Stock Risk
                </span>
              </div>

              {/* 3 source comparison */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 block font-semibold">POS/ERP</span>
                  <span className="font-bold text-slate-800">42</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-700 block font-semibold">Camera AI</span>
                  <span className="font-bold text-emerald-700">17</span>
                </div>
                <div>
                  <span className="text-[10px] text-purple-700 block font-semibold">Weight Scale</span>
                  <span className="font-bold text-purple-700">18</span>
                </div>
              </div>
            </div>

            {/* Quick Verify Button */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Discrepancy: Variance 1 unit</span>
              <button
                onClick={() => verifyTaskWithCamera('task-101')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1 shadow-sm"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Verify Restock</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
