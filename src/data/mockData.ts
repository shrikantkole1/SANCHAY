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

export const initialZones: Zone[] = [
  {
    id: 'zone-a',
    name: 'Grocery & Staples',
    code: 'Zone A',
    shoppers: 42,
    avgDwell: '3m 12s',
    dwellSeconds: 192,
    activity: 'high',
    alertCount: 1,
    status: 'warning',
    category: 'Packaged Food',
    cameraId: 'CAM-01'
  },
  {
    id: 'zone-b',
    name: 'Electronics & Audio',
    code: 'Zone B',
    shoppers: 12,
    avgDwell: '6m 05s',
    dwellSeconds: 365,
    activity: 'medium',
    alertCount: 0,
    status: 'normal',
    category: 'Consumer Tech',
    cameraId: 'CAM-04'
  },
  {
    id: 'zone-c',
    name: 'Dairy & Beverages',
    code: 'Zone C',
    shoppers: 31,
    avgDwell: '4m 18s',
    dwellSeconds: 258,
    activity: 'high',
    alertCount: 2,
    status: 'alert',
    category: 'Chilled Goods',
    cameraId: 'CAM-02'
  },
  {
    id: 'zone-d',
    name: 'Personal Care & Beauty',
    code: 'Zone D',
    shoppers: 19,
    avgDwell: '2m 41s',
    dwellSeconds: 161,
    activity: 'low',
    alertCount: 0,
    status: 'normal',
    category: 'Cosmetics',
    cameraId: 'CAM-04'
  }
];

export const initialInventory: ProductInventory[] = [
  {
    id: 'prod-1',
    name: 'Milk 1L (Whole Farm Fresh)',
    sku: 'MILK001',
    zone: 'Dairy & Beverages (Zone C)',
    category: 'Dairy',
    expectedStock: 42,
    detectedStock: 17,
    posStock: 19,
    weightEstimatedStock: 18,
    status: 'stock-risk',
    risk: 'High',
    action: 'Replenish Shelf',
    shelfAvailability: 'Low Availability (40%)',
    lastReplenishment: '10:42 AM',
    variance: 1,
    reconciliationStatus: 'Needs Investigation',
    investigationReason: 'Optical camera detects 17 units vs POS expectation of 19. Smart shelf load cells confirm 18 units. Physical shelf inventory is below safety buffer.'
  },
  {
    id: 'prod-2',
    name: 'Cola 500ml Sparkling Soda',
    sku: 'COLA500',
    zone: 'Dairy & Beverages (Zone C)',
    category: 'Beverages',
    expectedStock: 60,
    detectedStock: 22,
    posStock: 25,
    weightEstimatedStock: 23,
    status: 'shelf-gap',
    risk: 'Medium',
    action: 'Check Shelf Facing',
    shelfAvailability: 'Facing Void (2 empty rows)',
    lastReplenishment: '09:15 AM',
    variance: 2,
    reconciliationStatus: 'Needs Investigation',
    investigationReason: 'Front slot void detected while rear stock remains pushed back. Merchandising facing required.'
  },
  {
    id: 'prod-3',
    name: 'Rice 5kg Premium Basmati',
    sku: 'RICE005',
    zone: 'Grocery & Staples (Zone A)',
    category: 'Grains',
    expectedStock: 25,
    detectedStock: 24,
    posStock: 24,
    weightEstimatedStock: 24,
    status: 'optimal',
    risk: 'Low',
    action: 'Action Verified',
    shelfAvailability: 'Full Stock (96%)',
    lastReplenishment: '12:10 PM',
    variance: 0,
    reconciliationStatus: 'Reconciled',
    investigationReason: 'Verified by Camera #01 after staff restocking. Triangulated across POS and shelf scales.'
  },
  {
    id: 'prod-4',
    name: 'Organic Almond Butter 350g',
    sku: 'BUTR350',
    zone: 'Grocery & Staples (Zone A)',
    category: 'Spreads',
    expectedStock: 18,
    detectedStock: 6,
    posStock: 7,
    weightEstimatedStock: 6,
    status: 'low-stock',
    risk: 'High',
    action: 'Restock from Backroom',
    shelfAvailability: 'Low (33%)',
    lastReplenishment: '08:30 AM',
    variance: 1,
    reconciliationStatus: 'Needs Investigation',
    investigationReason: 'Depletion rate exceeded morning forecast. Reserve stock available in aisle bay 4.'
  },
  {
    id: 'prod-5',
    name: 'Artisan Sourdough Loaf',
    sku: 'BAKE012',
    zone: 'Grocery & Staples (Zone A)',
    category: 'Bakery',
    expectedStock: 15,
    detectedStock: 14,
    posStock: 14,
    weightEstimatedStock: 14,
    status: 'optimal',
    risk: 'Low',
    action: 'Optimal Stock',
    shelfAvailability: 'Full (93%)',
    lastReplenishment: '11:00 AM',
    variance: 0,
    reconciliationStatus: 'Reconciled',
    investigationReason: 'All physical and digital signals match within 0% margin.'
  },
  {
    id: 'prod-6',
    name: 'Hydrating Face Wash 150ml',
    sku: 'BEAU089',
    zone: 'Personal Care (Zone D)',
    category: 'Skincare',
    expectedStock: 30,
    detectedStock: 18,
    posStock: 18,
    weightEstimatedStock: 18,
    status: 'shelf-gap',
    risk: 'Medium',
    action: 'Front-Face Display',
    shelfAvailability: 'Void Detected',
    lastReplenishment: 'Yesterday',
    variance: 0,
    reconciliationStatus: 'Reconciled',
    investigationReason: 'Digital inventory is accurate; visual packaging is pushed behind display rim.'
  }
];

export const initialQueues: QueueCounter[] = [
  {
    id: 1,
    name: 'Checkout 1',
    people: 4,
    waitTime: '2m 14s',
    waitSeconds: 134,
    status: 'open',
    operator: 'Ananya S.'
  },
  {
    id: 2,
    name: 'Checkout 2',
    people: 8,
    waitTime: '5m 42s',
    waitSeconds: 342,
    status: 'congested',
    operator: 'Vikram R.'
  },
  {
    id: 3,
    name: 'Checkout 3',
    people: 2,
    waitTime: '1m 08s',
    waitSeconds: 68,
    status: 'open',
    operator: 'Deepak K.'
  },
  {
    id: 4,
    name: 'Checkout 4',
    people: 0,
    waitTime: '0m 00s',
    waitSeconds: 0,
    status: 'closed',
    operator: 'On Standby'
  }
];

export const initialQueuePrediction: QueuePrediction = {
  currentCount: 6,
  in5Min: 9,
  in10Min: 13,
  congestionRisk: 'High',
  recommendedAction: 'Open Checkout 4'
};

export const initialAlerts: AlertItem[] = [
  {
    id: 'alt-1',
    category: 'queue',
    priority: 'high',
    title: 'High Queue Risk Detected',
    description: 'Checkout zone expected to exceed 12 persons threshold in 5 minutes due to grocery aisle influx.',
    location: 'Checkout Area (Counters 1-3)',
    action: 'Open Checkout 4 immediately',
    status: 'active',
    timestamp: '2 mins ago'
  },
  {
    id: 'alt-2',
    category: 'inventory',
    priority: 'high',
    title: 'Stock-Out Risk: Milk 1L',
    description: 'Milk 1L (Whole Farm Fresh) detected at 17 units. Predicted depletion within 35 minutes.',
    location: 'Dairy Zone (Aisle 3, Shelf B2)',
    action: 'Replenish Milk Shelf',
    status: 'active',
    timestamp: '5 mins ago'
  },
  {
    id: 'alt-3',
    category: 'inventory',
    priority: 'medium',
    title: 'Shelf Gap: Cola 500ml',
    description: 'Front facing vacancy detected on Tier 2 beverage cooler. Product is hidden behind display lip.',
    location: 'Beverage Zone (Cooler 4)',
    action: 'Front-face bottles & check stock',
    status: 'acknowledged',
    timestamp: '14 mins ago'
  },
  {
    id: 'alt-4',
    category: 'shopper',
    priority: 'medium',
    title: 'High Dwell Spike in Electronics',
    description: 'Average dwell in Zone B exceeded 6 minutes. Customer assistance recommended.',
    location: 'Electronics & Audio (Zone B)',
    action: 'Deploy Floor Associate',
    status: 'active',
    timestamp: '22 mins ago'
  },
  {
    id: 'alt-5',
    category: 'system',
    priority: 'verified',
    title: 'Action Verified: Rice 5kg Replenished',
    description: 'Camera #01 AI confirmed shelf stack restored to 24 units. Task closed and reconciled.',
    location: 'Grocery Zone (Aisle 1)',
    action: 'Reconciliation Complete',
    status: 'verified',
    timestamp: '32 mins ago'
  }
];

export const initialTasks: StoreTask[] = [
  {
    id: 'task-101',
    title: 'Replenish Milk 1L Shelf',
    location: 'Dairy & Beverages (Zone C)',
    priority: 'High',
    status: 'Pending',
    assignee: 'Sunil K. (Floor Staff)',
    timestamp: '10:45 AM'
  },
  {
    id: 'task-102',
    title: 'Check Cola 500ml Shelf Gap',
    location: 'Beverage Zone (Zone C)',
    priority: 'Medium',
    status: 'Assigned',
    assignee: 'Priya N. (Merchandiser)',
    timestamp: '10:30 AM'
  },
  {
    id: 'task-103',
    title: 'Open Checkout Counter 4',
    location: 'Checkout Zone',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Vikram R. (Cashier Lead)',
    timestamp: '10:48 AM'
  },
  {
    id: 'task-104',
    title: 'Replenish Rice 5kg Bags',
    location: 'Grocery Zone (Zone A)',
    priority: 'High',
    status: 'Verified',
    assignee: 'Sunil K.',
    timestamp: '10:15 AM',
    verificationSource: 'Camera #01 (Grocery East Overlook)',
    verificationMessage: 'Camera AI confirmed shelf replenishment at 10:22 AM. Availability restored to 96%.'
  }
];

export const initialCameras: CameraDevice[] = [
  {
    id: 'CAM-01',
    name: 'Camera 01 - Entrance & Grocery',
    location: 'Main North Gate / Zone A',
    status: 'LIVE',
    shoppersCount: 23,
    activeAlert: 'Normal Traffic Flow',
    alertType: 'traffic',
    fps: 30,
    edgeLatencyMs: 14,
    resolution: '1920x1080 @ 60Hz',
    zoneId: 'zone-a'
  },
  {
    id: 'CAM-02',
    name: 'Camera 02 - Dairy & Beverage Coolers',
    location: 'Zone C Cooler Wall',
    status: 'LIVE',
    shoppersCount: 18,
    activeAlert: 'Shelf Alert: Milk 1L Low Availability',
    alertType: 'stock',
    fps: 30,
    edgeLatencyMs: 12,
    resolution: '1920x1080 @ 60Hz',
    zoneId: 'zone-c'
  },
  {
    id: 'CAM-03',
    name: 'Camera 03 - Front Checkout Lanes',
    location: 'Registers 1-4 Overhead',
    status: 'LIVE',
    shoppersCount: 14,
    activeAlert: 'Queue Spike: Counter 2 Exceeding 7 Persons',
    alertType: 'queue',
    fps: 30,
    edgeLatencyMs: 15,
    resolution: '1920x1080 @ 60Hz',
    zoneId: 'checkout'
  },
  {
    id: 'CAM-04',
    name: 'Camera 04 - Electronics & Personal Care',
    location: 'South Hallway / Zone B & D',
    status: 'LIVE',
    shoppersCount: 12,
    activeAlert: 'Normal Dwell Activity',
    alertType: 'traffic',
    fps: 30,
    edgeLatencyMs: 16,
    resolution: '1920x1080 @ 60Hz',
    zoneId: 'zone-b'
  }
];

export const initialEdgeStatus: EdgeSystemState = {
  edgeAiActive: true,
  videoProcessing: 'Local',
  cloudDependency: 'Not Required',
  isOffline: false,
  isSyncing: false,
  pendingEvents: 0,
  lastSyncTime: 'Just now (13:54:10)'
};
