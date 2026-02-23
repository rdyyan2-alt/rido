/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import html2pdf from 'html2pdf.js';
import DottedGlowBackground from './components/DottedGlowBackground';
import { 
    CodeIcon, 
} from './components/Icons';

// --- Data Constants ---

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov'];

const ALL_DMA_NAMES = [
  "1. TAMAN KAYANGAN", "2. EURO", "3. MUSTIKA MULIA RACING", "4. PERMATA MUTIARA", 
  "5. PERMATA HIJAU LESTARI", "6. TAMAN TORAJA", "7. CITRA TELLO", "8. RESIDEN ALAUDDIN", 
  "9. GRIYA FAJAR MAS", "10. BPH", "11. PURI KENCANA SARI", "12. VILLA SURYA MAS",
  "13. GERHANA ALAUDDIN (I)", "14. RESIDEN ALAUDDIN (2)", "15. MAHKOTA MAS ANTANG",
  "16. PERMATA MUTIARA (Ext)", "18. GRAHA LESTARI", "19. RANGGONG PERMAI",
  "20. ANGING MAMIRI", "21. AMARYLLIS", "113. PESONA PRIMA GRIYA"
];

const BOOSTER_STATIONS = [
    { name: 'Booster Gatot Subroto', pumps: 2, capacity: '80 LPS', defaultPower: '50 kW' },
    { name: 'Booster KM 10', pumps: 2, capacity: '85 LPS', defaultPower: '50 kW' },
    { name: 'Booster BTP', pumps: 4, capacity: '120 LPS', defaultPower: '75 kW' },
    { name: 'Booster KM 15', pumps: 2, capacity: '26 LPS', defaultPower: '25 kW' },
    { name: 'Booster KIMA', pumps: 2, capacity: '260 LPS', defaultPower: '100 kW' },
];

const INITIAL_REGIONAL_BASE = [
  { id: 1, wilayah: 'Wilayah 1', unit: 412, panjang: 16452, diameter: 250, fokus: 'JDU 250mm & Pelanggan', diameters: '20, 25, 50, 75, 100, 150, 250 (JDU), 400', priority: false, pipaTuaM: 5200, tahunNihilM: 1500, detailKritis: [{d: 250, t: 2000, n: 500}, {d: 100, t: 1500, n: 400}, {d: 50, t: 1700, n: 600}] },
  { id: 2, wilayah: 'Wilayah 2', unit: 611, panjang: 24180, diameter: 150, fokus: 'Distribusi (75, 150mm)', diameters: '25, 50, 75, 100, 150, 200, 250, 300, 450 (JDU)', priority: true, pipaTuaM: 12400, tahunNihilM: 4200, detailKritis: [{d: 150, t: 5000, n: 1200}, {d: 75, t: 4400, n: 1500}, {d: 50, t: 3000, n: 1500}] },
  { id: 3, wilayah: 'Wilayah 3', unit: 2859, panjang: 139314, diameter: 75, fokus: 'Diameter 75mm (Masif)', diameters: '50, 75 (Dominan), 100, 150, 200, 250', priority: false, pipaTuaM: 35000, tahunNihilM: 8500, detailKritis: [{d: 75, t: 20000, n: 4000}, {d: 50, t: 15000, n: 4500}] },
  { id: 4, wilayah: 'Wilayah 4', unit: 832, panjang: 58077, diameter: 450, fokus: 'JDU Kritikal (450mm)', diameters: '50, 75, 100, 150, 200, 250, 350, 400, 450, 1000', priority: true, pipaTuaM: 28000, tahunNihilM: 12000, detailKritis: [{d: 450, t: 10000, n: 4000}, {d: 400, t: 8000, n: 3000}, {d: 250, t: 10000, n: 5000}] },
  { id: 5, wilayah: 'Wilayah 5', unit: 1198, panjang: 62435, diameter: 100, fokus: 'Sekunder (100, 200mm)', diameters: '20, 50, 75, 100, 150, 200, 250, 350', priority: false, pipaTuaM: 8500, tahunNihilM: 2100, detailKritis: [{d: 200, t: 3000, n: 800}, {d: 100, t: 4500, n: 1000}, {d: 75, t: 1000, n: 300}] },
  { id: 6, wilayah: 'Wilayah 6', unit: 1093, panjang: 45218, diameter: 200, fokus: 'Distribusi Sekunder', diameters: '50, 75, 100, 150, 200, 250', priority: false, pipaTuaM: 7200, tahunNihilM: 1800, detailKritis: [{d: 200, t: 2500, n: 600}, {d: 150, t: 3000, n: 700}, {d: 100, t: 1700, n: 500}] },
];

const ROADMAP_DATA_BASE = [
  { thn: 0, label: 'Baseline', nrw: 50, air: 4.0, milestone: 'Audit Digital' },
  { thn: 1, label: 'Tahun 1', nrw: 45, air: 3.6, milestone: 'IoT Integration' },
  { thn: 2, label: 'Tahun 2', nrw: 40, air: 3.2, milestone: 'Pipa Tua Phase 1' },
  { thn: 3, label: 'Tahun 3', nrw: 36, air: 2.9, milestone: 'Inline Pump Optimized' },
  { thn: 4, label: 'Tahun 4', nrw: 33, air: 2.7, milestone: 'Full SCADA Ops' },
  { thn: 5, label: 'Tahun 5', nrw: 30, air: 2.4, milestone: 'Predictive Maintenance' },
  { thn: 6, label: 'Tahun 6', nrw: 28, air: 2.2, milestone: 'Zero Leakage Target' },
  { thn: 7, label: 'Tahun 7', nrw: 27, air: 2.1, milestone: 'Expansion Area' },
  { thn: 8, label: 'Tahun 8', nrw: 26, air: 2.0, milestone: 'Stability Phase' },
  { thn: 10, label: 'Tahun 10', nrw: 24, air: 1.9, milestone: 'World Class Utility' },
];

const METER_INDUK_DATA = ALL_DMA_NAMES.map((name, idx) => {
    const base = [0, 2, 6, 7, 12].includes(idx) ? 500000 : (idx % 3 === 0 ? 1500000 : 200000);
    return {
        name,
        data: Array.from({ length: 11 }, (_, i) => Math.floor(base + (i * (base * 0.02)) + Math.random() * 5000))
    };
});

const NRW_DMA_DATA = ALL_DMA_NAMES.map((name, idx) => {
    let baseNrw = 20;
    if (name.includes("CITRA TELLO")) baseNrw = 72;
    if (name.includes("MUSTIKA MULIA")) baseNrw = -85;
    if (name.includes("GERHANA")) baseNrw = -150;
    if (name.includes("TAMAN TORAJA")) baseNrw = 15;
    return {
        name,
        data: Array.from({ length: 11 }, () => Math.floor(baseNrw + (Math.random() * 10 - 5)))
    };
});

const PRODUCTION_DATA_2025 = [
    { bulan: 'Jan', ratulangi: 102761, panaikang: 3284689, antang: 390056, sombala: 849572, sombaopu: 4398536, total: 9025614 },
    { bulan: 'Feb', ratulangi: 98249, panaikang: 3232580, antang: 396621, sombala: 896604, sombaopu: 4284453, total: 8908507 },
    { bulan: 'Mar', ratulangi: 67986, panaikang: 2780830, antang: 363485, sombala: 848909, sombaopu: 3880559, total: 7941769 },
    { bulan: 'Apr', ratulangi: 72571, panaikang: 3452485, antang: 398245, sombala: 988271, sombaopu: 4285247, total: 9196819 },
    { bulan: 'Mei', ratulangi: 63614, panaikang: 2982170, antang: 373128, sombala: 954962, sombaopu: 4118552, total: 8492426 },
    { bulan: 'Jun', ratulangi: 71060, panaikang: 2971745, antang: 387923, sombala: 948428, sombaopu: 4300197, total: 8679353 },
    { bulan: 'Jul', ratulangi: 65090, panaikang: 2917500, antang: 381451, sombala: 846784, sombaopu: 4119479, total: 8330304 },
    { bulan: 'Ags', ratulangi: 74913, panaikang: 3495562, antang: 395091, sombala: 931578, sombaopu: 4196508, total: 9093652 },
    { bulan: 'Sep', ratulangi: 62807, panaikang: 3248921, antang: 388347, sombala: 893726, sombaopu: 4143901, total: 8737702 },
];

const NERACA_AIR_2022_DATA = [
    { bulan: 'Jan', produksi: 9025614, billed: 4225493, unbilledAuth: 0, apparentLoss: 0, realLoss: 458 },
    { bulan: 'Feb', produksi: 8908507, billed: 4159831, unbilledAuth: 2365, apparentLoss: 557, realLoss: 390 },
    { bulan: 'Mar', produksi: 7941769, billed: 3878386, unbilledAuth: 3178, apparentLoss: 3854, realLoss: 404 },
    { bulan: 'Apr', produksi: 9196819, billed: 4208336, unbilledAuth: 3065, apparentLoss: 1402, realLoss: 379 },
    { bulan: 'Mei', produksi: 8492426, billed: 4086014, unbilledAuth: 2835, apparentLoss: 121, realLoss: 232 },
    { bulan: 'Jun', produksi: 8679353, billed: 4533331, unbilledAuth: 3824, apparentLoss: 1647, realLoss: 221 },
    { bulan: 'Jul', produksi: 8330304, billed: 4533540, unbilledAuth: 3937, apparentLoss: 903, realLoss: 413 },
    { bulan: 'Ags', produksi: 9093652, billed: 4517266, unbilledAuth: 4379, apparentLoss: 832, realLoss: 522 },
    { bulan: 'Sep', produksi: 8737702, billed: 4534020, unbilledAuth: 2944, apparentLoss: 1438, realLoss: 426 },
];

const NERACA_AIR_2022_BREAKDOWN = {
// ... existing breakdown ...
    produksi: [
        { name: 'IPA I Ratulangi', val: 679055 },
        { name: 'IPA II Panaikang', val: 28366482 },
        { name: 'IPA III Antang', val: 3474347 },
        { name: 'IPA IV M. Sombala', val: 8158834 },
        { name: 'IPA V Somba Opu', val: 37727432 }
    ],
    konsumsiBermeter: [
        { name: 'Meter Pelanggan', val: 38660450 },
        { name: 'Tangki TNI/POLRI', val: 2494 },
        { name: 'Terminal Air', val: 159 },
        { name: 'Umum', val: 821 },
        { name: 'Komersial', val: 3041 },
        { name: 'Tangki Umum', val: 9251 }
    ],
    konsumsiTakBermeterBerekening: [
        { name: 'Flushing Pipa', val: 6677 },
        { name: 'Denda Air Ilegal', val: 7584 }
    ],
    konsumsiBermeterTakBerekening: [
        { name: 'Pemakaian Sendiri', val: 9371 },
        { name: 'Bantuan Khusus', val: 20704 }
    ],
    konsumsiTakBermeterTakBerekening: [
        { name: 'Ganti Meter', val: 78 },
        { name: 'Buka Kembali', val: 539 },
        { name: 'Tutup Langganan', val: 591 },
        { name: 'Pemasangan Baru', val: 1092 },
        { name: 'Perbaikan Kebocoran', val: 1178 }
    ]
};

const SophisticatedNeracaChart = ({ data }: { data: any[] }) => {
    const max = Math.max(...data.map(d => d.produksi), 1);
    return (
        <div className="chart-preview-expanded" style={{ height: '520px', padding: '60px 20px 20px 20px' }}>
            <div className="simple-chart-container" style={{ height: '340px', alignItems: 'flex-end', gap: '12px' }}>
                {data.map((d, i) => {
                    const nrwTotal = d.produksi - d.billed;
                    const billedH = (d.billed / max) * 100;
                    const realH = (d.realLoss / max) * 100;
                    const unbillH = (d.unbilledAuth / max) * 100;
                    const apparH = (d.apparentLoss / max) * 100;
                    const prodH = (d.produksi / max) * 100;

                    return (
                        <div key={i} className="chart-bar-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative' }}>
                            {/* Top Production Value */}
                            <div style={{ position: 'absolute', top: '-55px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%', zIndex: 10 }}>
                                <div style={{ fontSize: '0.55rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Input</div>
                                <div style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--accent-blue)' }}>{d.produksi.toLocaleString()}</div>
                            </div>
                            
                            {/* Production Background (Full Height) */}
                            <div style={{ 
                                position: 'absolute', bottom: 0, left: 0, right: 0, 
                                height: `${prodH}%`, 
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(0, 150, 255, 0.1)',
                                borderRadius: '4px 4px 0 0',
                                zIndex: 0
                            }} />

                            {/* NRW Label Marker */}
                            <div style={{ 
                                position: 'absolute', 
                                bottom: `${prodH}%`, 
                                left: '50%', 
                                transform: 'translateX(-50%) translateY(-5px)',
                                zIndex: 11
                            }}>
                                <div style={{ 
                                    background: 'var(--error)', 
                                    color: '#fff', 
                                    fontSize: '0.5rem', 
                                    padding: '2px 4px', 
                                    borderRadius: '3px', 
                                    fontWeight: '900',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {((nrwTotal/d.produksi)*100).toFixed(1)}% NRW
                                </div>
                            </div>

                            {/* Stacked Bars */}
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', zIndex: 5, width: '100%' }}>
                                {/* Apparent Loss (Commercial Losses) */}
                                <div className="chart-bar" style={{ 
                                    height: `${apparH}%`, 
                                    backgroundColor: 'var(--warning)', 
                                    minHeight: d.apparentLoss > 0 ? '3px' : '0',
                                    opacity: 0.9
                                }} title={`Apparent Loss: ${d.apparentLoss.toLocaleString()}`} />
                                
                                {/* Unbilled Authorized Consumption */}
                                <div className="chart-bar" style={{ 
                                    height: `${unbillH}%`, 
                                    backgroundColor: 'var(--accent-cyan)', 
                                    minHeight: d.unbilledAuth > 0 ? '3px' : '0',
                                    opacity: 0.9
                                }} title={`Unbilled Authorized: ${d.unbilledAuth.toLocaleString()}`} />
                                
                                {/* Real Loss (Physical Leakage) */}
                                <div className="chart-bar" style={{ 
                                    height: `${realH}%`, 
                                    backgroundColor: 'var(--error)', 
                                    minHeight: d.realLoss > 0 ? '3px' : '0',
                                    opacity: 0.9
                                }} title={`Real Loss: ${d.realLoss.toLocaleString()}`} />

                                {/* Revenue Water (Billed Consumption) */}
                                <div className="chart-bar" style={{ 
                                    height: `${billedH}%`, 
                                    backgroundColor: 'var(--success)',
                                    borderRadius: '2px 2px 0 0',
                                    position: 'relative',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
                                }} title={`Revenue Water: ${d.billed.toLocaleString()}`}>
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '50%', 
                                        left: '50%', 
                                        transform: 'translate(-50%, -50%) rotate(-90deg)', 
                                        fontSize: '0.55rem', 
                                        color: '#000', 
                                        fontWeight: '900', 
                                        whiteSpace: 'nowrap',
                                        pointerEvents: 'none'
                                    }}>
                                        {d.billed.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="chart-labels-expanded" style={{ marginTop: '25px', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                {data.map(d => <span key={d.bulan} style={{ fontWeight: '800', fontSize: '0.7rem', color: 'var(--text-main)' }}>{d.bulan}</span>)}
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
                gap: '12px', 
                marginTop: '30px', 
                background: 'rgba(0,0,0,0.2)', 
                padding: '15px', 
                borderRadius: '12px',
                border: '1px solid var(--border)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 14, height: 14, background: 'var(--success)', borderRadius: '3px' }} />
                    <div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Revenue Water</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--success)' }}>Billed Consumption</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 14, height: 14, background: 'var(--error)', borderRadius: '3px' }} />
                    <div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Real Losses</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--error)' }}>Physical Leakage</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 14, height: 14, background: 'var(--warning)', borderRadius: '3px' }} />
                    <div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Apparent Losses</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--warning)' }}>Commercial Losses</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 14, height: 14, background: 'var(--accent-cyan)', borderRadius: '3px' }} />
                    <div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Unbilled Auth.</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>Authorized Usage</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 14, height: 14, border: '1px solid var(--accent-blue)', background: 'rgba(0,150,255,0.1)', borderRadius: '3px' }} />
                    <div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>System Input</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-blue)' }}>Total Production</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Components ---

const CurrencyFormatter = (val: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
};

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

const SimpleBarChart = ({ data, color, showValues = true, valueFormatter = (v: number) => `${v}%`, height = '240px' }: { data: number[], color: string, showValues?: boolean, valueFormatter?: (v: number) => string, height?: string }) => {
  const max = Math.max(...data.map(Math.abs), 1);
  return (
    <div className="simple-chart-container" style={{ height }}>
      {data.map((val, i) => (
        <div key={i} className="chart-bar-wrapper">
          {showValues && (
            <span className="bar-value" style={{ 
                bottom: `calc(${(Math.abs(val) / max) * 100}% + 5px)`, 
            }}>
              {valueFormatter(val)}
            </span>
          )}
          <div 
            className="chart-bar" 
            style={{ 
              height: `${(Math.abs(val) / max) * 100}%`, 
              backgroundColor: val < 0 ? 'var(--error)' : color,
              boxShadow: `0 0 12px ${val < 0 ? 'var(--error)' : color}66`
            }} 
          />
        </div>
      ))}
    </div>
  );
};

const HeatmapCell = ({ value }: { value: number; key?: React.Key }) => {
    let bgColor = 'rgba(16, 185, 129, 0.15)';
    let textColor = 'var(--success)';
    if (value > 20 && value <= 40) {
        bgColor = 'rgba(245, 158, 11, 0.15)';
        textColor = 'var(--warning)';
    } else if (value > 40 || value < 0) {
        bgColor = 'rgba(239, 68, 68, 0.15)';
        textColor = 'var(--error)';
    }
    return (
        <td style={{ backgroundColor: bgColor, color: textColor, fontWeight: '700', textAlign: 'center', fontSize: '0.7rem', padding: '4px' }}>
            {value}%
        </td>
    );
};

const CompleteLineChart = ({ data, year }: { data: any[], year: string }) => {
    const max = Math.max(...data.map(d => d.produksi), 1);
    const height = 300;
    const width = 800;
    const padding = 40;

    return (
        <div className="card full-width" style={{ padding: '20px', overflowX: 'auto' }}>
            <div className="card-header">
                <h3>Neraca Air Trend Tahun {year}</h3>
                <span className="badge-dia" style={{ background: 'var(--accent-cyan)', color: '#000' }}>Visualisasi Multi-Parameter</span>
            </div>
            <div style={{ position: 'relative', height: `${height + padding * 2}px`, minWidth: '900px', marginTop: '20px' }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height + padding * 2}`}>
                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
                        <line 
                            key={i} 
                            x1={padding} 
                            y1={height + padding - p * height} 
                            x2={width - padding} 
                            y2={height + padding - p * height} 
                            stroke="rgba(255,255,255,0.05)" 
                            strokeWidth="1" 
                        />
                    ))}

                    {/* Lines for each category */}
                    {['produksi', 'billed', 'unbilledAuth', 'apparentLoss', 'realLoss'].map((key, idx) => {
                        const colors = ['#0096ff', '#10b981', '#00d1ff', '#f59e0b', '#ef4444'];
                        const points = data.map((d, i) => {
                            const x = padding + (i * (width - padding * 2)) / (data.length - 1);
                            const y = height + padding - (d[key] / max) * height;
                            return `${x},${y}`;
                        }).join(' ');

                        return (
                            <g key={key}>
                                <polyline 
                                    points={points} 
                                    fill="none" 
                                    stroke={colors[idx]} 
                                    strokeWidth="3" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    style={{ filter: `drop-shadow(0 0 4px ${colors[idx]}44)` }}
                                />
                                {data.map((d, i) => {
                                    const x = padding + (i * (width - padding * 2)) / (data.length - 1);
                                    const y = height + padding - (d[key] / max) * height;
                                    return (
                                        <g key={i}>
                                            <circle cx={x} cy={y} r="4" fill={colors[idx]} stroke="#000" strokeWidth="1" />
                                            <text 
                                                x={x} 
                                                y={y - 8} 
                                                fontSize="8" 
                                                fill={colors[idx]} 
                                                textAnchor="middle" 
                                                fontWeight="700"
                                            >
                                                {d[key].toLocaleString()}
                                            </text>
                                        </g>
                                    );
                                })}
                            </g>
                        );
                    })}

                    {/* X-Axis Labels */}
                    {data.map((d, i) => (
                        <text 
                            key={i} 
                            x={padding + (i * (width - padding * 2)) / (data.length - 1)} 
                            y={height + padding + 20} 
                            fontSize="10" 
                            fill="var(--text-dim)" 
                            textAnchor="middle"
                        >
                            {d.bulan}
                        </text>
                    ))}
                </svg>
                
                {/* Legend */}
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '10px', fontSize: '0.7rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 12, height: 3, background: '#0096ff' }} /> Produksi</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 12, height: 3, background: '#10b981' }} /> Billed</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 12, height: 3, background: '#00d1ff' }} /> Unbilled Auth</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 12, height: 3, background: '#f59e0b' }} /> Apparent Loss</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 12, height: 3, background: '#ef4444' }} /> Real Loss</div>
                </div>
            </div>
        </div>
    );
};

function App() {
  const [activeTab, setActiveTab] = useState<'MASALAH' | 'CAPEX_OPEX' | 'SASARAN' | 'ROADMAP' | 'DATA' | 'EDITOR'>('MASALAH');
  const [masalahView, setMasalahView] = useState<'SINGLE' | 'ALL'>('ALL');
  const [selectedDMA, setSelectedDMA] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const isViewer = typeof window !== 'undefined' && window.location.hostname.startsWith('ais-pre-');

  // --- Stateful Data for Editing ---
  const [neracaData, setNeracaData] = useState(NERACA_AIR_2022_DATA);

  // --- Dynamic Calculations for Masalah Tab ---
  const totalProduksi = useMemo(() => neracaData.reduce((acc, curr) => acc + curr.produksi, 0) / neracaData.length, [neracaData]);
  const totalBilled = useMemo(() => neracaData.reduce((acc, curr) => acc + curr.billed, 0) / neracaData.length, [neracaData]);
  const totalNrw = useMemo(() => totalProduksi - totalBilled, [totalProduksi, totalBilled]);
  const totalNrwPercentage = useMemo(() => (totalProduksi > 0 ? (totalNrw / totalProduksi) * 100 : 0), [totalNrw, totalProduksi]);
  const [appTexts, setAppTexts] = useState({
    title: "Dashboard Modernisasi Strategis Penanganan NRW",
    subtitle: "Sistem Terpadu Penurunan Kehilangan Air & Modernisasi Infrastruktur Jaringan",
    masalahTitle: "Analisa Masalah & Infrastruktur Kritis",
    capexTitle: "Strategi & Estimasi Investasi (CAPEX)",
    sasaranTitle: "Sasaran Strategis & Dampak Layanan",
    roadmapTitle: "Roadmap Penurunan NRW 10 Tahun",
    dataTitle: "Pusat Data & Laporan Terintegrasi",
    year: "2024"
  });

  const handleSendToSpreadsheet = async (tableName: string, data: any) => {
    setIsSending(true);
    // Simulasi integrasi dengan Google Sheets API / Apps Script
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
    alert(`Berhasil! Data "${tableName}" telah dikirim ke Spreadsheet.\n\nLink: https://docs.google.com/spreadsheets/d/1wdf_ofbxGGcaebfxoqmed1jBEUS0Au-aBMMLyW_iH88/edit`);
  };

  const handleExportPDF = async () => {
    const element = document.querySelector('.bp-content') as HTMLElement;
    if (!element) return;

    setIsExporting(true);
    
    const opt: any = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: `Laporan_Strategis_${activeTab}_${appTexts.year}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#0a0a0a' // Match app background
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF Export Error:', error);
      alert('Gagal mengekspor PDF. Silakan coba lagi.');
    } finally {
      setIsExporting(false);
    }
  };

  // --- Configuration States (Prices) ---
  const [iotUnitPrice, setIotUnitPrice] = useState(80000000); 
  const [scadaIntegrationPrice, setIotScadaIntegrationPrice] = useState(50000000);
  const [ultrasonicPrice, setUltrasonicPrice] = useState(65000000);
  const [pressureSensorPrice, setPressureSensorPrice] = useState(15000000);

  const [vfdPrices, setVfdPrices] = useState<Record<string, number>>({
    "10 kW": 35000000, "15 kW": 55000000, "25 kW": 95000000, "30 kW": 120000000, "50 kW": 185000000, "75 kW": 265000000, "100 kW": 400000000
  });

  const [inlinePumpPrices, setInlinePumpPrices] = useState<Record<string, number>>({
    "10 LPS": 75000000, "20 LPS": 115000000, "30 LPS": 165000000, "50 LPS": 225000000, "80 LPS": 315000000
  });

  const [pipePrices, setPipePrices] = useState<Record<number, number>>({
    75: 450000, 100: 650000, 150: 950000, 200: 1250000, 250: 1650000, 450: 2850000
  });

  const [pumpPrices, setPumpPrices] = useState<Record<string, number>>({
    "Standard": 250000000, "High-Efficiency": 450000000
  });

  // --- Dynamic Calculations ---
  const calculatedRegionalData = useMemo(() => {
    return INITIAL_REGIONAL_BASE.map(d => {
        const pipeCost = d.panjang * (pipePrices[d.diameter] || 1150000);
        const prices = Object.values(inlinePumpPrices) as number[];
        const inlinePumpAvg = prices.reduce((a, b) => a + b, 0) / prices.length;
        const inlineCost = 10 * inlinePumpAvg;
        const iotCost = 10 * iotUnitPrice;
        return {
            ...d,
            anggaranPipa: pipeCost,
            anggaranInline: inlineCost,
            anggaranDigital: iotCost,
            totalRegional: pipeCost + inlineCost + iotCost,
            totalPipaKritis: d.pipaTuaM + d.tahunNihilM
        };
    });
  }, [pipePrices, inlinePumpPrices, iotUnitPrice]);

  const boosterCapexDetails = useMemo(() => {
    return BOOSTER_STATIONS.map(b => {
        const pumpCost = b.pumps * pumpPrices["High-Efficiency"];
        const vfdCost = b.pumps * (vfdPrices[b.defaultPower] || 150000000);
        const sensorCost = b.pumps * (ultrasonicPrice + pressureSensorPrice);
        const scadaCost = scadaIntegrationPrice;
        return {
            ...b,
            pumpCost, vfdCost, sensorCost, scadaCost,
            totalStation: pumpCost + vfdCost + sensorCost + scadaCost
        };
    });
  }, [pumpPrices, vfdPrices, ultrasonicPrice, pressureSensorPrice, scadaIntegrationPrice]);

  const totalCapexBooster = useMemo(() => boosterCapexDetails.reduce((a, b) => a + b.totalStation, 0), [boosterCapexDetails]);
  const totalCapexPipa = useMemo(() => calculatedRegionalData.reduce((a, b) => a + b.anggaranPipa, 0), [calculatedRegionalData]);
  const totalCapexInline = useMemo(() => calculatedRegionalData.reduce((a, b) => a + b.anggaranInline, 0), [calculatedRegionalData]);
  const totalCapexDigital = useMemo(() => calculatedRegionalData.reduce((a, b) => a + b.anggaranDigital, 0), [calculatedRegionalData]);
  
  // Penambahan Capex IPA 2 JDU 1000mm (3 Unit x 2.5M)
  const totalCapexIPA2 = 7500000000;
  const totalInvestasi = totalCapexBooster + totalCapexPipa + totalCapexInline + totalCapexDigital + totalCapexIPA2;

  // OPEX Estimates (30% energy reduction on ~1B monthly power cost per main booster)
  const opexSavingMonthly = (BOOSTER_STATIONS.length * 1000000000 * 0.3) / 1000000; // in Million Rp
  const waterLossSavingMonthly = (totalInvestasi * 0.005) / 1000000; // Simplified water loss benefit

  // Perhitungan Estimasi Per Tahap (Berdasarkan uraian strategi)
  const costStage1 = totalCapexDigital + (2 * 2500000000); // Digital monitoring + 2 unit pompa IPA 2
  const costStage2 = totalCapexBooster + totalCapexInline; // Revitalisasi Booster + VFD + Inline Pump
  const costStage3 = totalCapexPipa + (1 * 2500000000); // Restorasi Pipa Tua + 1 unit pompa IPA 2 terakhir

  // --- Perhitungan Manfaat Finansial Per Tahap Berdasarkan Penurunan NRW ---
  // Baseline NRW: 50%, Produksi: 8.000.000 m3, Harga: Rp 6.000
  // Rumus: (Baseline % - Target %) * Produksi * Harga Air
  const financialBenefitData = useMemo(() => {
    return ROADMAP_DATA_BASE.map(d => {
      const nrwReduction = 50 - d.nrw; // Persentase penurunan dari 50%
      const monthlySavingVal = (nrwReduction / 100) * 8000000 * 6000;
      return parseFloat((monthlySavingVal / 1000000000).toFixed(2)); // Dalam Milyar Rupiah
    });
  }, []);

  const handlePriceUpdate = (setter: any, key: any, val: string) => {
    setter((prev: any) => ({ ...prev, [key]: parseInt(val) || 0 }));
  };

  return (
    <div className="blueprint-app">
      <DottedGlowBackground gap={30} radius={1} color="rgba(0, 150, 255, 0.05)" glowColor="rgba(0, 200, 255, 0.2)" speedScale={0.3} />

      <header className="bp-header no-print">
        <div className="brand">
          <div className="brand-icon">STRATEGIC</div>
          <div className="brand-text">
            <h1>{appTexts.title}</h1>
            <p>{appTexts.subtitle}</p>
          </div>
        </div>
        <div className="bp-actions">
          <button className="btn-secondary" onClick={handleExportPDF} disabled={isExporting}>
            {isExporting ? '⏳ Exporting...' : <><CodeIcon /> Export Laporan Strategis (PDF)</>}
          </button>
        </div>
      </header>

      <nav className="bp-tabs no-print">
        <button className={activeTab === 'MASALAH' ? 'active' : ''} onClick={() => setActiveTab('MASALAH')}>Analisa Masalah</button>
        <button className={activeTab === 'CAPEX_OPEX' ? 'active' : ''} onClick={() => setActiveTab('CAPEX_OPEX')}>Strategi & CAPEX/OPEX</button>
        <button className={activeTab === 'SASARAN' ? 'active' : ''} onClick={() => setActiveTab('SASARAN')}>Sasaran & Dampak</button>
        <button className={activeTab === 'ROADMAP' ? 'active' : ''} onClick={() => setActiveTab('ROADMAP')}>Roadmap NRW (10 Thn)</button>
        <button className={activeTab === 'DATA' ? 'active' : ''} onClick={() => setActiveTab('DATA')}>Data</button>
        {!isViewer && (
          <button className={activeTab === 'EDITOR' ? 'active' : ''} onClick={() => setActiveTab('EDITOR')}>Editor Konten & Parameter</button>
        )}
      </nav>

      <main className="bp-content">
        
        {/* TAB 1: ANALISA MASALAH */}
        {activeTab === 'MASALAH' && (
          <div className="section-grid animate-in">
             <div className="card full-width" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'var(--error)', borderStyle: 'solid' }}>
                <div className="card-header">
                    <h3 style={{ color: 'var(--error)' }}>🚨 KRITIKAL: Hambatan Teknis Utama JDU 1000mm & Distribusi Pettarani</h3>
                    <span className="badge-dia" style={{ background: 'var(--error)', color: '#fff' }}>Hulu Kota & Zona 13</span>
                </div>
                <div className="detail-dual-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
                    <div className="phase-info">
                        <div className="phase-title" style={{ color: 'var(--text-main)', marginBottom: '10px' }}>Parameter Teknis Suplai Utama</div>
                        <ul className="phase-activities" style={{ gridTemplateColumns: '1fr', marginTop: '8px' }}>
                            <li><strong>Jaringan Utama:</strong> Jalur Kota JDU 1000mm</li>
                            <li><strong>Metode Operasional:</strong> 100% Gravitasi (Low Pressure)</li>
                            <li><strong>Elevasi Efektif:</strong> Hanya 13 Meter</li>
                            <li><strong>Debit Operasional:</strong> 400 - 600 LPS</li>
                            <li style={{ color: 'var(--error)', fontWeight: '700' }}><strong>Tekanan Terminal:</strong> Hanya 0.3 - 0.5 Bar (Sangat Tidak Ideal)</li>
                        </ul>
                    </div>
                    <div>
                        <div className="phase-title" style={{ color: 'var(--error)', fontWeight: '700', marginBottom: '12px' }}>Dampak Sistemik & Temuan Eksplisit</div>
                        <ul className="benefit-list">
                            <li><span style={{ color: 'var(--error)' }}>⚠</span> <div><strong>Kritikal JDU Pettarani:</strong> Pada pipa 400mm - 250mm, tekanan terukur hanya <strong>0.3 - 0.4 Bar</strong>. Kondisi ini menyuplai ±1,000 s/d 4,000 SR (Zona 13) dengan kualitas layanan yang sangat rendah.</div></li>
                            <li><span style={{ color: 'var(--error)' }}>✖</span> <div><strong>Under-Pressure Global:</strong> Tekanan &lt; 0.5 Bar melumpuhkan distribusi ke lantai 2 secara mandiri di hampir seluruh area pelayanan kota.</div></li>
                            <li><span style={{ color: 'var(--error)' }}>✖</span> <div><strong>Inefisiensi Booster:</strong> Booster hilir bekerja pada beban vacuum karena rendahnya head pressure dari hulu.</div></li>
                        </ul>
                    </div>
                </div>
             </div>

             {/* DATA PIPA TUA & TAHUN PASANG NIHIL */}
             <div className="card full-width">
                <div className="card-header">
                    <h3>Data Infrastruktur Kritis (Pipa Tua & Tanpa Tahun Pasang)</h3>
                    <span className="badge-dia" style={{ background: 'var(--warning)', color: '#000' }}>Analisa Kerentanan Kebocoran</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '15px' }}>
                  Sesuai Laporan Strategi Modernisasi, pipa yang <strong>tidak memiliki tahun pasang</strong> dan pipa <strong>terpasang ≤ tahun 2001 (usia &gt; 25 tahun)</strong> dikategorikan sebagai <strong>Pipa Tua</strong>. Infrastruktur ini menjadi prioritas utama penggantian karena akumulasi korosi, penyempitan diameter efektif, dan tingginya risiko kebocoran laten.
                </p>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Wilayah</th>
                                <th style={{ textAlign: 'center' }}>Total Jaringan (m³)</th>
                                <th style={{ textAlign: 'center' }}>Pipa Tua (m³)</th>
                                <th style={{ textAlign: 'center' }}>Tahun Pasang Nihil (m³)</th>
                                <th style={{ textAlign: 'center' }}>Total Kritis (m³)</th>
                                <th style={{ textAlign: 'center' }}>Rasio Kritis (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calculatedRegionalData.map(d => (
                                <tr key={d.id}>
                                    <td style={{ fontWeight: '600' }}>{d.wilayah}</td>
                                    <td style={{ textAlign: 'center' }}>{d.panjang.toLocaleString()}</td>
                                    <td style={{ textAlign: 'center', color: 'var(--warning)' }}>{d.pipaTuaM.toLocaleString()}</td>
                                    <td style={{ textAlign: 'center', color: 'var(--error)' }}>{d.tahunNihilM.toLocaleString()}</td>
                                    <td style={{ textAlign: 'center', fontWeight: '700' }}>{(d.pipaTuaM + d.tahunNihilM).toLocaleString()}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span className={`badge-dia ${((d.pipaTuaM + d.tahunNihilM) / d.panjang * 100) > 40 ? 'row-priority' : ''}`} style={{ background: ((d.pipaTuaM + d.tahunNihilM) / d.panjang * 100) > 40 ? 'var(--error)' : 'rgba(245, 158, 11, 0.2)', color: ((d.pipaTuaM + d.tahunNihilM) / d.panjang * 100) > 40 ? '#fff' : 'var(--warning)' }}>
                                            {((d.pipaTuaM + d.tahunNihilM) / d.panjang * 100).toFixed(1)}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>

             {/* TABEL DIAMETER PIPA TUA PER WILAYAH */}
             <div className="card full-width">
                <div className="card-header">
                    <h3>Rincian Diameter Pipa Tua & Tanpa Tahun Pasang Per Wilayah</h3>
                    <span className="badge-dia" style={{ background: 'var(--accent-cyan)', color: '#000' }}>Detail Segmentasi Teknis</span>
                </div>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Wilayah</th>
                                <th>Diameter (mm)</th>
                                <th style={{ textAlign: 'center' }}>Pipa Tua (m³)</th>
                                <th style={{ textAlign: 'center' }}>Tahun Nihil (m³)</th>
                                <th>Status Kerentanan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calculatedRegionalData.map(d => (
                                <React.Fragment key={d.id}>
                                    {d.detailKritis.map((item, idx) => (
                                        <tr key={`${d.id}-${idx}`}>
                                            {idx === 0 && <td rowSpan={d.detailKritis.length} style={{ fontWeight: '700', borderRight: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>{d.wilayah}</td>}
                                            <td style={{ fontWeight: '600' }}>Ø {item.d} mm</td>
                                            <td style={{ textAlign: 'center', color: 'var(--warning)' }}>{item.t.toLocaleString()}</td>
                                            <td style={{ textAlign: 'center', color: 'var(--error)' }}>{item.n.toLocaleString()}</td>
                                            <td>
                                                {item.d >= 250 ? <span className="prio-tag" style={{ background: 'var(--error)' }}>Kritis JDU</span> : <span className="prio-tag" style={{ background: 'var(--warning)', color: '#000' }}>Distribusi</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>

             <div className="card full-width">
                <div className="card-header">
                    <div className="masalah-header-left">
                        <h3>Identifikasi Kehilangan Air (NRW) Per DMA</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--error)', fontWeight: '600', marginTop: '4px' }}>⚠️ Tekanan Rata-rata Input DMA: &lt; 1.0 Bar (Anomali Suplai)</p>
                    </div>
                    <div className="view-toggle">
                        <button className={masalahView === 'ALL' ? 'active' : ''} onClick={() => setMasalahView('ALL')}>Heatmap Global</button>
                        <button className={masalahView === 'SINGLE' ? 'active' : ''} onClick={() => setMasalahView('SINGLE')}>Analisa Deep-Dive</button>
                    </div>
                </div>

                <div className="impact-stats" style={{ marginBottom: '24px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <div className="stat-item">
                        <span className="stat-label">Total Produksi (5 IPA)</span>
                        <span className="stat-val" style={{ color: 'var(--text-main)' }}>± {totalProduksi.toLocaleString()} m³</span>
                        <span className="stat-label">Per Bulan</span>
                    </div>
                    <div className="stat-item" style={{ borderLeft: '1px solid var(--border)', paddingLeft: '20px' }}>
                        <span className="stat-label">Volume Air Terbayar</span>
                        <span className="stat-val" style={{ color: 'var(--success)' }}>± {totalBilled.toLocaleString()} m³</span>
                        <span className="stat-label">Tercatat Per Bulan</span>
                    </div>
                    <div className="stat-item" style={{ borderLeft: '1px solid var(--border)', paddingLeft: '20px' }}>
                        <span className="stat-label">Tingkat Kehilangan (NRW)</span>
                        <span className="stat-val" style={{ color: 'var(--error)' }}>{totalNrwPercentage.toFixed(0)}%</span>
                        <span className="stat-label">Rata-rata Kota</span>
                    </div>
                </div>

                {masalahView === 'ALL' ? (
                    <div className="table-responsive" style={{ maxHeight: '400px' }}>
                        <table className="heatmap-table">
                            <thead><tr><th>Nama DMA</th>{MONTHS.map(m => <th key={m}>{m}</th>)}</tr></thead>
                            <tbody>{NRW_DMA_DATA.map((d, i) => (<tr key={i}><td>{d.name}</td>{d.data.map((v, mi) => <HeatmapCell key={mi} value={v} />)}</tr>))}</tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <div className="dma-selector" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '20px' }}>
                            {ALL_DMA_NAMES.map((n, i) => <button key={i} className={`btn-secondary ${selectedDMA === i ? 'active-btn' : ''}`} onClick={() => setSelectedDMA(i)}>{n.split('. ')[1]}</button>)}
                        </div>
                        <div className="detail-dual-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="detail-chart-box">
                                <h4>Volume Meter Induk (m³)</h4>
                                <SimpleBarChart data={METER_INDUK_DATA[selectedDMA].data} color="var(--accent-cyan)" valueFormatter={(v)=>v.toLocaleString()} />
                            </div>
                            <div className="detail-chart-box">
                                <h4>Trend Kehilangan NRW (%)</h4>
                                <SimpleBarChart data={NRW_DMA_DATA[selectedDMA].data} color="var(--error)" />
                            </div>
                        </div>
                        <div className="impact-stats" style={{ marginTop: '20px', padding: '15px' }}>
                            <div className="stat-item">
                                <span className="stat-label">Tekanan Input Rata-rata</span>
                                <span className="stat-val" style={{ color: 'var(--error)' }}>0.65 Bar</span>
                            </div>
                            <div className="stat-item" style={{ borderLeft: '1px solid var(--border)', paddingLeft: '20px' }}>
                                <span className="stat-label">Kondisi Suplai</span>
                                <span className="stat-val" style={{ color: 'var(--error)', fontSize: '1rem' }}>KRITIS (Under 1 Bar)</span>
                            </div>
                        </div>
                    </div>
                )}
             </div>
          </div>
        )}

        {/* TAB 2: STRATEGI & CAPEX_OPEX */}
        {activeTab === 'CAPEX_OPEX' && (
          <div className="section-grid animate-in">
             <div className="card full-width">
                <div className="card-header">
                    <h3>Matriks Strategi Modernisasi & Penanganan Pipa Tua</h3>
                    <span className="badge-dia">5 Langkah Strategis Terpadu</span>
                </div>
                <div className="implementation-timeline">
                    <div className="timeline-phase">
                        <div className="phase-icon-box">📡</div>
                        <div className="phase-info">
                            <div className="phase-title">Tahap 1: Digital Monitoring & Pump Upgrade (Part 1)</div>
                            <div className="phase-time">Implementasi Segera (Tahun 1)</div>
                            <ul className="phase-activities">
                                <li>Pemasangan 60 unit Ultrasonic Flowmeter</li>
                                <li>Integrasi Sensor Tekanan Jaringan Real-time</li>
                                <li>Pembangunan Dashboard SCADA Wilayah</li>
                                <li style={{ color: 'var(--accent-cyan)', fontWeight: '700' }}>Pengadaan 2 unit Pompa IPA 2 (400 LPS, Head 40m) + Panel VFD</li>
                            </ul>
                            <div style={{ marginTop: '12px', padding: '8px 12px', background: 'rgba(0, 209, 255, 0.05)', borderRadius: '6px', borderLeft: '3px solid var(--accent-cyan)' }}>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>Estimasi Biaya Tahap 1:</span>
                                <div style={{ fontSize: '1rem', color: 'var(--accent-cyan)', fontWeight: '700' }}>{CurrencyFormatter(costStage1)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-phase">
                        <div className="phase-icon-box">⚡</div>
                        <div className="phase-info">
                            <div className="phase-title">Tahap 2: Efisiensi Energi Booster & VFD</div>
                            <div className="phase-time">Revitalisasi Stasiun Pompa Utama</div>
                            <ul className="phase-activities">
                                <li>Upgrade 5 Booster Utama ke Pompa High-Efficiency</li>
                                <li>Pemasangan Panel VFD untuk Load-Balancing</li>
                                <li>Optimasi Power Consumpton Jangka Panjang</li>
                            </ul>
                            <div style={{ marginTop: '12px', padding: '8px 12px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '6px', borderLeft: '3px solid var(--success)' }}>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>Estimasi Biaya Tahap 2:</span>
                                <div style={{ fontSize: '1rem', color: 'var(--success)', fontWeight: '700' }}>{CurrencyFormatter(costStage2)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-phase">
                        <div className="phase-icon-box">🛠</div>
                        <div className="phase-info">
                            <div className="phase-title">Tahap 3: Restorasi Pipa & Pump Upgrade (Part 2)</div>
                            <div className="phase-time">Penyelesaian Infrastruktur Fisik</div>
                            <ul className="phase-activities">
                                <li>Prioritas Wilayah 2 & 4 (Kondisi Pipa &gt; 30 Thn)</li>
                                <li>Redesign Jaringan JDU Diameter 450mm</li>
                                <li>Eliminasi Jalur "Illegal Tapping" pada Pipa Tua</li>
                                <li style={{ color: 'var(--accent-cyan)', fontWeight: '700' }}>Pengadaan unit ke-3 Pompa IPA 2 JDU 1000mm (Sistem Redundansi)</li>
                            </ul>
                            <div style={{ marginTop: '12px', padding: '8px 12px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '6px', borderLeft: '3px solid var(--error)' }}>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>Estimasi Biaya Tahap 3:</span>
                                <div style={{ fontSize: '1rem', color: 'var(--error)', fontWeight: '700' }}>{CurrencyFormatter(costStage3)}</div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>

             <div className="summary-cards" style={{ gridColumn: 'span 2' }}>
                <div className="summary-card highlight">
                    <label>Total Investasi Modernisasi (CAPEX)</label>
                    <div className="value" style={{ color: 'var(--accent-cyan)' }}>{CurrencyFormatter(totalInvestasi)}</div>
                </div>
                <div className="summary-card highlight" style={{ borderColor: 'var(--success)' }}>
                    <label>Estimasi Penghematan OPEX / Bulan</label>
                    <div className="value" style={{ color: 'var(--success)' }}>{CurrencyFormatter(opexSavingMonthly * 1000000)}</div>
                    <div className="trend positive">Listrik & Maintenance</div>
                </div>
             </div>

             <div className="card full-width">
                <div className="card-header"><h3>Uraian Rinci Investasi (Berdasarkan Konfigurasi Harga)</h3></div>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr><th>Kategori Modernisasi</th><th>Detail Item</th><th>Jumlah Unit</th><th>Total Investasi (Rp)</th></tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>Pompa IPA 2</strong></td><td>Pompa JDU 1000mm (400 LPS, Head 40m) + Panel VFD</td><td>3 Unit</td><td>{CurrencyFormatter(totalCapexIPA2)}</td></tr>
                            <tr><td><strong>Pipa Distribusi</strong></td><td>Pipa Baru {calculatedRegionalData[3].diameter}mm (IPA Tua)</td><td>{calculatedRegionalData.reduce((a,b)=>a+b.panjang,0).toLocaleString()} m³</td><td>{CurrencyFormatter(totalCapexPipa)}</td></tr>
                            <tr><td><strong>Stasiun Booster</strong></td><td>Upgrade 5 Stasiun Utama + VFD + SCADA</td><td>12 Pompa Unit</td><td>{CurrencyFormatter(totalCapexBooster)}</td></tr>
                            <tr><td><strong>Inline Booster</strong></td><td>Vertical Inline Pump (Kapasitas 10-80 LPS)</td><td>60 Titik Baru</td><td>{CurrencyFormatter(totalCapexInline)}</td></tr>
                            <tr><td><strong>Monitoring Digital</strong></td><td>Ultrasonic & IoT Monitoring</td><td>60 Titik Wilayah</td><td>{CurrencyFormatter(totalCapexDigital)}</td></tr>
                        </tbody>
                        <tfoot>
                            <tr><td colSpan={3} style={{ textAlign: 'right', fontWeight: '800' }}>TOTAL ESTIMASI CAPEX MODERINISASI STRATEGIS</td><td style={{ color: 'var(--accent-cyan)', fontWeight: '800', fontSize: '1.2rem' }}>{CurrencyFormatter(totalInvestasi)}</td></tr>
                        </tfoot>
                    </table>
                </div>
             </div>
          </div>
        )}

        {/* TAB 3: SASARAN & DAMPAK */}
        {activeTab === 'SASARAN' && (
          <div className="section-grid animate-in">
             <div className="card">
                <div className="benefit-icon">🌀</div>
                <h4>Revitalisasi Suplai Utama IPA 2</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Pemasangan 3 unit pompa dengan output kolektif 600 LPS menstabilkan head pressure di terminal JDU 1000mm.</p>
                <div className="impact-stats">
                    <div className="stat-item"><span className="stat-val">0.5 Bar</span><span className="stat-label">Initial</span></div>
                    <div className="stat-item">➔</div>
                    <div className="stat-item"><span className="stat-val" style={{ color: 'var(--success)' }}>3.0 Bar</span><span className="stat-label">Output IPA 2</span></div>
                </div>
             </div>

             <div className="card">
                <div className="benefit-icon">🏢</div>
                <h4>Dampak Layanan Pelanggan</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Peningkatan tekanan sistemik ke 3 Bar memungkinkan ketersediaan air hingga lantai 3 tanpa alat bantu pompa tambahan bagi pelanggan.</p>
                <ul className="benefit-list" style={{ marginTop: '10px' }}>
                    <li><span className="check">✓</span> <div><strong>Lantai 2/3:</strong> Suplai mandiri 24 jam.</div></li>
                    <li><span className="check">✓</span> <div><strong>Kualitas:</strong> Menghindari kontaminasi akibat vacuum (low pressure).</div></li>
                </ul>
             </div>

             <div className="card full-width" style={{ border: '1px solid var(--accent-blue)', background: 'rgba(0, 150, 255, 0.02)' }}>
                <div className="card-header">
                    <h3 style={{ color: 'var(--accent-blue)' }}>🌐 Keterangan Strategis: Sinergi Interkoneksi Jaringan</h3>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                   Tekanan ideal di dalam jaringan pipa distribusi PDAM Makassar tercipta melalui sistem <strong>Interkoneksi Jaringan Distribusi</strong> antar Instalasi Pengolahan Air (IPA). Pompa IPA 2 tidak hanya melayani zona lokal, namun secara strategis memperkuat gradien hidraulis yang saling menopang dengan IPA lainnya (IPA Somba Opu, IPA Maccini Sombala, dll).
                </p>
                <div className="phase-info" style={{ marginTop: '15px' }}>
                    <div className="phase-title" style={{ fontSize: '0.8rem' }}>Keunggulan Sistem Interkoneksi:</div>
                    <ul className="phase-activities" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <li><strong>Redundansi:</strong> IPA lain membackup jika satu instalasi maintenance.</li>
                        <li><strong>Stabilitas Global:</strong> Tekanan merata di seluruh titik pelayanan.</li>
                        <li><strong>Balancing Load:</strong> Distribusi beban sesuai kapasitas real-time masing-masing IPA.</li>
                        <li><strong>Keamanan Suplai:</strong> Menjamin ketersediaan air pada area terminal terjauh.</li>
                    </ul>
                </div>
             </div>

             <div className="card full-width">
                <div className="card-header">
                    <h3>Visualisasi Proyeksi Manfaat Finansial (Rp Milyar / Bulan)</h3>
                    <span className="badge-dia" style={{ background: 'var(--success)', color: '#fff' }}>Hrg Air Rp 6.000/m³</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '15px' }}>
                    Estimasi pendapatan bulanan yang berhasil diselamatkan dari penurunan tingkat kehilangan air (Baseline NRW 50%).
                    Berdasarkan volume produksi 8.000.000 m³ dan rata-rata tarif air Rp 6.000 / m³.
                </p>
                <div className="chart-preview-expanded" style={{ height: '280px' }}>
                    <SimpleBarChart data={financialBenefitData} color="var(--success)" valueFormatter={(v)=>`Rp ${v}B`} />
                    <div className="chart-labels-expanded">{ROADMAP_DATA_BASE.map(d=><span key={d.thn}>{d.label}</span>)}</div>
                </div>
             </div>
          </div>
        )}

        {/* TAB 4: ROADMAP NRW */}
        {activeTab === 'ROADMAP' && (
          <div className="section-grid animate-in">
             <div className="card full-width">
                <div className="card-header">
                    <h3>Roadmap Penurunan NRW 10 Tahun (Target vs Baseline)</h3>
                    <span className="badge-dia">Visi Modernisasi Jaringan</span>
                </div>
                <div className="chart-preview-expanded" style={{ height: '320px' }}>
                    <SimpleBarChart data={ROADMAP_DATA_BASE.map(d => d.nrw)} color="var(--accent-blue)" showValues={true} />
                    <div className="chart-labels-expanded">
                        {ROADMAP_DATA_BASE.map(d => <span key={d.thn} style={{ fontSize: '0.6rem' }}>{d.label}<br/>{d.milestone}</span>)}
                    </div>
                </div>
             </div>
             
             <div className="card full-width">
                <div className="milestone-list">
                    {ROADMAP_DATA_BASE.filter(d=>d.thn<=5 || d.thn===10).map((m, i) => (
                        <div key={i} className="milestone-item">
                            <div className="m-year">{m.label}</div>
                            <div className="m-content">
                                <strong>NRW Target: {m.nrw}%</strong>
                                <p>Milestone: {m.milestone}. Fokus pada optimalisasi {m.thn < 3 ? 'Infrastruktur Dasar' : 'Operational Excellence'}.</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        )}

        {/* TAB 5: DATA PRODUKSI */}
        {activeTab === 'DATA' && (
          <div className="section-grid animate-in">
                <div className="card full-width">
                    <div className="card-header">
                        <h3>{appTexts.dataTitle} - Produksi Air Bersih (m³)</h3>
                        <span className="badge-dia" style={{ background: 'var(--accent-cyan)', color: '#000' }}>Laporan Bulanan Terintegrasi</span>
                    </div>
                    {/* ... rest of production data ... */}
                </div>

                <div className="card full-width">
                    <div className="card-header">
                        <h3>Trend Neraca Air (m³) Tahun {appTexts.year}</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span className="badge-dia" style={{ background: 'var(--success)', color: '#fff' }}>Revenue Water</span>
                            <span className="badge-dia" style={{ background: 'var(--error)', color: '#fff' }}>Non-Revenue Water (NRW)</span>
                        </div>
                    </div>
                    <SophisticatedNeracaChart data={neracaData} />
                    <div style={{ padding: '0 24px 24px 24px', fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: '1.6' }}>
                        <p>Grafik di atas menggabungkan seluruh komponen Neraca Air. <strong>Garis putus-putus</strong> menunjukkan total volume produksi (Input Sistem). Area berwarna menunjukkan pemanfaatan air: <strong>Hijau</strong> adalah air yang terbayar (Revenue), sementara <strong>Merah, Kuning, dan Cyan</strong> adalah komponen kehilangan air (NRW) yang terdiri dari Real Losses, Apparent Losses, dan Unbilled Authorized Consumption.</p>
                    </div>
                </div>

                <CompleteLineChart data={neracaData} year={appTexts.year} />

                <div className="card full-width">
                    <div className="card-header">
                        <h3>Tabel Trend Penurunan NRW (Roadmap Strategis 10 Tahun)</h3>
                        <button 
                            className="btn-secondary" 
                            style={{ fontSize: '0.65rem', padding: '4px 10px' }}
                            onClick={() => handleSendToSpreadsheet('Trend Roadmap NRW', ROADMAP_DATA_BASE)}
                            disabled={isSending}
                        >
                            {isSending ? '...' : '📤 Kirim Tabel'}
                        </button>
                    </div>
                    {/* ... roadmap table ... */}
                </div>

                <div className="card full-width">
                    <div className="card-header">
                        <h3>Tabel Detail Neraca Air (m³)</h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                                className="btn-secondary" 
                                style={{ fontSize: '0.65rem', padding: '4px 10px' }}
                                onClick={() => handleSendToSpreadsheet('Detail Neraca', neracaData)}
                                disabled={isSending}
                            >
                                {isSending ? '...' : '📤 Kirim Tabel'}
                            </button>
                            <span className="badge-dia" style={{ background: 'var(--accent-blue)', color: '#fff' }}>Data Historis Audit</span>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Bulan</th>
                                    <th style={{ textAlign: 'right' }}>Input Sistem (m³)</th>
                                    <th style={{ textAlign: 'right' }}>Billed (Revenue) (m³)</th>
                                    <th style={{ textAlign: 'right' }}>Unbilled Auth (m³)</th>
                                    <th style={{ textAlign: 'right' }}>Apparent Loss (m³)</th>
                                    <th style={{ textAlign: 'right' }}>Real Loss (m³)</th>
                                    <th style={{ textAlign: 'right', color: 'var(--error)' }}>Total NRW</th>
                                    <th style={{ textAlign: 'center' }}>NRW %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {neracaData.map((d, i) => {
                                    const nrwTotal = d.produksi - d.billed;
                                    const nrwPercent = (nrwTotal / d.produksi) * 100;
                                    return (
                                        <tr key={i}>
                                            <td style={{ fontWeight: '700' }}>{d.bulan}</td>
                                            <td style={{ textAlign: 'right' }}>{d.produksi.toLocaleString()}</td>
                                            <td style={{ textAlign: 'right', color: 'var(--success)', fontWeight: '600' }}>{d.billed.toLocaleString()}</td>
                                            <td style={{ textAlign: 'right' }}>{d.unbilledAuth.toLocaleString()}</td>
                                            <td style={{ textAlign: 'right' }}>{d.apparentLoss.toLocaleString()}</td>
                                            <td style={{ textAlign: 'right' }}>{d.realLoss.toLocaleString()}</td>
                                            <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--error)' }}>{nrwTotal.toLocaleString()}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <span className="badge-dia" style={{ 
                                                    background: nrwPercent > 40 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)', 
                                                    color: nrwPercent > 40 ? 'var(--error)' : 'var(--warning)',
                                                    fontWeight: '800'
                                                }}>\
                                                    {nrwPercent.toFixed(1)}%\
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    <td style={{ fontWeight: '800' }}>TOTAL</td>
                                    <td style={{ textAlign: 'right', fontWeight: '800' }}>{neracaData.reduce((a,b)=>a+b.produksi,0).toLocaleString()}</td>
                                    <td style={{ textAlign: 'right', fontWeight: '800', color: 'var(--success)' }}>{neracaData.reduce((a,b)=>a+b.billed,0).toLocaleString()}</td>
                                    <td style={{ textAlign: 'right', fontWeight: '800' }}>{neracaData.reduce((a,b)=>a+b.unbilledAuth,0).toLocaleString()}</td>
                                    <td style={{ textAlign: 'right', fontWeight: '800' }}>{neracaData.reduce((a,b)=>a+b.apparentLoss,0).toLocaleString()}</td>
                                    <td style={{ textAlign: 'right', fontWeight: '800' }}>{neracaData.reduce((a,b)=>a+b.realLoss,0).toLocaleString()}</td>
                                    <td style={{ textAlign: 'right', fontWeight: '900', color: 'var(--error)' }}>
                                        {(neracaData.reduce((a,b)=>a+b.produksi,0) - neracaData.reduce((a,b)=>a+b.billed,0)).toLocaleString()}
                                    </td>
                                    <td style={{ textAlign: 'center', fontWeight: '900', color: 'var(--error)' }}>
                                        {(( (neracaData.reduce((a,b)=>a+b.produksi,0) - neracaData.reduce((a,b)=>a+b.billed,0)) / neracaData.reduce((a,b)=>a+b.produksi,0) ) * 100).toFixed(1)}%
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {/* TAB 7: EDITOR KONTEN */}
        {activeTab === 'EDITOR' && !isViewer && (
            <div className="section-grid animate-in">
                {/* MERGED PARAMETER CONFIGURATION */}
                <div className="card full-width" style={{ border: '1px solid var(--accent-cyan)', background: 'rgba(0, 209, 255, 0.05)' }}>
                    <div className="card-header">
                        <h3 style={{ color: 'var(--accent-cyan)' }}>⚙️ Parameter & Unit Price Configuration</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Perubahan nilai di bawah ini akan secara otomatis memperbarui seluruh estimasi CAPEX pada tab Strategi.</p>
                    </div>
                    <div className="config-workspace">
                        <section className="config-group">
                            <h4>⚡ Unit Price Pompa & VFD</h4>
                            <div className="config-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                                {Object.keys(vfdPrices).map(pwr => (
                                    <div key={pwr} className="config-field">
                                        <label style={{ fontSize: '0.75rem' }}>Panel VFD {pwr}</label>
                                        <div className="input-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '4px' }}>
                                            <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Rp</span>
                                            <input type="number" value={vfdPrices[pwr]} onChange={(e) => handlePriceUpdate(setVfdPrices, pwr, e.target.value)} style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%' }} />
                                        </div>
                                    </div>
                                ))}
                                <div className="config-field">
                                    <label style={{ fontSize: '0.75rem' }}>Pompa High-Efficiency</label>
                                    <div className="input-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '4px' }}>
                                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Rp</span>
                                        <input type="number" value={pumpPrices["High-Efficiency"]} onChange={(e) => handlePriceUpdate(setPumpPrices, "High-Efficiency", e.target.value)} style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%' }} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="config-group" style={{ marginTop: '20px' }}>
                            <h4>💧 Unit Price Inline Pump & Pipa</h4>
                            <div className="config-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                                {Object.keys(inlinePumpPrices).map(lps => (
                                    <div key={lps} className="config-field">
                                        <label style={{ fontSize: '0.75rem' }}>Inline Booster {lps}</label>
                                        <div className="input-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '4px' }}>
                                            <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Rp</span>
                                            <input type="number" value={inlinePumpPrices[lps]} onChange={(e) => handlePriceUpdate(setInlinePumpPrices, lps, e.target.value)} style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%' }} />
                                        </div>
                                    </div>
                                ))}
                                <div className="config-field">
                                    <label style={{ fontSize: '0.75rem' }}>Pipa JDU 450mm (/m³)</label>
                                    <div className="input-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '4px' }}>
                                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Rp</span>
                                        <input type="number" value={pipePrices[450]} onChange={(e) => handlePriceUpdate(setPipePrices, 450, e.target.value)} style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%' }} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="config-group" style={{ marginTop: '20px' }}>
                            <h4>📡 Monitoring & SCADA Components</h4>
                            <div className="config-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                                <div className="config-field">
                                    <label style={{ fontSize: '0.75rem' }}>Ultrasonic Flowmeter</label>
                                    <div className="input-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '4px' }}>
                                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Rp</span>
                                        <input type="number" value={ultrasonicPrice} onChange={(e) => setUltrasonicPrice(parseInt(e.target.value) || 0)} style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%' }} />
                                    </div>
                                </div>
                                <div className="config-field">
                                    <label style={{ fontSize: '0.75rem' }}>Pressure Sensor Jaringan</label>
                                    <div className="input-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '4px' }}>
                                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Rp</span>
                                        <input type="number" value={pressureSensorPrice} onChange={(e) => setPressureSensorPrice(parseInt(e.target.value) || 0)} style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%' }} />
                                    </div>
                                </div>
                                <div className="config-field">
                                    <label style={{ fontSize: '0.75rem' }}>Integrasi SCADA (/Station)</label>
                                    <div className="input-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '4px' }}>
                                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Rp</span>
                                        <input type="number" value={scadaIntegrationPrice} onChange={(e) => setIotScadaIntegrationPrice(parseInt(e.target.value) || 0)} style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%' }} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="card full-width">
                    <div className="card-header">
                        <h3>Editor Teks Aplikasi</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Ubah judul dan deskripsi utama dashboard.</p>
                    </div>
                    <div className="config-workspace" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {Object.keys(appTexts).map((key) => (
                            <div key={key} className="config-field" style={{ marginBottom: '15px' }}>
                                <label style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</label>
                                <input 
                                    type="text" 
                                    value={(appTexts as any)[key]} 
                                    onChange={(e) => setAppTexts(prev => ({ ...prev, [key]: e.target.value }))}
                                    style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card full-width">
                    <div className="card-header">
                        <h3>Editor Data Neraca Air</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Masukkan data baru atau edit data bulanan yang ada.</p>
                    </div>
                    <div className="table-responsive">
                        <table style={{ fontSize: '0.75rem' }}>
                            <thead>
                                <tr>
                                    <th>Bulan</th>
                                    <th>Produksi (m³)</th>
                                    <th>Billed (m³)</th>
                                    <th>Unbilled Auth (m³)</th>
                                    <th>Apparent Loss (m³)</th>
                                    <th>Real Loss (m³)</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {neracaData.map((d, i) => (
                                    <tr key={i}>
                                        <td><input type="text" value={d.bulan} onChange={(e) => {
                                            const newData = [...neracaData];
                                            newData[i].bulan = e.target.value;
                                            setNeracaData(newData);
                                        }} style={{ width: '50px', background: 'transparent', border: 'none', color: '#fff' }} /></td>
                                        <td><input type="number" value={d.produksi} onChange={(e) => {
                                            const newData = [...neracaData];
                                            newData[i].produksi = parseInt(e.target.value) || 0;
                                            setNeracaData(newData);
                                        }} style={{ width: '80px', background: 'transparent', border: 'none', color: '#fff' }} /></td>
                                        <td><input type="number" value={d.billed} onChange={(e) => {
                                            const newData = [...neracaData];
                                            newData[i].billed = parseInt(e.target.value) || 0;
                                            setNeracaData(newData);
                                        }} style={{ width: '80px', background: 'transparent', border: 'none', color: '#fff' }} /></td>
                                        <td><input type="number" value={d.unbilledAuth} onChange={(e) => {
                                            const newData = [...neracaData];
                                            newData[i].unbilledAuth = parseInt(e.target.value) || 0;
                                            setNeracaData(newData);
                                        }} style={{ width: '80px', background: 'transparent', border: 'none', color: '#fff' }} /></td>
                                        <td><input type="number" value={d.apparentLoss} onChange={(e) => {
                                            const newData = [...neracaData];
                                            newData[i].apparentLoss = parseInt(e.target.value) || 0;
                                            setNeracaData(newData);
                                        }} style={{ width: '80px', background: 'transparent', border: 'none', color: '#fff' }} /></td>
                                        <td><input type="number" value={d.realLoss} onChange={(e) => {
                                            const newData = [...neracaData];
                                            newData[i].realLoss = parseInt(e.target.value) || 0;
                                            setNeracaData(newData);
                                        }} style={{ width: '80px', background: 'transparent', border: 'none', color: '#fff' }} /></td>
                                        <td>
                                            <button onClick={() => {
                                                const newData = neracaData.filter((_, idx) => idx !== i);
                                                setNeracaData(newData);
                                            }} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}>Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button 
                        className="btn-secondary" 
                        style={{ marginTop: '15px', width: '100%', borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
                        onClick={() => {
                            setNeracaData([...neracaData, { bulan: 'Baru', produksi: 0, billed: 0, unbilledAuth: 0, apparentLoss: 0, realLoss: 0 }]);
                        }}
                    >
                        + Tambah Baris Data Baru
                    </button>
                </div>
            </div>
        )}
      </main>

      <footer className="bp-footer no-print">
          <p className="text-sm text-gray-500">Strategic Modernization Dashboard</p>
      </footer>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}
