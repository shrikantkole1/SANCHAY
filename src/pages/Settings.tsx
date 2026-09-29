import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { 
  Settings as SettingsIcon, 
  Store, 
  Bell, 
  Sliders, 
  ShieldCheck, 
  Save, 
  Check 
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { activeStore, setActiveStore } = useAppStore();
  const [dwellThreshold, setDwellThreshold] = useState('3.0');
  const [queueThreshold, setQueueThreshold] = useState('8');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Platform Settings & Operational Thresholds</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure retail store metadata, computer vision detection sensitivity, and operational SLA trigger points.
        </p>
      </div>

      {/* Settings Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-card space-y-6">
        {/* Store Profile */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-600" />
            <span>Store Location</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Active Store Location</label>
              <select
                value={activeStore}
                onChange={(e) => setActiveStore(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Store #104 — Indiranagar Flagship, Bengaluru">Store #104 — Indiranagar Flagship, Bengaluru</option>
                <option value="Store #102 — Koramangala Hypermarket, Bengaluru">Store #102 — Koramangala Hypermarket, Bengaluru</option>
                <option value="Store #108 — Whitefield Tech Hub, Bengaluru">Store #108 — Whitefield Tech Hub, Bengaluru</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Store Format</label>
              <input
                type="text"
                disabled
                value="Supermarket / Grocery & Tech"
                className="w-full px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 text-xs"
              />
            </div>
          </div>
        </div>

        {/* AI Thresholds */}
        <div className="pt-4 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-purple-600" />
            <span>Computer Vision Thresholds</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Queue Congestion Cap (Persons)</label>
              <input
                type="number"
                value={queueThreshold}
                onChange={(e) => setQueueThreshold(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Triggers "Open Next Checkout" when line exceeds this count.</span>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">High Dwell Warning (Minutes)</label>
              <input
                type="text"
                value={dwellThreshold}
                onChange={(e) => setDwellThreshold(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Flags zone dwell times above benchmark for staff attention.</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Settings are saved locally on the store edge appliance.</span>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved Successfully!' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
