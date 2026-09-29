export type ZoneActivity = 'low' | 'medium' | 'high';
export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'verified';
export type AlertCategory = 'inventory' | 'queue' | 'shopper' | 'system';

export interface Zone {
  id: string;
  name: string;
  code: string;
  shoppers: number;
  avgDwell: string;
  dwellSeconds: number;
  activity: ZoneActivity;
  alertCount: number;
  status: 'normal' | 'warning' | 'alert';
  category: string;
  cameraId: string;
}

export interface ProductInventory {
  id: string;
  name: string;
  sku: string;
  zone: string;
  category: string;
  expectedStock: number; // POS / ERP
  detectedStock: number; // Camera AI
  posStock: number;      // Cash register sync
  weightEstimatedStock: number; // Weight sensor shelf
  status: 'stock-risk' | 'low-stock' | 'shelf-gap' | 'optimal';
  risk: 'High' | 'Medium' | 'Low';
  action: string;
  shelfAvailability: string; // e.g. "Low (40%)"
  lastReplenishment: string;
  variance: number;
  reconciliationStatus: 'Needs Investigation' | 'Reconciled';
  investigationReason: string;
}

export interface QueueCounter {
  id: number;
  name: string;
  people: number;
  waitTime: string;
  waitSeconds: number;
  status: 'open' | 'closed' | 'congested';
  operator: string;
}

export interface QueuePrediction {
  currentCount: number;
  in5Min: number;
  in10Min: number;
  congestionRisk: 'High' | 'Medium' | 'Low';
  recommendedAction: string;
}

export interface AlertItem {
  id: string;
  category: AlertCategory;
  priority: 'high' | 'medium' | 'low' | 'verified';
  title: string;
  description: string;
  location: string;
  action: string;
  status: 'active' | 'acknowledged' | 'assigned' | 'completed' | 'verified';
  timestamp: string;
}

export interface StoreTask {
  id: string;
  title: string;
  location: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Assigned' | 'In Progress' | 'Completed' | 'Verified';
  assignee?: string;
  timestamp: string;
  verificationSource?: string;
  verificationMessage?: string;
}

export interface CameraDevice {
  id: string;
  name: string;
  location: string;
  status: 'LIVE' | 'STANDBY' | 'SYNCING';
  shoppersCount: number;
  activeAlert?: string;
  alertType?: 'stock' | 'queue' | 'traffic';
  fps: number;
  edgeLatencyMs: number;
  resolution: string;
  zoneId: string;
}

export interface EdgeSystemState {
  edgeAiActive: boolean;
  videoProcessing: 'Local';
  cloudDependency: 'Not Required';
  isOffline: boolean;
  isSyncing: boolean;
  pendingEvents: number;
  lastSyncTime: string;
}
