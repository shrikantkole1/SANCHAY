import React from 'react';
import { useAppStore } from '../store/appStore';
import { 
  ShieldCheck, 
  Cpu, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Lock, 
  CheckCircle2, 
  Server, 
  Camera, 
  Activity,
  Layers,
  Zap
} from 'lucide-react';

export const SystemPage: React.FC = () => {
  const { edgeStatus, toggleOfflineMode, triggerSync, cameras } = useAppStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>System Infrastructure, Edge AI & Privacy</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
            On-Premise NPU Stack
          </span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor on-premise neural processing units, camera telemetry, local data privacy enforcement, and offline resilience.
        </p>
      </div>

      {/* Edge Processing & Resilience Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel 1: Edge & Privacy Health */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Edge Privacy & Neural Engine</h2>
                <span className="text-xs text-slate-500">Zero raw video transmitted to external cloud</span>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Neural Inference Mode</span>
                <span className="text-slate-500">Local edge accelerator</span>
              </div>
              <span className="font-bold text-emerald-700 font-mono">14ms Average Latency</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Video Processing Location</span>
                <span className="text-slate-500">In-store NPU appliance</span>
              </div>
              <span className="font-bold text-slate-800">100% On-Premise</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Cloud Dependency</span>
                <span className="text-slate-500">Inference & alert pipeline</span>
              </div>
              <span className="font-bold text-slate-600">Not Required</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Privacy Compliance</span>
                <span className="text-slate-500">GDPR & India DPDP compliant</span>
              </div>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Enforced
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              <span>Zero Video Retention Architecture</span>
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-800">
              Camera feeds are processed in volatile RAM buffers and immediately discarded after vector extraction. No customer facial biometrics or personally identifiable footage is ever stored or transmitted.
            </p>
          </div>
        </div>

        {/* Panel 2: Offline Resilience Simulator */}
        <div className={`border rounded-xl p-5 shadow-card space-y-4 transition ${
          edgeStatus.isOffline
            ? 'bg-amber-50/40 border-amber-300 ring-2 ring-amber-100'
            : edgeStatus.isSyncing
            ? 'bg-blue-50/40 border-blue-300'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Network Resilience Simulator</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  edgeStatus.isOffline ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {edgeStatus.isOffline ? 'Offline Active' : 'Connected'}
                </span>
              </h2>
              <span className="text-xs text-slate-500">Simulate loss of internet connectivity to demonstrate edge autonomy</span>
            </div>

            <button
              onClick={toggleOfflineMode}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                edgeStatus.isOffline
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              {edgeStatus.isOffline ? (
                <>
                  <Wifi className="w-3.5 h-3.5" />
                  <span>Restore Network</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Cut Internet</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-sm">
              <span className="font-semibold text-slate-700">Local AI Video Inference</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Running Locally
              </span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-sm">
              <span className="font-semibold text-slate-700">Camera Feed Ingestion</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 4 Streams @ 30 FPS
              </span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-sm">
              <span className="font-semibold text-slate-700">In-Store Alerts & Task Dispatch</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Local WebSocket Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-sm">
              <span className="font-semibold text-slate-700">Cloud Sync Status</span>
              <span className={`font-bold ${
                edgeStatus.isOffline ? 'text-amber-700' : edgeStatus.isSyncing ? 'text-blue-700' : 'text-emerald-700'
              }`}>
                {edgeStatus.isOffline ? 'Waiting for link...' : edgeStatus.isSyncing ? 'Uploading Buffered Events...' : '✓ Synchronized'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-sm">
              <span className="font-semibold text-slate-700">Locally Buffered Events</span>
              <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {edgeStatus.pendingEvents} queued
              </span>
            </div>
          </div>

          {!edgeStatus.isOffline && edgeStatus.pendingEvents > 0 && (
            <button
              onClick={triggerSync}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Synchronize {edgeStatus.pendingEvents} Buffered Events to Cloud</span>
            </button>
          )}

          <div className="text-[11px] text-slate-500 pt-1">
            Last Successful Sync: <strong className="text-slate-700">{edgeStatus.lastSyncTime}</strong>
          </div>
        </div>
      </div>

      {/* Camera Grid Health Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Ceiling Camera Hardware Grid</h2>
            <span className="text-xs text-slate-500">Connected RTSP/ONVIF edge sensors</span>
          </div>
          <span className="text-xs font-mono text-emerald-700 font-bold">4 / 4 Devices Healthy</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Device ID</th>
                <th className="py-2.5 px-3">Camera Name</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">FPS</th>
                <th className="py-2.5 px-3">Edge Latency</th>
                <th className="py-2.5 px-3">Resolution</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cameras.map((cam) => (
                <tr key={cam.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-slate-800">{cam.id}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{cam.name}</td>
                  <td className="py-3 px-3 text-slate-600">{cam.location}</td>
                  <td className="py-3 px-3 font-mono text-slate-700">{cam.fps} FPS</td>
                  <td className="py-3 px-3 font-mono text-emerald-700 font-semibold">{cam.edgeLatencyMs}ms</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{cam.resolution}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      LIVE
                    </span>
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
