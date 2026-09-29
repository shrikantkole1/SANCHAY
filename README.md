# Sanchay AI — Retail Intelligence Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-sanchay--theta.vercel.app-10B981?style=for-the-badge&logo=vercel&logoColor=white)](http://sanchay-theta.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

> **Live Deployment:** [http://sanchay-theta.vercel.app/](http://sanchay-theta.vercel.app/)  
> **Repository:** [https://github.com/shrikantkole1/SANCHAY.git](https://github.com/shrikantkole1/SANCHAY.git)

---

## 1. Executive Summary

**Sanchay AI** is an enterprise AI-powered retail intelligence and store operations platform. It converts standard CCTV camera feeds and physical sensor streams into actionable, business-level operational decisions.

Instead of presenting store managers with unmanageable video streams, Sanchay AI operationalizes video data through a closed-loop philosophy:

```
Camera Data → AI Detection → Business Insight → Alert → Recommended Action → Verification
```

### The 4 Pillars

| Pillar | Focus | What the Platform Delivers |
|---|---|---|
| **SEE** | Computer Vision Ingestion | Real-time shopper counts, zone dwell times, and cashier queues |
| **UNDERSTAND** | Predictive Intelligence | Shelf stock-out risks, dwell spikes, and 10-minute queue congestion forecasts |
| **ACT** | Autonomous Dispatch | Prioritized store alerts and mobile replenishment tasks for floor associates |
| **VERIFY** | Closed-Loop Confirmation | Camera AI automatically inspects shelves to verify that completed tasks restored physical availability |

---

## 2. Core Operational Modules

Sanchay AI is organized into **10 primary operational modules** in a clean, modern white-theme SaaS dashboard:

### 1. Overview (Command Center)
- Real-time KPI summary:
  - **Shopper Footfall:** Daily entries and turnstile tracking (`1,248 visitors`, `↑ 12%`)
  - **Active Shoppers:** Real-time headcount inside the store (`87 active`)
  - **Stock Alerts:** Depletion warnings and shelf gaps (`14 flags`)
  - **Queue Status:** Open cashier lanes and wait-time bottlenecks (`3 active queues`)
  - **Pending Tasks:** Dispatched staff replenishment and lane opening workflows
- Store layout blueprint mini-preview.
- Predictive queue congestion snapshot with fast action triggers.

### 2. Live Store (Spatial Floorplan & Cameras)
- Simplified architectural store map showing zones:
  - **North Entrance:** Turnstile sensor beam and customer velocity tracking.
  - **Zone A:** Grocery & Staples.
  - **Zone B:** Electronics & Audio.
  - **Zone C:** Dairy & Chilled Beverages.
  - **Zone D:** Personal Care & Beauty.
  - **Checkout Lanes 1–4:** Queue density sensors.
- Synchronized camera feeds with toggleable **AI computer vision bounding boxes** (person detection, shelf voids, queue surge vectors).

### 3. Shoppers (Footfall & Spatial Heatmaps)
- Dwell time telemetry and peak visitation curves.
- Interactive multi-layer store heatmap:
  - **Filters:** `Today` | `7 Days` | `30 Days`
  - **Views:** `Traffic Density` | `Dwell Hotspots` | `Movement Trajectories`
- Micro-zone activity breakdown (Visitors, Average Dwell, Activity level, and Conversion scores).

### 4. Inventory Intelligence & Multi-Signal Reconciliation
- Real-time stock availability, out-of-stock risk prediction, and facing void tracking.
- **Physical–Digital Reconciliation Engine (Sanchay Core Triangulation):**
  - **Signal 1 (POS / ERP):** Digital expected balance (`42 units`)
  - **Signal 2 (Camera Vision):** Optical shelf count (`17 units`)
  - **Signal 3 (Smart Shelf Scale):** Weight sensor estimate (`18 units`)
  - **Variance Analysis:** Discrepancy detection (`Variance: 1 unit → Needs Investigation`)
- One-click task dispatch directly from product inspection drawers.

### 5. Queue Operations & Predictive Forecasting
- Lane-by-lane telemetry: Wait times, customer line length, cashier assignment, and status (`Open`, `Congested`, `Standby`).
- **10-Minute Queue Prediction Pipeline:**
  $$\text{Current: 6 people} \longrightarrow \text{In 5 min: 9 people} \longrightarrow \text{In 10 min: 13 people}$$
- Autonomous decision trigger: `⚠ High Congestion Risk → Open Checkout 4 Immediately`.
- Intra-day average waiting time trend line with SLA benchmarking.

### 6. Alerts & Incident Operations Center
- Structured incident feed adhering strictly to:
  $$\text{Problem} \longrightarrow \text{Location} \longrightarrow \text{Recommended Action} \longrightarrow \text{Status}$$
- Filterable by **Inventory**, **Queue**, **Shopper**, and **System** categories.
- Operations: Acknowledge alerts, convert alerts into staff tasks, and dismiss alerts.

### 7. Tasks & Closed-Loop Verification
- Complete operational lifecycle:
  $$\text{Detect} \longrightarrow \text{Alert} \longrightarrow \text{Assign} \longrightarrow \text{Complete} \longrightarrow \text{Verify}$$
- Staff task delegation with status tracking (`Pending`, `Assigned`, `In Progress`, `Completed`, `Verified`).
- **Camera AI Verification:** When staff marks a task complete, overhead computer vision automatically re-scans the shelf, verifies restock percentage (`98.4% Confidence`), and updates digital inventory records.

### 8. Reports & Operational Audits
- Daily and weekly KPI executive trends.
- SLA resolution tracking for shelf gaps (average resolution: `14.2 minutes`).
- Cashier queue compliance metrics and inventory variance clearances.
- Export options for CSV and Audit PDF.

### 9. System Infrastructure, Edge AI & Privacy
- **On-Premise NPU Health:** Local neural inference status (`30 FPS`, `14ms latency`).
- **Zero-Cloud-Video Guarantee:** Camera frames are processed strictly in local RAM and discarded immediately. No video leaves the retail store.
- **Offline Resilience Simulator:**
  - Cut internet connectivity to simulate store fiber loss.
  - Demonstrates that local camera AI, alarms, and staff dispatch continue operating without interruption.
  - Restoring connectivity uploads buffered events (`24 events synced ✓`).

### 10. Settings & Operational Thresholds
- Store location selector (Bengaluru Flagship, Koramangala Hypermarket, Whitefield Tech Hub).
- Computer vision queue congestion thresholds, high-dwell alert timers, and edge appliance calibration.

---

## 3. Technology Stack

- **Framework:** React 18 with Vite 6 & TypeScript
- **Styling:** Tailwind CSS with a clean enterprise SaaS light palette
- **State Management:** Zustand with local event simulation
- **Icons:** Lucide React
- **Visuals:** SVG vector floorplans, dynamic heatmap gradients, and canvas effects
- **Typography:** Plus Jakarta Sans & JetBrains Mono

---

## 4. Getting Started Locally

### Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+` or `v10+`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shrikantkole1/SANCHAY.git

# 2. Navigate to project root
cd SANCHAY

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Building for Production

```bash
npm run build
npm run preview
```

---

## 5. Live Demonstration

The application is deployed on Vercel:
👉 **[http://sanchay-theta.vercel.app/](http://sanchay-theta.vercel.app/)**

---

## 6. License

Proprietary © Sanchay AI. Built for enterprise retail intelligence and smart store operations.
