import React from 'react';
import { useAppStore } from './store/appStore';
import { DashboardLayout } from './layouts/DashboardLayout';
import { OverviewPage } from './pages/Overview';
import { LiveStorePage } from './pages/LiveStore';
import { ShoppersPage } from './pages/Shoppers';
import { InventoryPage } from './pages/Inventory';
import { QueuesPage } from './pages/Queues';
import { AlertsPage } from './pages/Alerts';
import { TasksPage } from './pages/Tasks';
import { ReportsPage } from './pages/Reports';
import { SystemPage } from './pages/System';
import { SettingsPage } from './pages/Settings';

export const App: React.FC = () => {
  const { activeTab } = useAppStore();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage />;
      case 'livestore':
        return <LiveStorePage />;
      case 'shoppers':
        return <ShoppersPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'queues':
        return <QueuesPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'tasks':
        return <TasksPage />;
      case 'reports':
        return <ReportsPage />;
      case 'system':
        return <SystemPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return <DashboardLayout>{renderActivePage()}</DashboardLayout>;
};

export default App;
