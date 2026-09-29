import React, { useState, useEffect } from 'react';
import { useAppStore, NavigationTab } from '../store/appStore';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  Boxes, 
  Clock3, 
  AlertTriangle, 
  CheckSquare, 
  FileText, 
  Cpu, 
  Settings, 
  Bell, 
  ChevronDown, 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  Store, 
  RefreshCw, 
  Menu, 
  X,
  Sparkles,
  Play,
  Pause
} from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({ children }) => {
  const { 
    activeTab, 
    setActiveTab, 
    activeStore, 
    setActiveStore, 
    edgeStatus, 
    toggleOfflineMode, 
    alerts,
    isSimulating,
    toggleSimulation,
    simulateShopperEntrance
  } = useAppStore();

  const [currentTime, setCurrentTime] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showStoreDropdown, setShowStoreDropdown] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Live Clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Real-time Simulation Tick (subtle footfall updates every 8 seconds)
  useEffect(() => {
    let timer: any;
    if (isSimulating) {
      timer = setInterval(() => {
        simulateShopperEntrance();
      }, 9000);
    }
    return () => clearInterval(timer);
  }, [isSimulating, simulateShopperEntrance]);

  const stores = [
    'Store #104 — Indiranagar Flagship, Bengaluru',
    'Store #102 — Koramangala Hypermarket, Bengaluru',
    'Store #108 — Whitefield Tech Hub, Bengaluru'
  ];

  // The 10 Primary Modules requested:
  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'livestore', label: 'Live Store', icon: Map },
    { id: 'shoppers', label: 'Shoppers', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'queues', label: 'Queues', icon: Clock3 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: alerts.length },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'system', label: 'System', icon: Cpu },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Offline Mode / Syncing Alert Banner */}
      {edgeStatus.isOffline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4" />
            <span>
              <strong>OFFLINE MODE:</strong> Network connection lost. Local Edge AI is running uninterrupted on-premise ({edgeStatus.pendingEvents} events buffered).
            </span>
          </div>
          <button
            onClick={toggleOfflineMode}
            className="px-2.5 py-0.5 rounded bg-slate-950 text-amber-300 text-[11px] font-semibold hover:bg-slate-900 transition"
          >
            Reconnect
          </button>
        </div>
      )}

      {edgeStatus.isSyncing && (
        <div className="bg-blue-600 text-white px-4 py-1.5 text-xs font-bold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>
              <strong>SYNCING WITH CLOUD:</strong> Uploading {edgeStatus.pendingEvents} buffered camera & stock events...
            </span>
          </div>
          <span className="text-[11px] font-mono uppercase bg-blue-700 text-white px-2 py-0.5 rounded">
            Syncing...
          </span>
        </div>
      )}

      {/* TOP SAAS HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 lg:px-6 py-2.5 shadow-subtle">
        <div className="flex items-center justify-between gap-4">
          {/* Left Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div 
              className="flex items-center gap-2.5 cursor-pointer" 
              onClick={() => setActiveTab('overview')}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-slate-900">Sanchay AI</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    Retail OS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            {/* Simulation Status Toggle */}
            <button
              onClick={toggleSimulation}
              title={isSimulating ? "Live Event Stream Running" : "Live Event Stream Paused"}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition ${
                isSimulating 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              {isSimulating ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Live Stream</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3" />
                  <span>Paused</span>
                </>
              )}
            </button>

            {/* Store Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowStoreDropdown(!showStoreDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-slate-300 transition shadow-subtle"
              >
                <Store className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold max-w-[200px] truncate">{activeStore.split('—')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showStoreDropdown && (
                <div className="absolute right-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-dropdown py-1 z-50 text-xs">
                  {stores.map((s) => (
                    <div
                      key={s}
                      onClick={() => {
                        setActiveStore(s);
                        setShowStoreDropdown(false);
                      }}
                      className={`px-3 py-2 cursor-pointer transition ${
                        activeStore === s ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Digital Clock */}
            <div className="hidden lg:flex items-center font-mono text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              <span className="font-semibold">{currentTime || '13:54:00'}</span>
            </div>

            {/* Connectivity Pill with Toggle */}
            <button
              onClick={toggleOfflineMode}
              title="Click to simulate network disconnection"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition ${
                edgeStatus.isOffline
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
            >
              {edgeStatus.isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Offline</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5" />
                  <span>Edge Online</span>
                </>
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 transition"
              >
                <Bell className="w-4 h-4" />
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-black text-white flex items-center justify-center">
                    {alerts.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-dropdown p-3 z-50 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Alerts ({alerts.length})</span>
                    <button
                      onClick={() => {
                        setActiveTab('alerts');
                        setShowNotifications(false);
                      }}
                      className="text-[11px] text-emerald-600 font-semibold hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {alerts.slice(0, 3).map((a) => (
                      <div key={a.id} className="p-2 rounded-lg bg-slate-50 text-xs">
                        <div className="font-semibold text-slate-900">{a.title}</div>
                        <div className="text-[10px] text-slate-500">{a.location} • {a.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                RM
              </div>
              <div className="hidden xl:block text-left text-[11px] leading-tight">
                <div className="font-bold text-slate-800">Rajesh M.</div>
                <div className="text-slate-400 text-[10px]">Store Ops Manager</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER: SIDEBAR + CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR with ONLY the 10 Primary Modules */}
        <aside aria-label="Primary Navigation" className={`fixed inset-y-0 left-0 z-30 w-56 bg-white border-r border-slate-200 p-3 flex flex-col justify-between transform transition-transform duration-200 lg:translate-x-0 lg:static shrink-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="space-y-4 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
              Store Operations
            </span>

            <nav className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-bold shadow-subtle border border-emerald-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Edge AI Status */}
          <div className="pt-3 border-t border-slate-100">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Edge AI Engine</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Camera data processed locally. Zero cloud footage retention.
              </p>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT VIEW */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
