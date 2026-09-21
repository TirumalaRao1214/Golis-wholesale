/**
 * GOLIS Wholesale — charts.js
 * Pure SVG/CSS chart library. Zero external dependencies.
 * Replaces Chart.js CDN with self-contained implementations.
 *
 * Exposed as: window.GolisCharts
 */

(function (global) {
  'use strict';

  /* ── Color palette ───────────────────────────────────────── */
  var PALETTE = {
    green:  ['#2d6a4f','#52b788','#74c69d','#95d5b2','#b7e4c7','#d8f3dc'],
    amber:  ['#f4a261','#e76f51','#f9c74f','#f8961e','#f3722c','#e9c46a'],
    mixed:  ['#2d6a4f','#f4a261','#4361ee','#e63946','#9b2226','#52b788','#f9c74f','#74c69d'],
    blue:   ['#4361ee','#4895ef','#4cc9f0','#3f37c9','#560bad','#7209b7'],
  };

  /* ── SVG helpers ─────────────────────────────────────────── */
  function svgEl(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    return el;
  }

  function svgText(content, attrs) {
    var el = svgEl('text', attrs);
    el.textContent = content;
    return el;
  }

  function clearContainer(containerId) {
    var el = document.getElementById(containerId);
    if (!el) return null;
    el.innerHTML = '';
    return el;
  }

  function formatVal(n) {
    if (Math.abs(n) >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L';
    if (Math.abs(n) >= 1000) return '₹' + (n / 1000).toFixed(0) + 'K';
    return String(n);
  }

  /* ══════════════════════════════════════════════════════════
     LINE / AREA CHART
     containerId: id of a <div> or <canvas> element
     labels: string[]
     datasets: [{label, data: number[], color}]
     options: {fill, title, yLabel, height}
     ══════════════════════════════════════════════════════════ */
  function renderLine(containerId, labels, datasets, options) {
    var container = clearContainer(containerId);
    if (!container) return;
    options = options || {};

    /* Guard: datasets must be a non-empty array */
    if (!Array.isArray(datasets) || datasets.length === 0) {
      console.warn('renderLine: no datasets for #' + containerId);
      container.innerHTML = '<p style="color:#9ca3af;text-align:center;padding:40px 0;font-size:13px;">No chart data available</p>';
      return;
    }

    /* Guard: each dataset's data array must be valid */
    datasets = datasets.map(function (ds) {
      if (!Array.isArray(ds.data)) {
        console.warn('renderLine: dataset "' + (ds.label || '?') + '" has no data array — skipping dataset');
        return Object.assign({}, ds, { data: [] });
      }
      return ds;
    });

    /* Drop datasets that are empty after sanitisation */
    var validDatasets = datasets.filter(function (ds) { return ds.data.length > 0; });
    if (validDatasets.length === 0) {
      container.innerHTML = '<p style="color:#9ca3af;text-align:center;padding:40px 0;font-size:13px;">No chart data available</p>';
      return;
    }
    datasets = validDatasets;

    var W = container.clientWidth || 560;
    var H = options.height || 220;
    var PAD = { top: 30, right: 20, bottom: 50, left: 55 };
    var chartW = W - PAD.left - PAD.right;
    var chartH = H - PAD.top - PAD.bottom;

    /* Collect all values to find min/max */
    var allVals = [];
    datasets.forEach(function (ds) { allVals = allVals.concat(ds.data); });
    var minVal = Math.min(0, Math.min.apply(null, allVals));
    var maxVal = Math.max.apply(null, allVals) * 1.1 || 1;
    var range  = maxVal - minVal;

    function xPos(i) { return PAD.left + (i / (labels.length - 1 || 1)) * chartW; }
    function yPos(v) { return PAD.top + chartH - ((v - minVal) / range) * chartH; }

    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, width: '100%', height: H });

    /* Grid lines */
    var gridCount = 4;
    for (var gi = 0; gi <= gridCount; gi++) {
      var yg = PAD.top + (gi / gridCount) * chartH;
      var gridLine = svgEl('line', { x1: PAD.left, y1: yg, x2: PAD.left + chartW, y2: yg,
        stroke: '#e5e7eb', 'stroke-width': 1 });
      svg.appendChild(gridLine);
      var gridVal = maxVal - (gi / gridCount) * range;
      svg.appendChild(svgText(formatVal(gridVal), {
        x: PAD.left - 5, y: yg + 4, 'text-anchor': 'end',
        'font-size': '10', fill: '#9ca3af'
      }));
    }

    /* X axis labels */
    labels.forEach(function (lbl, i) {
      svg.appendChild(svgText(lbl, {
        x: xPos(i), y: H - 10, 'text-anchor': 'middle',
        'font-size': '10', fill: '#6b7280'
      }));
    });

    /* Dataset lines + optional fill */
    datasets.forEach(function (ds, di) {
      var color = ds.color || PALETTE.mixed[di % PALETTE.mixed.length];
      var pts   = ds.data.map(function (v, i) { return xPos(i) + ',' + yPos(v); });
      var polyline = pts.join(' ');

      if (options.fill) {
        var fillPts = [xPos(0) + ',' + (PAD.top + chartH)]
          .concat(pts)
          .concat([xPos(labels.length - 1) + ',' + (PAD.top + chartH)]);
        var fillEl = svgEl('polygon', {
          points: fillPts.join(' '),
          fill: color, 'fill-opacity': '0.15', stroke: 'none'
        });
        svg.appendChild(fillEl);
      }

      var lineEl = svgEl('polyline', {
        points: polyline, fill: 'none',
        stroke: color, 'stroke-width': '2.5',
        'stroke-linejoin': 'round', 'stroke-linecap': 'round'
      });
      svg.appendChild(lineEl);

      /* Dots */
      ds.data.forEach(function (v, i) {
        var dot = svgEl('circle', {
          cx: xPos(i), cy: yPos(v), r: 3.5,
          fill: color, stroke: '#fff', 'stroke-width': 1.5
        });
        svg.appendChild(dot);
      });
    });

    /* Legend */
    var legY = H - 3;
    var legX = PAD.left;
    datasets.forEach(function (ds, di) {
      var color = ds.color || PALETTE.mixed[di % PALETTE.mixed.length];
      var rect = svgEl('rect', { x: legX, y: legY - 7, width: 12, height: 4, rx: 2, fill: color });
      svg.appendChild(rect);
      svg.appendChild(svgText(ds.label || '', {
        x: legX + 16, y: legY, 'font-size': '10', fill: '#6b7280'
      }));
      legX += (ds.label || '').length * 6.5 + 30;
    });

    container.appendChild(svg);
  }

  function renderArea(containerId, labels, datasets, options) {
    renderLine(containerId, labels, datasets, Object.assign({}, options || {}, { fill: true }));
  }

  /* ══════════════════════════════════════════════════════════
     BAR CHART (vertical or horizontal)
     ══════════════════════════════════════════════════════════ */
  function renderBar(containerId, labels, datasets, options) {
    var container = clearContainer(containerId);
    if (!container) return;
    options = options || {};

    if (options.horizontal) {
      _renderHorizontalBar(container, labels, datasets, options);
    } else {
      _renderVerticalBar(container, labels, datasets, options);
    }
  }

  function _renderVerticalBar(container, labels, datasets, options) {
    /* Guard: each dataset data must be an array */
    datasets = (datasets || []).map(function (ds) {
      return Array.isArray(ds.data) ? ds : Object.assign({}, ds, { data: [] });
    });

    var W = container.clientWidth || 560;
    var H = options.height || 220;
    var PAD = { top: 20, right: 20, bottom: 50, left: 55 };
    var chartW = W - PAD.left - PAD.right;
    var chartH = H - PAD.top - PAD.bottom;

    var allVals = [];
    datasets.forEach(function (ds) { allVals = allVals.concat(ds.data); });
    var maxVal = Math.max.apply(null, allVals) * 1.15 || 1;
    var groupW = chartW / labels.length;
    var barW   = Math.min((groupW / (datasets.length + 0.5)) * 0.85, 36);

    function yPos(v) { return PAD.top + chartH - (v / maxVal) * chartH; }
    function barH(v) { return (v / maxVal) * chartH; }

    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, width: '100%', height: H });

    /* Grid */
    [0, 0.25, 0.5, 0.75, 1].forEach(function (f) {
      var yg = PAD.top + (1 - f) * chartH;
      svg.appendChild(svgEl('line', { x1: PAD.left, y1: yg, x2: PAD.left + chartW, y2: yg,
        stroke: '#e5e7eb', 'stroke-width': 1 }));
      svg.appendChild(svgText(formatVal(f * maxVal), {
        x: PAD.left - 5, y: yg + 4, 'text-anchor': 'end', 'font-size': '10', fill: '#9ca3af'
      }));
    });

    /* Bars */
    labels.forEach(function (lbl, i) {
      var groupX = PAD.left + i * groupW + groupW / 2;
      datasets.forEach(function (ds, di) {
        var color = ds.color || (Array.isArray(ds.colors) ? ds.colors[i] : PALETTE.mixed[di]);
        var x = groupX + (di - (datasets.length - 1) / 2) * (barW + 2) - barW / 2;
        var v = ds.data[i] || 0;
        if (v > 0) {
          svg.appendChild(svgEl('rect', {
            x: x, y: yPos(v), width: barW, height: barH(v), rx: 2,
            fill: color, opacity: 0.9
          }));
        }
      });
      svg.appendChild(svgText(lbl, {
        x: groupX, y: H - 12, 'text-anchor': 'middle', 'font-size': '10', fill: '#6b7280'
      }));
    });

    container.appendChild(svg);
  }

  function _renderHorizontalBar(container, labels, datasets, options) {
    var ds0    = datasets[0] || { data: [], colors: [] };
    var data   = ds0.data || [];
    var W      = container.clientWidth || 400;
    var barH   = 24;
    var gap    = 8;
    var PAD    = { top: 10, right: 60, bottom: 10, left: 110 };
    var H      = PAD.top + PAD.bottom + labels.length * (barH + gap);
    var maxVal = Math.max.apply(null, data) * 1.15 || 1;
    var chartW = W - PAD.left - PAD.right;

    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, width: '100%', height: H });

    labels.forEach(function (lbl, i) {
      var y    = PAD.top + i * (barH + gap);
      var bw   = (data[i] / maxVal) * chartW;
      var color = (Array.isArray(ds0.colors) ? ds0.colors[i] : null)
                || PALETTE.mixed[i % PALETTE.mixed.length];

      svg.appendChild(svgEl('rect', { x: PAD.left, y: y, width: bw, height: barH, rx: 3, fill: color, opacity: 0.85 }));
      svg.appendChild(svgText(lbl, { x: PAD.left - 5, y: y + barH / 2 + 4, 'text-anchor': 'end', 'font-size': '11', fill: '#374151' }));
      svg.appendChild(svgText(formatVal(data[i]), { x: PAD.left + bw + 5, y: y + barH / 2 + 4, 'font-size': '11', fill: '#6b7280' }));
    });

    container.appendChild(svg);
  }

  /* ══════════════════════════════════════════════════════════
     DOUGHNUT CHART
     containerId: element id
     labels: string[]
     data: number[]
     options: {colors, title, centerText, size}
     ══════════════════════════════════════════════════════════ */
  function renderDoughnut(containerId, labels, data, options) {
    var container = clearContainer(containerId);
    if (!container) return;
    options = options || {};

    /* Guard: data and labels must be valid arrays */
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('renderDoughnut: no data for #' + containerId);
      container.innerHTML = '<p style="color:#9ca3af;text-align:center;padding:40px 0;font-size:13px;">No data available</p>';
      return;
    }
    labels = Array.isArray(labels) ? labels : data.map(function (_, i) { return 'Item ' + (i + 1); });

    var SIZE   = options.size || Math.min(container.clientWidth || 200, 200);
    var CX     = SIZE / 2;
    var CY     = SIZE / 2;
    var R      = SIZE * 0.36;
    var R_IN   = SIZE * 0.22;
    var colors = options.colors || PALETTE.mixed;
    var total  = data.reduce(function (s, v) { return s + v; }, 0) || 1;
    var startAngle = -Math.PI / 2;

    var svg = svgEl('svg', { viewBox: '0 0 ' + SIZE + ' ' + SIZE, width: SIZE, height: SIZE });

    data.forEach(function (val, i) {
      var angle   = (val / total) * 2 * Math.PI;
      var endAngle = startAngle + angle;
      var x1 = CX + R * Math.cos(startAngle);
      var y1 = CY + R * Math.sin(startAngle);
      var x2 = CX + R * Math.cos(endAngle);
      var y2 = CY + R * Math.sin(endAngle);
      var xi1 = CX + R_IN * Math.cos(endAngle);
      var yi1 = CY + R_IN * Math.sin(endAngle);
      var xi2 = CX + R_IN * Math.cos(startAngle);
      var yi2 = CY + R_IN * Math.sin(startAngle);
      var large = angle > Math.PI ? 1 : 0;
      var color = colors[i % colors.length];

      if (val > 0) {
        var pathD = [
          'M', x1, y1,
          'A', R, R, 0, large, 1, x2, y2,
          'L', xi1, yi1,
          'A', R_IN, R_IN, 0, large, 0, xi2, yi2,
          'Z'
        ].join(' ');
        var pathEl = svgEl('path', { d: pathD, fill: color, stroke: '#fff', 'stroke-width': 1.5 });
        svg.appendChild(pathEl);
      }
      startAngle = endAngle;
    });

    /* Center text */
    if (options.centerText) {
      svg.appendChild(svgText(options.centerText, {
        x: CX, y: CY + 4, 'text-anchor': 'middle', 'font-size': '13', 'font-weight': '600', fill: '#374151'
      }));
    }

    container.appendChild(svg);

    /* Legend below */
    var legendWrap = document.createElement('div');
    legendWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px 12px;margin-top:8px;justify-content:center;';
    labels.forEach(function (lbl, i) {
      if ((data[i] || 0) === 0) return;
      var pct = Math.round((data[i] / total) * 100);
      var item = document.createElement('span');
      item.style.cssText = 'display:flex;align-items:center;gap:5px;font-size:11px;color:#374151;';
      var dot  = document.createElement('span');
      dot.style.cssText = 'width:10px;height:10px;border-radius:2px;background:' + (options.colors || PALETTE.mixed)[i % PALETTE.mixed.length] + ';flex-shrink:0;';
      item.appendChild(dot);
      item.appendChild(document.createTextNode(lbl + ' ' + pct + '%'));
      legendWrap.appendChild(item);
    });
    container.appendChild(legendWrap);
  }

  function renderPie(containerId, labels, data, options) {
    renderDoughnut(containerId, labels, data, Object.assign({}, options || {}, { centerText: null, R_IN_ratio: 0 }));
  }

  /* ══════════════════════════════════════════════════════════
     DASHBOARD CONVENIENCE RENDERERS
     Each function accepts optional data arguments.
     When called without data (demo/dashboard usage) they fall
     back to representative demo figures so the page never
     crashes with undefined.
     ══════════════════════════════════════════════════════════ */

  /* Demo week labels shared by trend charts */
  var DEMO_WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function renderSalesTrend(containerId, salesData, purchaseData, labels) {
    /* Use provided arrays or fall back to demo figures */
    var sales     = Array.isArray(salesData)    ? salesData    : [385000, 420000, 465000, 510000, 495000, 572000, 530000];
    var purchases = Array.isArray(purchaseData) ? purchaseData : [320000, 355000, 390000, 430000, 415000, 485000, 450000];
    renderLine(containerId, labels || DEMO_WEEK_LABELS, [
      { label: 'Sales',     data: sales,     color: PALETTE.green[0] },
      { label: 'Purchases', data: purchases, color: PALETTE.amber[0] }
    ], { fill: false, height: 200 });
  }

  function renderProfitTrend(containerId, profitData, labels) {
    var profit = Array.isArray(profitData) ? profitData : [65000, 65000, 75000, 80000, 80000, 87000, 80000];
    renderArea(containerId, labels || DEMO_WEEK_LABELS, [
      { label: 'Profit', data: profit, color: PALETTE.green[1] }
    ], { height: 180 });
  }

  function renderStockDonut(containerId, labels, data) {
    var lbls = Array.isArray(labels) ? labels : ['Tomato', 'Onion', 'Potato', 'Brinjal', 'Others'];
    var vals = Array.isArray(data)   ? data   : [3200, 4800, 5600, 1400, 3200];
    renderDoughnut(containerId, lbls, vals, {
      colors: PALETTE.mixed, size: 180, centerText: 'Stock'
    });
  }

  function renderExpenseBreakdown(containerId, labels, data) {
    var lbls = Array.isArray(labels) ? labels : ['Labour', 'Transport', 'Market', 'Packaging', 'Other'];
    var vals = Array.isArray(data)   ? data   : [18500, 9200, 6800, 4200, 3800];
    renderDoughnut(containerId, lbls, vals, {
      colors: PALETTE.amber, size: 180, centerText: 'Expenses'
    });
  }

  function renderVendorVolumeBar(containerId, labels, data) {
    var lbls = Array.isArray(labels) ? labels : ['Sri Ram', 'Deccan Veg', 'Chennai Fresh', 'Bangalore', 'Mumbai Mandi'];
    var vals = Array.isArray(data)   ? data   : [84000, 215000, 128000, 56000, 342000];
    renderBar(containerId, lbls, [{ data: vals, colors: PALETTE.mixed }], {
      horizontal: true
    });
  }

  function renderFarmerSupplyBar(containerId, labels, data) {
    var lbls = Array.isArray(labels) ? labels : ['Venkatesh', 'Krishna Rao', 'Lakshmaiah', 'Nagaraju', 'Siva Prasad'];
    var vals = Array.isArray(data)   ? data   : [426000, 294000, 207200, 348000, 186000];
    renderBar(containerId, lbls, [{ data: vals, colors: PALETTE.green }], {
      horizontal: true
    });
  }

  /* ══════════════════════════════════════════════════════════
     CSS BAR CHART (simple, no SVG — for small widgets)
     ══════════════════════════════════════════════════════════ */
  function renderCSSBars(containerId, labels, values, options) {
    var container = clearContainer(containerId);
    if (!container) return;
    options = options || {};
    var maxVal = Math.max.apply(null, values) || 1;
    var colors = options.colors || PALETTE.mixed;

    var wrap = document.createElement('div');
    wrap.className = 'css-bar-chart';
    wrap.style.cssText = 'display:flex;align-items:flex-end;gap:6px;height:' + (options.height || 120) + 'px;padding:8px 0;';

    labels.forEach(function (lbl, i) {
      var col = document.createElement('div');
      col.style.cssText = 'flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;';

      var barWrap = document.createElement('div');
      barWrap.style.cssText = 'width:100%;display:flex;align-items:flex-end;height:' + (options.height || 100) + 'px;';

      var bar = document.createElement('div');
      var pct = Math.round((values[i] / maxVal) * 100);
      bar.style.cssText = 'width:100%;height:' + pct + '%;background:' + colors[i % colors.length] +
        ';border-radius:3px 3px 0 0;min-height:2px;transition:height .3s;';
      bar.title = lbl + ': ' + formatVal(values[i]);

      barWrap.appendChild(bar);
      col.appendChild(barWrap);

      var labEl = document.createElement('span');
      labEl.textContent = lbl;
      labEl.style.cssText = 'font-size:9px;color:#6b7280;text-align:center;word-break:break-word;';
      col.appendChild(labEl);

      wrap.appendChild(col);
    });

    container.appendChild(wrap);
  }

  /* ── Public API ──────────────────────────────────────────── */
  global.GolisCharts = {
    renderLine:             renderLine,
    renderArea:             renderArea,
    renderBar:              renderBar,
    renderDoughnut:         renderDoughnut,
    renderPie:              renderPie,
    renderCSSBars:          renderCSSBars,
    renderSalesTrend:       renderSalesTrend,
    renderProfitTrend:      renderProfitTrend,
    renderStockDonut:       renderStockDonut,
    renderExpenseBreakdown: renderExpenseBreakdown,
    renderVendorVolumeBar:  renderVendorVolumeBar,
    renderFarmerSupplyBar:  renderFarmerSupplyBar,
    PALETTE:                PALETTE,
  };

  /* Backwards compatibility shim — some pages call Charts.renderLine etc. */
  global.Charts = global.GolisCharts;

}(window));
