/* ============================================================
   GOLIS Wholesale — charts.js
   Chart.js wrappers for all dashboard charts.
   Requires Chart.js loaded via CDN before this file.
   Standard green/amber GOLIS brand palette.
   ============================================================ */

const Charts = {

  /* ──────────────────────────────────────────────────────────
     COLOR PALETTES
     ────────────────────────────────────────────────────────── */
  COLORS: {
    green:  ['#2d6a4f', '#52b788', '#74c69d', '#95d5b2', '#b7e4c7'],
    amber:  ['#f4a261', '#e76f51', '#f9c74f', '#f8961e', '#f3722c'],
    mixed:  ['#2d6a4f', '#f4a261', '#4361ee', '#e63946', '#9b2226', '#52b788', '#f9c74f', '#48cae4'],
    danger: ['#e63946', '#ff6b6b', '#f77f00', '#fcbf49'],
    info:   ['#4361ee', '#4cc9f0', '#4895ef', '#560bad'],
  },

  /* ──────────────────────────────────────────────────────────
     GLOBAL CHART DEFAULTS
     ────────────────────────────────────────────────────────── */
  _applyDefaults() {
    if (!window.Chart) return;
    Chart.defaults.font.family = "'Inter', 'Noto Sans Telugu', sans-serif";
    Chart.defaults.font.size   = 12;
    Chart.defaults.color       = '#6b7280';
    Chart.defaults.plugins.legend.labels.boxWidth  = 12;
    Chart.defaults.plugins.legend.labels.padding   = 16;
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(27,27,47,0.92)';
    Chart.defaults.plugins.tooltip.titleColor      = '#ffffff';
    Chart.defaults.plugins.tooltip.bodyColor       = '#d1fae5';
    Chart.defaults.plugins.tooltip.padding         = 10;
    Chart.defaults.plugins.tooltip.cornerRadius    = 8;
    Chart.defaults.plugins.tooltip.displayColors   = true;
    Chart.defaults.plugins.tooltip.boxWidth        = 10;
    Chart.defaults.plugins.tooltip.boxHeight       = 10;
  },

  /* ──────────────────────────────────────────────────────────
     DESTROY existing chart on a canvas (prevents conflicts)
     ────────────────────────────────────────────────────────── */
  _destroy(canvasId) {
    if (!window.Chart) return;
    const existing = Chart.getChart(canvasId);
    if (existing) existing.destroy();
  },

  /* ──────────────────────────────────────────────────────────
     RENDER LINE CHART
     labels:   ['Mon','Tue',...] or date strings
     datasets: [{ label:'Sales', data:[1200,3400,...], color:'#2d6a4f' }]
     options:  { yPrefix:'₹', showLegend:true, smooth:true }
     ────────────────────────────────────────────────────────── */
  renderLine(canvasId, labels, datasets, options = {}) {
    if (!window.Chart) { console.warn('Chart.js not loaded'); return; }
    this._applyDefaults();
    this._destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const yPrefix = options.yPrefix || '';
    const smooth  = options.smooth !== false;

    const chartDatasets = datasets.map((ds, i) => ({
      label:           ds.label || `Series ${i+1}`,
      data:            ds.data,
      borderColor:     ds.color || this.COLORS.green[i % this.COLORS.green.length],
      backgroundColor: ds.fill
        ? this._hexToRgba(ds.color || this.COLORS.green[i % this.COLORS.green.length], 0.12)
        : 'transparent',
      borderWidth:     2.5,
      pointRadius:     4,
      pointHoverRadius:6,
      pointBackgroundColor: ds.color || this.COLORS.green[i % this.COLORS.green.length],
      tension:         smooth ? 0.4 : 0,
      fill:            !!ds.fill,
    }));

    return new Chart(canvas, {
      type: 'line',
      data: { labels, datasets: chartDatasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: options.showLegend !== false, position: 'top' },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${yPrefix}${Utils ? Utils.formatIndianNumber(ctx.parsed.y) : ctx.parsed.y}`,
            },
          },
        },
        scales: {
          x: {
            grid:   { display: false },
            border: { display: false },
            ticks:  { maxTicksLimit: 7 },
          },
          y: {
            grid:   { color: '#f3f4f6', lineWidth: 1 },
            border: { display: false, dash: [4, 4] },
            ticks: {
              callback: v => yPrefix + (Utils ? Utils.formatIndianNumber(v) : v),
              maxTicksLimit: 6,
            },
          },
        },
        interaction: { mode: 'index', intersect: false },
        ...( options.extra || {} ),
      },
    });
  },

  /* ──────────────────────────────────────────────────────────
     RENDER AREA CHART (line with fill)
     Same API as renderLine — sets fill:true by default
     ────────────────────────────────────────────────────────── */
  renderArea(canvasId, labels, datasets, options = {}) {
    const areaDatasets = datasets.map(ds => ({ ...ds, fill: true }));
    return this.renderLine(canvasId, labels, areaDatasets, options);
  },

  /* ──────────────────────────────────────────────────────────
     RENDER BAR CHART
     labels:   ['Tomato','Onion',...]
     datasets: [{ label:'Sales', data:[1200,3400,...], color:'#2d6a4f' }]
     options:  { horizontal:false, stacked:false, yPrefix:'₹' }
     ────────────────────────────────────────────────────────── */
  renderBar(canvasId, labels, datasets, options = {}) {
    if (!window.Chart) { console.warn('Chart.js not loaded'); return; }
    this._applyDefaults();
    this._destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const yPrefix    = options.yPrefix || '';
    const horizontal = options.horizontal || false;

    const chartDatasets = datasets.map((ds, i) => {
      const colors = Array.isArray(ds.color)
        ? ds.color
        : [ds.color || this.COLORS.mixed[i % this.COLORS.mixed.length]];

      const bgColors = ds.data.map((_, j) =>
        Array.isArray(ds.color)
          ? (ds.color[j % ds.color.length])
          : (ds.color || this.COLORS.mixed[i % this.COLORS.mixed.length])
      );

      return {
        label:           ds.label || `Series ${i+1}`,
        data:            ds.data,
        backgroundColor: bgColors.map(c => this._hexToRgba(c, 0.85)),
        borderColor:     bgColors,
        borderWidth:     1,
        borderRadius:    4,
        borderSkipped:   false,
      };
    });

    const indexAxis = horizontal ? 'y' : 'x';

    return new Chart(canvas, {
      type: 'bar',
      data: { labels, datasets: chartDatasets },
      options: {
        indexAxis,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: options.showLegend !== false, position: 'top' },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${yPrefix}${Utils ? Utils.formatIndianNumber(ctx.parsed[horizontal ? 'x' : 'y']) : ctx.parsed[horizontal ? 'x' : 'y']}`,
            },
          },
        },
        scales: {
          x: {
            stacked: options.stacked || false,
            grid:    { display: horizontal },
            border:  { display: false },
          },
          y: {
            stacked: options.stacked || false,
            grid:    { color: '#f3f4f6' },
            border:  { display: false },
            ticks: {
              callback: v => yPrefix + (Utils ? Utils.formatIndianNumber(v) : v),
              maxTicksLimit: 6,
            },
          },
        },
        interaction: { mode: 'index', intersect: false },
        ...( options.extra || {} ),
      },
    });
  },

  /* ──────────────────────────────────────────────────────────
     RENDER DOUGHNUT CHART
     labels: ['Tomato','Onion',...]
     data:   [1200, 3400, ...]
     options: { showLegend:true, cutout:'65%', centerText:'' }
     ────────────────────────────────────────────────────────── */
  renderDoughnut(canvasId, labels, data, options = {}) {
    if (!window.Chart) { console.warn('Chart.js not loaded'); return; }
    this._applyDefaults();
    this._destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const palette = options.palette || 'mixed';
    const colors  = this.COLORS[palette] || this.COLORS.mixed;
    const bgColors = labels.map((_, i) => colors[i % colors.length]);

    // Optional center text plugin
    const centerTextPlugin = options.centerText ? [{
      id: 'centerText',
      afterDraw(chart) {
        const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;
        ctx.save();
        const cx = left + width / 2;
        const cy = top + height / 2;
        ctx.font = 'bold 18px Inter, sans-serif';
        ctx.fillStyle = '#1b1b2f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(options.centerText, cx, cy - 6);
        if (options.centerSub) {
          ctx.font = '11px Inter, sans-serif';
          ctx.fillStyle = '#6b7280';
          ctx.fillText(options.centerSub, cx, cy + 14);
        }
        ctx.restore();
      }
    }] : [];

    return new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: bgColors,
          borderColor:     '#ffffff',
          borderWidth:     3,
          hoverOffset:     6,
        }],
      },
      plugins: centerTextPlugin,
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        cutout:              options.cutout || '65%',
        plugins: {
          legend: {
            display:  options.showLegend !== false,
            position: options.legendPosition || 'right',
            labels:   { padding: 14, usePointStyle: true, pointStyleWidth: 10 },
          },
          tooltip: {
            callbacks: {
              label: ctx => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const pct   = ((ctx.parsed / total) * 100).toFixed(1);
                const val   = Utils ? Utils.formatIndianNumber(ctx.parsed) : ctx.parsed;
                return ` ${ctx.label}: ${val} (${pct}%)`;
              },
            },
          },
        },
        ...( options.extra || {} ),
      },
    });
  },

  /* ──────────────────────────────────────────────────────────
     RENDER PIE CHART (doughnut with cutout=0)
     ────────────────────────────────────────────────────────── */
  renderPie(canvasId, labels, data, options = {}) {
    return this.renderDoughnut(canvasId, labels, data, { ...options, cutout: '0%' });
  },

  /* ──────────────────────────────────────────────────────────
     DASHBOARD SPECIFIC — 7-day Sales vs Purchases line chart
     ────────────────────────────────────────────────────────── */
  renderSalesTrend(canvasId) {
    const stats = MockDB && MockDB.getTodayDashboardStats ? MockDB.getTodayDashboardStats() : null;
    if (!stats) return;

    const trend   = stats.salesTrend || [];
    const labels  = trend.map(d => {
      const dt = new Date(d.date);
      return dt.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
    });
    const sales     = trend.map(d => d.sales);
    const purchases = trend.map(d => d.purchases);

    return this.renderLine(canvasId, labels, [
      { label: 'Sales',     data: sales,     color: '#2d6a4f', fill: true },
      { label: 'Purchases', data: purchases, color: '#f4a261', fill: false },
    ], { yPrefix: '₹', showLegend: true, smooth: true });
  },

  /* ──────────────────────────────────────────────────────────
     DASHBOARD SPECIFIC — Vegetable stock donut
     ────────────────────────────────────────────────────────── */
  renderStockDonut(canvasId) {
    if (!MockDB) return;
    const vegs    = MockDB.getVegetables().slice(0, 8);
    const labels  = vegs.map(v => v.nameEn);
    const data    = vegs.map(v => v.available);
    return this.renderDoughnut(canvasId, labels, data, {
      showLegend: true,
      legendPosition: 'bottom',
      palette: 'mixed',
    });
  },

  /* ──────────────────────────────────────────────────────────
     DASHBOARD SPECIFIC — Vendor volume bar chart
     ────────────────────────────────────────────────────────── */
  renderVendorVolumeBar(canvasId) {
    if (!MockDB) return;
    const vendors = MockDB.getVendors();
    const orders  = MockDB.getOrders();

    const labels = vendors.map(v => v.businessName.split(' ').slice(0,2).join(' '));
    const data   = vendors.map(v => {
      return orders.filter(o => o.vendorId === v.id).reduce((s, o) => s + o.total, 0);
    });

    return this.renderBar(canvasId, labels, [{
      label: 'Order Value',
      data,
      color: this.COLORS.mixed,
    }], { yPrefix: '₹', showLegend: false });
  },

  /* ──────────────────────────────────────────────────────────
     DASHBOARD SPECIFIC — Expense breakdown donut
     ────────────────────────────────────────────────────────── */
  renderExpenseBreakdown(canvasId) {
    if (!MockDB) return;
    const expenses = MockDB.getExpenses();
    const byCategory = {};
    expenses.forEach(e => {
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    });
    const labels = Object.keys(byCategory);
    const data   = labels.map(k => byCategory[k]);

    return this.renderDoughnut(canvasId, labels, data, {
      showLegend: true,
      legendPosition: 'bottom',
      palette: 'amber',
    });
  },

  /* ──────────────────────────────────────────────────────────
     DASHBOARD SPECIFIC — Farmer supply bar chart
     ────────────────────────────────────────────────────────── */
  renderFarmerSupplyBar(canvasId) {
    if (!MockDB) return;
    const farmers   = MockDB.getFarmers();
    const purchases = MockDB.getPurchases();

    const labels = farmers.map(f => f.name.split(' ')[0]);
    const data   = farmers.map(f => {
      return purchases.filter(p => p.farmerId === f.id).reduce((s, p) => s + p.total, 0);
    });

    return this.renderBar(canvasId, labels, [{
      label: 'Purchase Value',
      data,
      color: this.COLORS.green,
    }], { yPrefix: '₹', showLegend: false, horizontal: true });
  },

  /* ──────────────────────────────────────────────────────────
     DASHBOARD SPECIFIC — Profit vs Expense area chart
     ────────────────────────────────────────────────────────── */
  renderProfitTrend(canvasId) {
    // Use same 7-day trend data, compute gross profit = sales - purchases
    const stats = MockDB && MockDB.getTodayDashboardStats ? MockDB.getTodayDashboardStats() : null;
    if (!stats) return;

    const trend   = stats.salesTrend || [];
    const labels  = trend.map(d => {
      const dt = new Date(d.date);
      return dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    });
    const profit = trend.map(d => Math.max(0, d.sales - d.purchases));

    return this.renderArea(canvasId, labels, [{
      label: 'Gross Profit',
      data: profit,
      color: '#40916c',
      fill: true,
    }], { yPrefix: '₹', showLegend: false });
  },

  /* ──────────────────────────────────────────────────────────
     UTILITY — hex to rgba
     ────────────────────────────────────────────────────────── */
  _hexToRgba(hex, alpha = 1) {
    if (!hex || !hex.startsWith('#')) return `rgba(45,106,79,${alpha})`;
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  },
};
