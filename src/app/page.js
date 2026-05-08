
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { calcCosts, fmt, fmtM } from "@/utils/calculations";
import InvestmentPlanView from "./InvestmentPlanView";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function FarmPlanner() {
  const [acres, setAcres] = useState(5);
  const [activeTab, setActiveTab] = useState("boq");
  const [costs, setCosts] = useState(null);

  useEffect(() => {
    setCosts(calcCosts(acres));
  }, [acres]);

  if (!costs) return null;

  return (
    <main className="app-container">
      <header>
        <div className="logo-container logo-left">
          <Image src="/ahmro-global-logo.png" alt="Ahmro Global Logo" width={150} height={50} priority />
        </div>
        <div className="header-title">
          <p className="project-name">Aqeela-e-Bani Hashim</p>
          <p>Self Sustainable</p>
          <h1>OFF Grid Farming Solution</h1>
        </div>
        <div className="logo-container logo-right">
          <Image src="/arb-farms-logo.jpeg" alt="ARB Farms Logo" width={150} height={50} priority />
        </div>
      </header>

      <div className="controls-section">
        <div className="acre-input-group">
          <label htmlFor="acreSlider">Farm Size:</label>
          <input
            type="range"
            id="acreSlider"
            min="1"
            max="50"
            value={acres}
            onChange={(e) => setAcres(parseInt(e.target.value))}
          />
          <div className="acre-display"><span>{acres}</span> Acres</div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Grand Total Est.</div>
          <div className="metric-value">{fmtM(costs.grand)}</div>
          <div className="metric-sub">PKR Includes Overheads</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Cost / Acre</div>
          <div className="metric-value">{fmtM(costs.grand / acres)}</div>
          <div className="metric-sub">Average Investment</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Livestock Cap.</div>
          <div className="metric-value">{costs.cowCount + costs.buffCount} Heads</div>
          <div className="metric-sub">{costs.animalShedMarla} Marla Facility</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Solar Power</div>
          <div className="metric-value">{costs.solarKW} KW</div>
          <div className="metric-sub">Hybrid Backup System</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Plantation</div>
          <div className="metric-value">{costs.orchardTrees + costs.boundTrees}</div>
          <div className="metric-sub">Fruit & Boundary Trees</div>
        </div>
      </div>

      <nav className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'investment' ? 'active' : ''}`} onClick={() => setActiveTab('investment')}>Investment Plan</button>
        <button className={`tab-btn ${activeTab === 'boq' ? 'active' : ''}`} onClick={() => setActiveTab('boq')}>Bill of Quantities (BOQ)</button>
        <button className={`tab-btn ${activeTab === 'phases' ? 'active' : ''}`} onClick={() => setActiveTab('phases')}>Implementation Phases</button>
        <button className={`tab-btn ${activeTab === 'chart' ? 'active' : ''}`} onClick={() => setActiveTab('chart')}>Cost Analysis</button>
        <button className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>Farm Layout</button>
      </nav>

      <div className="tab-content">
        {activeTab === 'investment' && <InvestmentPlanView acres={acres} />}
        {activeTab === 'boq' && (
          <div className="boq-container">
            <BOQView costs={costs} />
          </div>
        )}
        {activeTab === 'phases' && <PhasesView costs={costs} acres={acres} />}
        {activeTab === 'chart' && <ChartView costs={costs} />}
        {activeTab === 'map' && <MapView acres={acres} />}
      </div>
    </main>
  );
}

function BOQView({ costs }) {
  const col1 = costs.sections.filter(s => s.id <= 3);
  const col2 = costs.sections.filter(s => s.id > 3);

  const renderSection = (section) => (
    <div key={`section-${section.id}`} className="boq-section-card">
      <table className="modern-boq-table">
        <thead>
          <tr className="section-header-row">
            <td colSpan="5">{section.title}</td>
          </tr>
          <tr>
            <th style={{ width: '35px' }}>#</th>
            <th>Item Name</th>
            <th>Spec</th>
            <th>Unit Cost (PKR)</th>
            <th className="num">Total</th>
          </tr>
        </thead>
        <tbody>
          {section.items.map((item) => (
            <tr key={item.id} className="item-row">
              <td className="item-id">{item.id}</td>
              <td className="item-name">{item.name}</td>
              <td className="item-spec">{item.spec}</td>
              <td className="item-unit">{item.unit}</td>
              <td className="item-total num">{Math.round(item.total).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="boq-wrapper">
      <div className="boq-two-col-grid">
        <div className="boq-column">
          {col1.map(renderSection)}
        </div>
        <div className="boq-column">
          {col2.map(renderSection)}
          <div className="boq-section-card overheads-card">
            <table className="modern-boq-table">
              <thead>
                <tr className="section-header-row overheads-header">
                  <td colSpan="2">7. Project Overheads</td>
                </tr>
              </thead>
              <tbody>
                <tr className="item-row">
                  <td className="item-name">Consultant Fee (9%)</td>
                  <td className="item-total num">{Math.round(costs.consultant).toLocaleString()}</td>
                </tr>
                <tr className="item-row">
                  <td className="item-name">Contingency (12%)</td>
                  <td className="item-total num">{Math.round(costs.contingency).toLocaleString()}</td>
                </tr>
                <tr className="subtotal-display-row">
                  <td>Subtotal</td>
                  <td className="num">{Math.round(costs.subtotal).toLocaleString()}</td>
                </tr>
                <tr className="grand-total-display-row">
                  <td>GRAND TOTAL</td>
                  <td className="num">{Math.round(costs.grand).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="boq-disclaimer">Legend: [FIXED] = constant | [PER ACRE] = scales linearly | [SCALED] = interpolated | [STEP] = increases in steps</p>
    </div>
  );
}

function PhasesView({ costs }) {
  const phases = [
    {
      num: 1, title: 'Foundation & Infrastructure', duration: 'Months 1-4',
      items: ['Boundary Wall (' + costs.boundRft + ' Rft)', 'Main Gate & Security Post', 'Land Leveling & Clearing', 'Internal Access Roads', 'Water Source (Tubewell/RCC Tank)'],
      cost: costs.items.wall + costs.items.fancyWall + costs.items.gate + costs.items.roads + costs.items.leveling + costs.items.tubewell + costs.items.waterTank + costs.items.rainwater
    },
    {
      num: 2, title: 'Buildings & Livestock Setup', duration: 'Months 5-9',
      items: ['Farm House Construction', 'Modern Animal Shed (' + costs.animalShedMarla + ' Marla)', 'Fodder Storage & Paddock', 'Solar Energy Plant (' + costs.solarKW + ' KW)', 'Biogas Unit Installation'],
      cost: costs.items.house + costs.items.animalShed + costs.items.fodder + costs.items.biogas + costs.items.solar + costs.items.electrification
    },
    {
      num: 3, title: 'HVF & Irrigation Systems', duration: 'Months 10-14',
      items: ['Automated Greenhouse Unit', 'Drip & Sprinkler Network', 'Water Filtration System', 'Fish Pond Development', 'Vermicompost Facility'],
      cost: costs.items.greenhouse + costs.items.drip + costs.items.filtration + costs.items.pressureTank + costs.items.fishPond + costs.items.vermi
    },
    {
      num: 4, title: 'Plantation & Operations', duration: 'Months 15-24',
      items: ['Commercial Orchard (' + costs.orchardTrees + ' trees)', 'Boundary Tree Belts (' + costs.boundTrees + ')', 'Stocking Sahiwal Cows (' + costs.cowCount + ')', 'Stocking Nili Buffalo (' + costs.buffCount + ')', 'Full-scale Operations'],
      cost: costs.items.orchard + costs.items.boundTreeCost + costs.items.vegArea + costs.items.cows + costs.items.buffs
    }
  ];

  return (
    <div className="phases-grid">
      {phases.map((p, i) => (
        <div key={i} className="phase-card">
          <div className="phase-header">
            <div className="phase-title-area">
              <span className="phase-badge">Phase {p.num}</span>
              <h3>{p.title}</h3>
            </div>
            <div className="phase-duration">{p.duration}</div>
          </div>
          <ul className="phase-items">
            {p.items.map((item, j) => <li key={j}>{item}</li>)}
          </ul>
          <div className="phase-footer">
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estimated Phase Cost</div>
            <div className="phase-cost">{fmt(p.cost)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChartView({ costs }) {
  const labels = ['Infrastructure', 'Buildings', 'Energy/Water', 'Production', 'Livestock', 'Overheads'];
  const dataValues = [
    costs.infra,
    costs.buildings,
    costs.energy + costs.water,
    costs.production,
    costs.livestock,
    costs.consultant + costs.contingency
  ].map(v => Math.round(v / 1000000));

  const colors = ['#1b5235', '#2d6a2d', '#573323', '#f59e0b', '#3c3c3e', '#718096'];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Millions (PKR)',
      data: dataValues,
      backgroundColor: colors,
      borderRadius: 8,
      barThickness: 40
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: v => v + 'M' }
      },
      x: { grid: { display: false } }
    }
  };

  return (
    <>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', marginTop: '20px', fontSize: '13px', fontWeight: '500' }}>
        {labels.map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: colors[i] }}></div>
            <span>{l}: {dataValues[i]}M</span>
          </div>
        ))}
      </div>
    </>
  );
}

function MapView({ acres }) {
  const rezPct = Math.max(0.1, Math.min(0.2, 0.15 + (5 - acres) * 0.005));
  const liveZPct = 0.22;
  const utilZPct = 0.12;
  const hvfZPct = 0.20;
  const orchardPct = 1 - (rezPct + liveZPct + utilZPct + hvfZPct);

  const zones = [
    { id: 'rez', label: 'Residential', icon: '🏡', color: '#c5e1a5', pct: rezPct },
    { id: 'live', label: 'Livestock', icon: '🐄', color: '#ffe082', pct: liveZPct },
    { id: 'util', label: 'Utilities', icon: '⚙️', color: '#90caf9', pct: utilZPct },
    { id: 'hvf', label: 'High-Value Crops', icon: '🥗', color: '#a5d6a7', pct: hvfZPct },
    { id: 'orchard', label: 'Orchard & Grazing', icon: '🌳', color: '#ce93d8', pct: orchardPct }
  ];

  return (
    <>
      <div className="map-2d-wrapper">
        <div className="map-2d-grid">
          {zones.map((z, i) => (
            <div key={i} className={`map-zone map-${z.id}`} style={{ '--zone-color': z.color }}>
              <div className="map-zone-content">
                <span className="map-icon">{z.icon}</span>
                <span className="map-label">{z.label}</span>
                <span className="map-acreage">{(z.pct * acres).toFixed(2)} Ac</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', fontWeight: '500' }}>
        * Premium 2D visual representation. Layout automatically adapts to optimal agricultural zoning.
      </p>
    </>
  );
}
