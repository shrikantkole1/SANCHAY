import React from 'react';
import { useAppStore } from '../store/appStore';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  CheckCircle, 
  ShieldCheck, 
  Users, 
  Package, 
  Clock 
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { activeStore } = useAppStore();

  const handleExport = (format: string) => {
    alert(`Exporting ${format} Operations Summary for ${activeStore}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Executive Reports & Operations Audit</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              Audit Ready
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Aggregated intelligence logs, physical-digital discrepancy reconciliations, and staff SLA fulfillment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('CSV')}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5 border border-slate-200 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleExport('PDF')}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download Audit PDF</span>
          </button>
        </div>
      </div>

      {/* Audit Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Stock Gap Resolution SLA
          </span>
          <div className="text-3xl font-extrabold text-emerald-600">14.2 min</div>
          <span className="text-xs text-slate-500 block mt-1">Down 28% from manual auditing</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Queue SLA Compliance
          </span>
          <div className="text-3xl font-extrabold text-blue-600">96.8%</div>
          <span className="text-xs text-slate-500 block mt-1">Customer waits kept under 5-minute cap</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Physical Variance Cleared
          </span>
          <div className="text-3xl font-extrabold text-purple-600">99.1%</div>
          <span className="text-xs text-slate-500 block mt-1">Triple-signal reconciliation validated</span>
        </div>
      </div>

      {/* Detailed Operations Report Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
        <h2 className="text-sm font-bold text-slate-900 mb-3">
          Daily Store Operations Event Log
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Event Description</th>
                <th className="py-2.5 px-3">AI Detection Signal</th>
                <th className="py-2.5 px-3">Closed-Loop Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-3 font-mono text-slate-500">12:10 PM</td>
                <td className="py-3 px-3 font-bold text-emerald-700">Inventory</td>
                <td className="py-3 px-3 text-slate-800">Basmati Rice 5kg Replenished (24 bags full)</td>
                <td className="py-3 px-3 text-slate-500">Camera #01 Visual Count</td>
                <td className="py-3 px-3">
                  <span className="text-emerald-700 font-bold">✓ Verified by Camera</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-3 font-mono text-slate-500">11:45 AM</td>
                <td className="py-3 px-3 font-bold text-blue-700">Queue</td>
                <td className="py-3 px-3 text-slate-800">Checkout 4 opened on predictive surge</td>
                <td className="py-3 px-3 text-slate-500">Queue Length CV &gt; 8</td>
                <td className="py-3 px-3">
                  <span className="text-blue-700 font-bold">✓ Load Balanced</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-3 font-mono text-slate-500">10:42 AM</td>
                <td className="py-3 px-3 font-bold text-rose-700">Inventory</td>
                <td className="py-3 px-3 text-slate-800">Milk 1L Stock Depletion Warning</td>
                <td className="py-3 px-3 text-slate-500">Camera #02 Optical + Weight Sensor</td>
                <td className="py-3 px-3">
                  <span className="text-amber-700 font-bold">Pending Restock</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
