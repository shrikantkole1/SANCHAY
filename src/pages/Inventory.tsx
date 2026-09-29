import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import type { ProductInventory } from '../types';
import { 
  AlertTriangle, 
  Package, 
  Search, 
  RefreshCw, 
  Scale, 
  Camera, 
  Receipt, 
  ChevronRight, 
  Plus, 
  Check, 
  ShieldAlert, 
  TrendingDown, 
  Layers, 
  X,
  Sparkles
} from 'lucide-react';

export const InventoryPage: React.FC = () => {
  const { 
    inventory, 
    selectedProduct, 
    setSelectedProduct, 
    replenishProduct, 
    createTaskFromAlert,
    setActiveTab 
  } = useAppStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredProducts = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.zone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const currentProd = selectedProduct || inventory[0];

  const handleDispatchTask = (prod: ProductInventory) => {
    setActiveTab('tasks');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Inventory Intelligence & Multi-Signal Reconciliation</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              Triangulated Stock
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time shelf gap detection, stock-out risk prevention, and physical-to-digital inventory reconciliation.
          </p>
        </div>

        <button
          onClick={() => replenishProduct('prod-1')}
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Replenish Milk 1L (Simulate)</span>
        </button>
      </div>

      {/* 4 Inventory KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Stock Alerts</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-600">14</span>
            <span className="text-xs text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-medium">Critical</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Active Depletion Flags</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Low Stock</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">21</span>
            <span className="text-xs text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium">&lt; 25% Buffer</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Below Reorder Point</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Shelf Gaps</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-600">8</span>
            <span className="text-xs text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">Facing Voids</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Visible Empty Slots on Cam</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Replenishment</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">12</span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">In Queue</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Tasks Dispatched to Floor</p>
        </div>
      </div>

      {/* Main Grid: Stock Alert Table (Left) + Product Detail & Reconciliation Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Stock Alert Table</h2>
              <span className="text-xs text-slate-500">Click any row to inspect signals and reconciliation</span>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search SKU or name..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3">Zone</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Risk</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((prod) => {
                  const isSelected = currentProd.id === prod.id;
                  return (
                    <tr
                      key={prod.id}
                      onClick={() => setSelectedProduct(prod)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-emerald-50/70 border-l-2 border-emerald-600' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 block">{prod.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{prod.sku}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {prod.zone.split('(')[0]}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prod.status === 'stock-risk'
                            ? 'bg-rose-50 text-rose-700'
                            : prod.status === 'low-stock'
                            ? 'bg-amber-50 text-amber-700'
                            : prod.status === 'shelf-gap'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {prod.status === 'stock-risk' && 'Stock Risk'}
                          {prod.status === 'low-stock' && 'Low Stock'}
                          {prod.status === 'shelf-gap' && 'Shelf Gap'}
                          {prod.status === 'optimal' && 'Optimal'}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold">
                        <span className={
                          prod.risk === 'High' ? 'text-rose-600' :
                          prod.risk === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                        }>
                          {prod.risk}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-700">
                        {prod.action}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <ChevronRight className="w-4 h-4 text-slate-400 inline" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Product Detail & Reconciliation */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-card space-y-4">
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                Product Detail Inspection
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{currentProd.name}</h3>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                SKU: <strong className="text-slate-700">{currentProd.sku}</strong> • {currentProd.category}
              </div>
            </div>

            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
              currentProd.status === 'optimal'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              {currentProd.status === 'optimal' ? 'Optimal' : 'Stock Risk'}
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Expected</span>
              <span className="text-xl font-bold text-slate-900">{currentProd.expectedStock}</span>
              <span className="text-[9px] text-slate-400 block">POS / ERP</span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-700 uppercase block font-semibold">Detected</span>
              <span className="text-xl font-bold text-emerald-700">{currentProd.detectedStock}</span>
              <span className="text-[9px] text-emerald-600 block">Camera AI</span>
            </div>
            <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200">
              <span className="text-[10px] text-purple-700 uppercase block font-semibold">POS Stock</span>
              <span className="text-xl font-bold text-purple-700">{currentProd.posStock}</span>
              <span className="text-[9px] text-purple-600 block">Register Sync</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Shelf Availability:</span>
              <span className="font-semibold text-slate-800">{currentProd.shelfAvailability}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Last Replenished:</span>
              <span className="font-mono text-slate-700">{currentProd.lastReplenishment}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Recommended Action:</span>
              <span className="font-bold text-amber-700">{currentProd.action}</span>
            </div>
          </div>

          {/* Sanchay Distinctive Feature: Physical–Digital Reconciliation Panel */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Physical–Digital Reconciliation</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                Triple Signal
              </span>
            </div>

            {/* 3 Sources Visual */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded bg-white border border-slate-200 shadow-sm">
                <Receipt className="w-4 h-4 mx-auto mb-1 text-slate-500" />
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">POS / ERP</span>
                <span className="font-bold text-slate-800">Expected: {currentProd.expectedStock}</span>
              </div>
              <div className="p-2 rounded bg-white border border-emerald-300 shadow-sm">
                <Camera className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                <span className="text-[10px] text-emerald-700 uppercase block font-semibold">Camera</span>
                <span className="font-bold text-emerald-700">Detected: {currentProd.detectedStock}</span>
              </div>
              <div className="p-2 rounded bg-white border border-purple-300 shadow-sm">
                <Scale className="w-4 h-4 mx-auto mb-1 text-purple-600" />
                <span className="text-[10px] text-purple-700 uppercase block font-semibold">Weight</span>
                <span className="font-bold text-purple-700">Estimated: {currentProd.weightEstimatedStock}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800">Variance: {currentProd.variance} unit</span>
                <p className="text-[11px] text-slate-500 mt-0.5">{currentProd.investigationReason}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                currentProd.reconciliationStatus === 'Reconciled'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {currentProd.reconciliationStatus}
              </span>
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => handleDispatchTask(currentProd)}
              className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Dispatch Restock Task</span>
            </button>
            <button
              onClick={() => replenishProduct(currentProd.id)}
              className="py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
            >
              Simulate Restock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
