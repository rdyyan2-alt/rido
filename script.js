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

const SERVICE_IMPACT_DATA = [
    { indicator: 'Cakupan Layanan', baseline: 80, target: 95, current: 85 },
    { indicator: 'Penurunan Keluhan Pelanggan', baseline: 100, target: 20, current: 60 }, // Lower is better
    { indicator: 'Kualitas Air (Uji Lab)', baseline: 70, target: 90, current: 78 },
    { indicator: 'Efisiensi Penanganan Aduan', baseline: 60, target: 90, current: 75 },
];

const pipePrices = {
    75: 450000, 100: 650000, 150: 950000, 200: 1250000, 250: 1650000, 450: 2850000
};

const calculatedRegionalData = INITIAL_REGIONAL_BASE.map(d => {
    const pipeCost = d.panjang * (pipePrices[d.diameter] || 1150000);
    // For simplicity, other costs (inline, digital) are omitted as they are not used in this specific table
    return {
        ...d,
        anggaranPipa: pipeCost,
        totalPipaKritis: d.pipaTuaM + d.tahunNihilM
    };
});

// --- Main Rendering Function ---
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.dashboard-content');
    if (mainContent) {
        mainContent.innerHTML = `
            <section class="card">
                <h2>Analisa Masalah & Infrastruktur Kritis</h2>
                <p>Total Produksi (5 IPA): ${(NERACA_AIR_2022_DATA.reduce((acc, curr) => acc + curr.produksi, 0) / NERACA_AIR_2022_DATA.length).toLocaleString(undefined, { maximumFractionDigits: 0 })} m³</p>
                <p>Volume Air Terbayar: ${(NERACA_AIR_2022_DATA.reduce((acc, curr) => acc + curr.billed, 0) / NERACA_AIR_2022_DATA.length).toLocaleString(undefined, { maximumFractionDigits: 0 })} m³</p>
                <p>Tingkat Kehilangan (NRW): ${(((NERACA_AIR_2022_DATA.reduce((acc, curr) => acc + curr.produksi, 0) - NERACA_AIR_2022_DATA.reduce((acc, curr) => acc + curr.billed, 0)) / NERACA_AIR_2022_DATA.reduce((acc, curr) => acc + curr.produksi, 0)) * 100).toFixed(0)}%</p>
            </section>
            <section class="card full-width">
                <h2>Data Infrastruktur Kritis (Pipa Tua & Tanpa Tahun Pasang)</h2>
                <p style="font-size: 0.8rem; color: #aaa; margin-bottom: 15px;">
                  Sesuai Laporan Strategi Modernisasi, pipa yang <strong>tidak memiliki tahun pasang</strong> dan pipa <strong>terpasang ≤ tahun 2001 (usia > 25 tahun)</strong> dikategorikan sebagai <strong>Pipa Tua</strong>. Infrastruktur ini menjadi prioritas utama penggantian karena akumulasi korosi, penyempitan diameter efektif, dan tingginya risiko kebocoran laten.
                </p>
                <div class="table-responsive">
                    <table id="critical-infrastructure-table">
                        <thead>
                            <tr>
                                <th>Wilayah</th>
                                <th style="text-align: center;">Total Jaringan (m³)</th>
                                <th style="text-align: center;">Pipa Tua (m³)</th>
                                <th style="text-align: center;">Tahun Pasang Nihil (m³)</th>
                                <th style="text-align: center;">Total Kritis (m³)</th>
                                <th style="text-align: center;">Rasio Kritis (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${calculatedRegionalData.map(d => `
                                <tr>
                                    <td style="font-weight: 600;">${d.wilayah}</td>
                                    <td style="text-align: center;">${d.panjang.toLocaleString()}</td>
                                    <td style="text-align: center; color: #f59e0b;">${d.pipaTuaM.toLocaleString()}</td>
                                    <td style="text-align: center; color: #ef4444;">${d.tahunNihilM.toLocaleString()}</td>
                                    <td style="text-align: center; font-weight: 700;">${(d.pipaTuaM + d.tahunNihilM).toLocaleString()}</td>
                                    <td style="text-align: center;">
                                        <span class="badge-dia" style="background: ${((d.pipaTuaM + d.tahunNihilM) / d.panjang * 100) > 40 ? '#ef4444' : 'rgba(245, 158, 11, 0.2)'}; color: ${((d.pipaTuaM + d.tahunNihilM) / d.panjang * 100) > 40 ? '#fff' : '#f59e0b'}">
                                            ${((d.pipaTuaM + d.tahunNihilM) / d.panjang * 100).toFixed(1)}%
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
            <section class="card full-width">
                <h2>Rincian Diameter Pipa Tua & Tanpa Tahun Pasang Per Wilayah</h2>
                <div class="table-responsive">
                    <table id="detail-kritis-table">
                        <thead>
                            <tr>
                                <th>Wilayah</th>
                                <th>Diameter (mm)</th>
                                <th style="text-align: center;">Pipa Tua (m³)</th>
                                <th style="text-align: center;">Tahun Nihil (m³)</th>
                                <th>Status Kerentanan</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${calculatedRegionalData.map(d => d.detailKritis.map((item, idx) => `
                                <tr>
                                    ${idx === 0 ? `<td rowSpan="${d.detailKritis.length}" style="font-weight: 700; border-right: 1px solid #222; background: rgba(255,255,255,0.02);">${d.wilayah}</td>` : ''}
                                    <td style="font-weight: 600;">Ø ${item.d} mm</td>
                                    <td style="text-align: center; color: #f59e0b;">${item.t.toLocaleString()}</td>
                                    <td style="text-align: center; color: #ef4444;">${item.n.toLocaleString()}</td>
                                    <td>
                                        <span class="badge-dia" style="background: ${item.d >= 250 ? '#ef4444' : '#f59e0b'}; color: ${item.d >= 250 ? '#fff' : '#000'}">
                                            ${item.d >= 250 ? 'Kritis JDU' : 'Distribusi'}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
            </section>
            <section class="card full-width">
                <div class="card-header">
                    <div class="masalah-header-left">
                        <h2>Identifikasi Kehilangan Air (NRW) Per DMA</h2>
                        <p style="font-size: 0.75rem; color: #ef4444; font-weight: 600; margin-top: 4px;">⚠️ Tekanan Rata-rata Input DMA: &lt; 1.0 Bar (Anomali Suplai)</p>
                    </div>
                    <div class="view-toggle">
                        <button class="btn-secondary active" id="heatmap-global-btn">Heatmap Global</button>
                        <button class="btn-secondary" id="analisa-deep-dive-btn">Analisa Deep-Dive</button>
                    </div>
                </div>

                <div class="impact-stats" style="margin-bottom: 24px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3);">
                    <div class="stat-item">
                        <span class="stat-label">Total Produksi (5 IPA)</span>
                        <span class="stat-val" style="color: #fff;" id="total-produksi-dma">${(NERACA_AIR_2022_DATA.reduce((acc, curr) => acc + curr.produksi, 0) / NERACA_AIR_2022_DATA.length).toLocaleString(undefined, { maximumFractionDigits: 0 })} m³</span>
                        <span class="stat-label">Per Bulan</span>
                    </div>
                    <div class="stat-item" style="border-left: 1px solid #333; padding-left: 20px;">
                        <span class="stat-label">Volume Air Terbayar</span>
                        <span class="stat-val" style="color: #10b981;" id="volume-air-terbayar-dma">${(NERACA_AIR_2022_DATA.reduce((acc, curr) => acc + curr.billed, 0) / NERACA_AIR_2022_DATA.length).toLocaleString(undefined, { maximumFractionDigits: 0 })} m³</span>
                        <span class="stat-label">Tercatat Per Bulan</span>
                    </div>
                    <div class="stat-item" style="border-left: 1px solid #333; padding-left: 20px;">
                        <span class="stat-label">Tingkat Kehilangan (NRW)</span>
                        <span class="stat-val" style="color: #ef4444;" id="tingkat-kehilangan-nrw-dma">${(((NERACA_AIR_2022_DATA.reduce((acc, curr) => acc + curr.produksi, 0) - NERACA_AIR_2022_DATA.reduce((acc, curr) => acc + curr.billed, 0)) / NERACA_AIR_2022_DATA.reduce((acc, curr) => acc + curr.produksi, 0)) * 100).toFixed(0)}%</span>
                        <span class="stat-label">Rata-rata Kota</span>
                    </div>
                </div>

                <div id="dma-view-content">
                    <!-- DMA content will be loaded here by JavaScript -->
                </div>
            </section>
            <section class="card">
                <h2>Strategi & Estimasi Investasi (CAPEX)</h2>
                <p>Content for Strategi & CAPEX/OPEX will go here.</p>
            </section>
            <section class="card">
                <h2>Sasaran Strategis & Dampak Layanan</h2>
                <p>Content for Sasaran & Dampak will go here.</p>
            </section>
            <section class="card">
                <h2>Roadmap Penurunan NRW 10 Tahun</h2>
                <p>Content for Roadmap NRW will go here.</p>
            </section>
            <section class="card">
                <h2>Pusat Data & Laporan Terintegrasi</h2>
                <p>Content for Data will go here.</p>
            </section>
        `;

        // DMA View Toggle Logic
        const dmaViewContent = document.getElementById('dma-view-content');
        const heatmapGlobalBtn = document.getElementById('heatmap-global-btn');
        const analisaDeepDiveBtn = document.getElementById('analisa-deep-dive-btn');

        function renderHeatmapGlobal() {
            dmaViewContent.innerHTML = `
                <div class="table-responsive" style="max-height: 400px;">
                    <table class="heatmap-table">
                        <thead><tr><th>Nama DMA</th>${MONTHS.map(m => `<th>${m}</th>`).join('')}</tr></thead>
                        <tbody>
                            ${NRW_DMA_DATA.map(d => `
                                <tr>
                                    <td>${d.name}</td>
                                    ${d.data.map(v => `<td style="background-color: ${getHeatmapColor(v).bgColor}; color: ${getHeatmapColor(v).textColor}; font-weight: 700; text-align: center; font-size: 0.7rem; padding: 4px;">${v}%</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        function getHeatmapColor(value) {
            let bgColor = 'rgba(16, 185, 129, 0.15)'; // green
            let textColor = '#10b981';
            if (value > 20 && value <= 40) {
                bgColor = 'rgba(245, 158, 11, 0.15)'; // orange
                textColor = '#f59e0b';
            } else if (value > 40 || value < 0) {
                bgColor = 'rgba(239, 68, 68, 0.15)'; // red
                textColor = '#ef4444';
            }
            return { bgColor, textColor };
        }

        let selectedDma = ALL_DMA_NAMES[0]; // Default selected DMA

        function renderBarChart(elementId, data, labels, title, color) {
            const chartElement = document.getElementById(elementId);
            if (!chartElement) return;

            chartElement.innerHTML = `
                <div style="width: 100%; height: 200px; display: flex; align-items: flex-end; justify-content: space-around; padding: 10px; box-sizing: border-box;">
                    ${data.map((val, i) => `
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; width: ${100 / data.length}%;">
                            <div style="height: ${val / Math.max(...data) * 90}%; width: 80%; background-color: ${color}; border-radius: 3px;" title="${labels[i]}: ${val.toLocaleString()}"></div>
                            <span style="font-size: 0.6rem; color: #aaa; margin-top: 5px;">${labels[i]}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function renderAnalisaDeepDive() {
            const deepDiveTemplate = document.getElementById('analisa-deep-dive-template');
            dmaViewContent.innerHTML = deepDiveTemplate.innerHTML;

            const dmaSelector = dmaViewContent.querySelector('.dma-selector');
            dmaSelector.innerHTML = ALL_DMA_NAMES.map(dma => `
                <button class="btn-secondary ${dma === selectedDma ? 'active' : ''}" data-dma="${dma}">${dma}</button>
            `).join('');

            dmaSelector.querySelectorAll('.btn-secondary').forEach(button => {
                button.addEventListener('click', (event) => {
                    dmaSelector.querySelectorAll('.btn-secondary').forEach(btn => btn.classList.remove('active'));
                    event.target.classList.add('active');
                    selectedDma = event.target.dataset.dma;
                    renderDmaCharts(selectedDma);
                });
            });

            renderDmaCharts(selectedDma);
        }

        function renderDmaCharts(dmaName) {
            const meterIndukData = METER_INDUK_DATA.find(d => d.name === dmaName);
            const nrwTrendData = NRW_DMA_DATA.find(d => d.name === dmaName);

            if (meterIndukData) {
                renderBarChart('meter-induk-chart', meterIndukData.data, MONTHS, 'Volume Meter Induk (m³)', '#007bff');
            }
            if (nrwTrendData) {
                renderBarChart('nrw-trend-chart', nrwTrendData.data, MONTHS, 'Trend Kehilangan NRW (%)', '#ef4444');
            }

            // Update impact stats (simplified for now)
            const avgPressureElement = dmaViewContent.querySelector('#avg-pressure');
            const supplyConditionElement = dmaViewContent.querySelector('#supply-condition');

            // Example static values for now, can be made dynamic later
            if (avgPressureElement) avgPressureElement.textContent = '0.65 Bar';
            if (supplyConditionElement) supplyConditionElement.textContent = 'KRITIS (Under 1 Bar)';
        }

        heatmapGlobalBtn.addEventListener('click', () => {
            heatmapGlobalBtn.classList.add('active');
            analisaDeepDiveBtn.classList.remove('active');
            renderHeatmapGlobal();
        });

        analisaDeepDiveBtn.addEventListener('click', () => {
            analisaDeepDiveBtn.classList.add('active');
            heatmapGlobalBtn.classList.remove('active');
            renderAnalisaDeepDive();
        });

        // Initial render
        renderHeatmapGlobal();
    }

    // --- CAPEX Data and Rendering --- 
    const capexData = calculatedRegionalData.map(d => ({
        wilayah: d.wilayah,
        anggaranPipa: d.anggaranPipa,
        anggaranSmartMeter: d.unit * 1500000, // Example: 1.5jt per unit
        anggaranDigital: d.unit * 500000, // Example: 0.5jt per unit
        totalAnggaran: d.anggaranPipa + (d.unit * 1500000) + (d.unit * 500000)
    }));

    const capexComponentsData = [
        { name: 'Pipa', value: capexData.reduce((sum, d) => sum + d.anggaranPipa, 0) },
        { name: 'Smart Meter', value: capexData.reduce((sum, d) => sum + d.anggaranSmartMeter, 0) },
        { name: 'Digitalisasi', value: capexData.reduce((sum, d) => sum + d.anggaranDigital, 0) }
    ];

    const capexAllocationChartElement = document.getElementById('capex-allocation-chart');
    if (capexAllocationChartElement) {
        renderBarChart(
            'capex-allocation-chart',
            capexData.map(d => d.totalAnggaran),
            capexData.map(d => d.wilayah),
            'Alokasi Anggaran (per Wilayah)',
            '#10b981' // green
        );
    }

    const capexComponentsChartElement = document.getElementById('capex-components-chart');
    if (capexComponentsChartElement) {
        renderBarChart(
            'capex-components-chart',
            capexComponentsData.map(d => d.value),
            capexComponentsData.map(d => d.name),
            'Komponen Biaya Utama',
            '#f59e0b' // orange
        );
    }

    const capexSummaryTableBody = document.querySelector('#capex-summary-table tbody');
    if (capexSummaryTableBody) {
        capexSummaryTableBody.innerHTML = capexData.map(d => `
            <tr>
                <td style="font-weight: 600;">${d.wilayah}</td>
                <td style="text-align: right;">${d.anggaranPipa.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</td>
                <td style="text-align: right;">${d.anggaranSmartMeter.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</td>
                <td style="text-align: right;">${d.anggaranDigital.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</td>
                <td style="text-align: right; font-weight: 700; color: #007bff;">${d.totalAnggaran.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}</td>
            </tr>
        `).join('');
    }

    // --- Service Impact Data and Rendering ---
    const serviceCoverageChartElement = document.getElementById('service-coverage-chart');
    if (serviceCoverageChartElement) {
        const coverageData = SERVICE_IMPACT_DATA.find(d => d.indicator === 'Cakupan Layanan');
        if (coverageData) {
            renderBarChart(
                'service-coverage-chart',
                [coverageData.baseline, coverageData.target, coverageData.current],
                ['Baseline', 'Target', 'Current'],
                'Cakupan Layanan (%)',
                '#007bff'
            );
        }
    }

    const customerSatisfactionChartElement = document.getElementById('customer-satisfaction-chart');
    if (customerSatisfactionChartElement) {
        const satisfactionData = SERVICE_IMPACT_DATA.find(d => d.indicator === 'Tingkat Kepuasan Pelanggan');
        if (satisfactionData) {
            renderBarChart(
                'customer-satisfaction-chart',
                [satisfactionData.baseline, satisfactionData.target, satisfactionData.current],
                ['Baseline', 'Target', 'Current'],
                'Tingkat Kepuasan Pelanggan (%)',
                '#10b981'
            );
        }
    }

    const serviceImpactTableBody = document.querySelector('#service-impact-table tbody');
    if (serviceImpactTableBody) {
        serviceImpactTableBody.innerHTML = SERVICE_IMPACT_DATA.map(d => {
            const achievement = d.indicator === 'Penurunan Keluhan Pelanggan' 
                ? ((d.baseline - d.current) / (d.baseline - d.target) * 100).toFixed(1) // Lower is better
                : ((d.current - d.baseline) / (d.target - d.baseline) * 100).toFixed(1); // Higher is better
            const statusColor = parseFloat(achievement) >= 100 ? '#10b981' : (parseFloat(achievement) >= 50 ? '#f59e0b' : '#ef4444');
            const statusText = parseFloat(achievement) >= 100 ? 'Tercapai' : (parseFloat(achievement) >= 50 ? 'Progress' : 'Perlu Perhatian');

            return `
                <tr>
                    <td style="font-weight: 600;">${d.indicator}</td>
                    <td style="text-align: center;">${d.baseline}%</td>
                    <td style="text-align: center;">${d.target}%</td>
                    <td style="text-align: center;">${achievement}%</td>
                    <td>
                        <span class="badge-dia" style="background-color: ${statusColor}; color: #fff;">
                            ${statusText}
                        </span>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // --- Roadmap Data and Rendering ---
    const roadmapChartElement = document.getElementById('roadmap-chart');
    if (roadmapChartElement) {
        renderBarChart(
            'roadmap-chart',
            ROADMAP_DATA_BASE.map(d => d.nrw),
            ROADMAP_DATA_BASE.map(d => d.label),
            'Target NRW (%)',
            '#ef4444' // red
        );
    }

    const roadmapTimelineElement = document.querySelector('.roadmap-timeline');
    if (roadmapTimelineElement) {
        roadmapTimelineElement.innerHTML = ROADMAP_DATA_BASE.map(d => `
            <div class="timeline-item">
                <div class="timeline-year">${d.label === 'Baseline' ? '2023' : `Tahun ${d.thn}`}</div>
                <div class="timeline-content">
                    <h5 style="color: #007bff;">${d.milestone}</h5>
                    <p>Target NRW: ${d.nrw}%</p>
                    <p>Volume Air Terselamatkan: ${d.air.toLocaleString()} Juta m³</p>
                </div>
            </div>
        `).join('');
    }

    // --- Data & Laporan Terintegrasi Rendering ---
    const productionDataTableBody = document.querySelector('#production-data-table tbody');
    if (productionDataTableBody) {
        productionDataTableBody.innerHTML = PRODUCTION_DATA_2025.map(d => `
            <tr>
                <td style="font-weight: 600;">${d.bulan}</td>
                <td style="text-align: right;">${d.ratulangi.toLocaleString()}</td>
                <td style="text-align: right;">${d.panaikang.toLocaleString()}</td>
                <td style="text-align: right;">${d.antang.toLocaleString()}</td>
                <td style="text-align: right;">${d.sombala.toLocaleString()}</td>
                <td style="text-align: right;">${d.sombaopu.toLocaleString()}</td>
                <td style="text-align: right; font-weight: 700; color: #007bff;">${d.total.toLocaleString()}</td>
            </tr>
        `).join('');
    }

    const neracaAirTableBody = document.querySelector('#neraca-air-table tbody');
    if (neracaAirTableBody) {
        neracaAirTableBody.innerHTML = NERACA_AIR_2022_DATA.map(d => {
            const nrwPercentage = (((d.produksi - d.billed) / d.produksi) * 100).toFixed(1);
            const nrwColor = parseFloat(nrwPercentage) > 40 ? '#ef4444' : (parseFloat(nrwPercentage) > 20 ? '#f59e0b' : '#10b981');
            return `
                <tr>
                    <td style="font-weight: 600;">${d.bulan}</td>
                    <td style="text-align: right;">${d.produksi.toLocaleString()}</td>
                    <td style="text-align: right;">${d.billed.toLocaleString()}</td>
                    <td style="text-align: right; font-weight: 700; color: ${nrwColor};">${nrwPercentage}%</td>
                </tr>
            `;
        }).join('');
    }
});
