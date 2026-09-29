import { create } from 'zustand';
import type { 
  Zone, 
  ProductInventory, 
  QueueCounter, 
  QueuePrediction, 
  AlertItem, 
  StoreTask, 
  CameraDevice, 
  EdgeSystemState 
} from '../types';
import { 
  initialZones, 
  initialInventory, 
  initialQueues, 
  initialQueuePrediction, 
  initialAlerts, 
  initialTasks, 
  initialCameras, 
  initialEdgeStatus 
} from '../data/mockData';

export type NavigationTab = 
  | 'overview' 
  | 'livestore' 
  | 'shoppers' 
  | 'inventory' 
  | 'queues' 
  | 'alerts' 
  | 'tasks' 
  | 'reports' 
  | 'system' 
  | 'settings';

interface AppState {
  // Navigation & Store Identity
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  activeStore: string;
  setActiveStore: (store: string) => void;

  // Real-time Simulation Engine
  isSimulating: boolean;
  toggleSimulation: () => void;

  // Key Operational KPIs
  footfallToday: number;
  activeShoppers: number;
  avgDwellTime: string;
  activeZonesCount: string;

  // Domain Collections
  zones: Zone[];
  inventory: ProductInventory[];
  selectedProduct: ProductInventory | null;
  setSelectedProduct: (product: ProductInventory | null) => void;

  queues: QueueCounter[];
  queuePrediction: QueuePrediction;
  alerts: AlertItem[];
  tasks: StoreTask[];
  cameras: CameraDevice[];
  edgeStatus: EdgeSystemState;

  // Filter States
  timeFilter: 'Today' | '7 Days' | '30 Days';
  setTimeFilter: (val: 'Today' | '7 Days' | '30 Days') => void;
  heatmapMode: 'Traffic' | 'Dwell' | 'Movement';
  setHeatmapMode: (val: 'Traffic' | 'Dwell' | 'Movement') => void;

  // Actionable SaaS Methods
  acknowledgeAlert: (alertId: string) => void;
  dismissAlert: (alertId: string) => void;
  createTaskFromAlert: (alert: AlertItem) => void;

  updateTaskStatus: (taskId: string, newStatus: StoreTask['status']) => void;
  verifyTaskWithCamera: (taskId: string) => void;

  executeQueueRecommendation: () => void;
  replenishProduct: (productId: string) => void;

  toggleOfflineMode: () => void;
  triggerSync: () => void;

  simulateShopperEntrance: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
  activeStore: 'Store #104 — Indiranagar Flagship, Bengaluru',
  setActiveStore: (store) => set({ activeStore: store }),

  isSimulating: true,
  toggleSimulation: () => set((state) => ({ isSimulating: !state.isSimulating })),

  footfallToday: 1248,
  activeShoppers: 87,
  avgDwellTime: '4m 32s',
  activeZonesCount: '6 / 8',

  zones: initialZones,
  inventory: initialInventory,
  selectedProduct: initialInventory[0],
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  queues: initialQueues,
  queuePrediction: initialQueuePrediction,
  alerts: initialAlerts,
  tasks: initialTasks,
  cameras: initialCameras,
  edgeStatus: initialEdgeStatus,

  timeFilter: 'Today',
  setTimeFilter: (val) => set({ timeFilter: val }),
  heatmapMode: 'Traffic',
  setHeatmapMode: (val) => set({ heatmapMode: val }),

  acknowledgeAlert: (alertId) => {
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId ? { ...a, status: 'acknowledged' } : a
      )
    }));
  },

  dismissAlert: (alertId) => {
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== alertId)
    }));
  },

  createTaskFromAlert: (alert) => {
    const newTask: StoreTask = {
      id: `task-${Date.now()}`,
      title: alert.action,
      location: alert.location,
      priority: alert.priority === 'high' ? 'High' : 'Medium',
      status: 'Assigned',
      assignee: 'Sunil K. (Floor Associate)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    set((state) => ({
      tasks: [newTask, ...state.tasks],
      alerts: state.alerts.map((a) =>
        a.id === alert.id ? { ...a, status: 'assigned' } : a
      ),
      activeTab: 'tasks'
    }));
  },

  updateTaskStatus: (taskId, newStatus) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    }));
  },

  verifyTaskWithCamera: (taskId) => {
    set((state) => {
      const task = state.tasks.find((t) => t.id === taskId);
      const isMilk = task?.title.toLowerCase().includes('milk');

      const updatedTasks = state.tasks.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: 'Verified' as const,
            verificationSource: 'Camera #02 (Dairy & Beverage Overhead)',
            verificationMessage: 'Camera AI computer vision verified shelf inventory fully restored to 42 units (100% capacity).'
          };
        }
        return t;
      });

      let updatedInventory = state.inventory;
      if (isMilk) {
        updatedInventory = state.inventory.map((p) =>
          p.sku === 'MILK001'
            ? {
                ...p,
                status: 'optimal' as const,
                detectedStock: 42,
                expectedStock: 42,
                posStock: 42,
                weightEstimatedStock: 42,
                variance: 0,
                reconciliationStatus: 'Reconciled' as const,
                shelfAvailability: 'Optimal (100%)',
                lastReplenishment: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            : p
        );
      }

      const verifiedAlert: AlertItem = {
        id: `alt-v-${Date.now()}`,
        category: 'system',
        priority: 'verified',
        title: `Verification Success: ${task?.title || 'Restock Task'}`,
        description: 'Camera computer vision confirmed physical replenishment is complete and reconciled.',
        location: task?.location || 'Store Floor',
        action: 'Reconciliation Closed',
        status: 'verified',
        timestamp: 'Just now'
      };

      return {
        tasks: updatedTasks,
        inventory: updatedInventory,
        selectedProduct: isMilk && state.selectedProduct?.sku === 'MILK001' ? updatedInventory[0] : state.selectedProduct,
        alerts: [verifiedAlert, ...state.alerts]
      };
    });
  },

  executeQueueRecommendation: () => {
    set((state) => ({
      queues: state.queues.map((q) => {
        if (q.id === 4) {
          return { ...q, status: 'open' as const, people: 1, waitTime: '0m 45s', operator: 'Rajiv N. (Assigned)' };
        }
        if (q.id === 2) {
          return { ...q, people: 4, waitTime: '2m 50s', status: 'open' as const };
        }
        return q;
      }),
      queuePrediction: {
        currentCount: 8,
        in5Min: 6,
        in10Min: 4,
        congestionRisk: 'Low',
        recommendedAction: 'All counters load balanced'
      },
      tasks: [
        {
          id: `task-q-${Date.now()}`,
          title: 'Opened Checkout 4 to balance peak queue surge',
          location: 'Checkout 4',
          priority: 'High',
          status: 'Completed',
          assignee: 'Rajiv N.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        ...state.tasks
      ]
    }));
  },

  replenishProduct: (productId) => {
    set((state) => {
      const updatedInventory = state.inventory.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            detectedStock: item.expectedStock,
            posStock: item.expectedStock,
            weightEstimatedStock: item.expectedStock,
            status: 'optimal' as const,
            risk: 'Low' as const,
            action: 'Action Verified',
            shelfAvailability: 'Fully Restocked (100%)',
            variance: 0,
            reconciliationStatus: 'Reconciled' as const,
            lastReplenishment: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return item;
      });

      return {
        inventory: updatedInventory,
        selectedProduct: state.selectedProduct?.id === productId ? updatedInventory.find(p => p.id === productId) || null : state.selectedProduct
      };
    });
  },

  toggleOfflineMode: () => {
    const current = get().edgeStatus;
    if (!current.isOffline) {
      set({
        edgeStatus: {
          ...current,
          isOffline: true,
          isSyncing: false,
          pendingEvents: 14
        }
      });
    } else {
      set({
        edgeStatus: {
          ...current,
          isOffline: false,
          isSyncing: true
        }
      });

      setTimeout(() => {
        set((state) => ({
          edgeStatus: {
            ...state.edgeStatus,
            isSyncing: false,
            pendingEvents: 0,
            lastSyncTime: new Date().toLocaleTimeString()
          }
        }));
      }, 2500);
    }
  },

  triggerSync: () => {
    set((state) => ({
      edgeStatus: { ...state.edgeStatus, isSyncing: true }
    }));
    setTimeout(() => {
      set((state) => ({
        edgeStatus: {
          ...state.edgeStatus,
          isSyncing: false,
          pendingEvents: 0,
          lastSyncTime: new Date().toLocaleTimeString()
        }
      }));
    }, 2000);
  },

  simulateShopperEntrance: () => {
    set((state) => ({
      activeShoppers: state.activeShoppers + 1,
      footfallToday: state.footfallToday + 1,
      zones: state.zones.map((z) =>
        z.id === 'zone-a' ? { ...z, shoppers: z.shoppers + 1, activity: 'high' } : z
      )
    }));
  }
}));
