import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import type { AlertItem, AlertCategory } from '../types';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  MapPin, 
  Zap, 
  Check, 
  X, 
  Filter, 
  Plus,
  ShieldCheck,
  Package,
  Users
} from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { 
    alerts, 
    acknowledgeAlert, 
    dismissAlert, 
    createTaskFromAlert,
    setActiveTab 
  } = useAppStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedCategory === 'All') return true;
    return alert.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const getCategoryBadge = (cat: AlertCategory) => {
    switch (cat) {
      case 'inventory':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Inventory</span>;
      case 'queue':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">Queue</span>;
      case 'shopper':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Shopper</span>;
      case 'system':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">System</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Alerts & Incident Operations</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
              Live Event Anomaly Stream
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time notifications categorized by inventory, queue, shopper, and system signals.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center bg-slate-100 rounded-lg p-1">
          {['All', 'Inventory', 'Queue', 'Shopper', 'System'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                selectedCategory === cat ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-xl shadow-card">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2 opacity-80" />
            <h3 className="text-sm font-bold text-slate-900">No active alerts in this category</h3>
            <p className="text-xs text-slate-500 mt-1">All monitored metrics are performing within normal thresholds.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border bg-white shadow-card transition ${
                alert.priority === 'high'
                  ? 'border-rose-200 hover:border-rose-300 ring-1 ring-rose-50'
                  : alert.priority === 'verified'
                  ? 'border-emerald-200 hover:border-emerald-300'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    {getCategoryBadge(alert.category)}
                    <h3 className="text-sm font-bold text-slate-900">{alert.title}</h3>
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {alert.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {alert.description}
                  </p>

                  {/* Problem -> Location -> Action -> Status */}
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-400">Location:</span>
                      <strong>{alert.location}</strong>
                    </span>

                    <ArrowRight className="w-3 h-3 text-slate-300" />

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-amber-700/80">Recommended Action:</span>
                      <strong>{alert.action}</strong>
                    </span>

                    <ArrowRight className="w-3 h-3 text-slate-300" />

                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                      alert.status === 'acknowledged' ? 'bg-blue-50 text-blue-700' :
                      alert.status === 'assigned' ? 'bg-purple-50 text-purple-700' :
                      alert.status === 'verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                  {alert.status === 'active' && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      Acknowledge
                    </button>
                  )}

                  {alert.status !== 'assigned' && alert.status !== 'verified' && (
                    <button
                      onClick={() => createTaskFromAlert(alert)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create Task</span>
                    </button>
                  )}

                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                    title="Dismiss alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
