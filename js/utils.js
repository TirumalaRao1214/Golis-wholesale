/* ============================================================
   GOLIS Wholesale — utils.js
   Utility functions: formatting, table helpers, form helpers,
   toast notifications, modal helpers, confirmation dialogs.
   ============================================================ */

const Utils = {

  /* ──────────────────────────────────────────────────────────
     CURRENCY — Indian comma format with ₹ symbol
     formatCurrency(485000) → "₹4,85,000"
     ────────────────────────────────────────────────────────── */
  formatCurrency(n) {
    if (n === null || n === undefined || isNaN(n)) return '₹0';
    return '₹' + this.formatIndianNumber(Math.round(Number(n)));
  },

  /* ──────────────────────────────────────────────────────────
     INDIAN NUMBER FORMAT — 1,23,456
     ────────────────────────────────────────────────────────── */
  formatIndianNumber(n) {
    if (n === null || n === undefined || isNaN(n)) return '0';
    const num = Math.abs(Math.round(Number(n)));
    const sign = Number(n) < 0 ? '-' : '';
    const s = String(num);
    if (s.length <= 3) return sign + s;
    // Last 3 digits
    const last3 = s.slice(-3);
    const rest   = s.slice(0, -3);
    // Group rest in 2s from the right
    const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return sign + grouped + ',' + last3;
  },

  /* ──────────────────────────────────────────────────────────
     WEIGHT FORMAT
     formatWeight(1200) → "1,200 kg"
     formatWeight(18400) → "18.4 Tons"
     ────────────────────────────────────────────────────────── */
  formatWeight(kg) {
    if (kg === null || kg === undefined || isNaN(kg)) return '0 kg';
    const n = Number(kg);
    if (n >= 10000) {
      return (n / 1000).toFixed(1).replace(/\.0$/, '') + ' Tons';
    }
    return this.formatIndianNumber(n) + ' kg';
  },

  /* ──────────────────────────────────────────────────────────
     DATE FORMAT
     formatDate(new Date()) → "21 Sep 2026"
     formatDate("2026-09-21") → "21 Sep 2026"
     ────────────────────────────────────────────────────────── */
  formatDate(d) {
    if (!d) return '—';
    const date = (d instanceof Date) ? d : new Date(d);
    if (isNaN(date.getTime())) return String(d);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  },

  /* ──────────────────────────────────────────────────────────
     DATE INPUT FORMAT → "2026-09-21" for <input type="date">
     ────────────────────────────────────────────────────────── */
  formatDateInput(d) {
    if (!d) return '';
    const date = (d instanceof Date) ? d : new Date(d);
    if (isNaN(date.getTime())) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  },

  /* ──────────────────────────────────────────────────────────
     RELATIVE TIME  e.g. "2 hours ago"
     ────────────────────────────────────────────────────────── */
  relativeTime(d) {
    if (!d) return '';
    const date = (d instanceof Date) ? d : new Date(d);
    const now  = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1)   return 'just now';
    if (diffMin < 60)  return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24)   return `${diffHr}h ago`;
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 7)   return `${diffDay}d ago`;
    return this.formatDate(date);
  },

  /* ──────────────────────────────────────────────────────────
     ID GENERATOR
     generateId('ORD') → "ORD-10245" (random 5-digit suffix)
     ────────────────────────────────────────────────────────── */
  generateId(prefix) {
    const n = 10000 + Math.floor(Math.random() * 89999);
    return `${prefix}-${n}`;
  },

  /* ──────────────────────────────────────────────────────────
     TOAST NOTIFICATIONS
     showToast('Saved!', 'success', 3500)
     types: 'success' | 'error' | 'warning' | 'info'
     ────────────────────────────────────────────────────────── */
  showToast(message, type = 'info', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const icons = {
      success: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
      error:   '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info:    '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      ${icons[type] || icons.info}
      <span class="toast__message">${message}</span>
      <button class="toast__close" aria-label="Dismiss">×</button>`;

    container.appendChild(toast);

    const remove = () => {
      toast.classList.add('removing');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    };

    toast.querySelector('.toast__close').addEventListener('click', remove);
    if (duration > 0) setTimeout(remove, duration);

    return toast;
  },

  /* ──────────────────────────────────────────────────────────
     MODAL HELPERS
     ────────────────────────────────────────────────────────── */
  openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal(id);
    }, { once: true });

    // Close on Escape
    const escHandler = (e) => {
      if (e.key === 'Escape') { this.closeModal(id); document.removeEventListener('keydown', escHandler); }
    };
    document.addEventListener('keydown', escHandler);

    // Wire close buttons inside modal
    modal.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => this.closeModal(id));
    });

    // Focus first input
    setTimeout(() => {
      const first = modal.querySelector('input:not([type=hidden]), select, textarea');
      if (first) first.focus();
    }, 50);
  },

  closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  },

  closeAllModals() {
    document.querySelectorAll('.modal-overlay.is-open').forEach(m => {
      m.classList.remove('is-open');
    });
    document.body.style.overflow = '';
  },

  /* ──────────────────────────────────────────────────────────
     CONFIRMATION DIALOG
     confirm('Are you sure?', () => { /* do it *\/ })
     ────────────────────────────────────────────────────────── */
  confirm(message, onConfirm, options = {}) {
    const id = '__confirm-modal';
    let existing = document.getElementById(id);
    if (existing) existing.remove();

    const sub   = options.sub || 'This action cannot be undone.';
    const label = options.confirmLabel || 'Confirm';
    const type  = options.type || 'danger';

    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog--sm">
        <div class="modal-body">
          <div class="confirm-dialog">
            <div class="confirm-dialog__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div class="confirm-dialog__message">${message}</div>
            <div class="confirm-dialog__sub">${sub}</div>
            <div class="flex justify-center gap-3">
              <button class="btn btn-secondary" id="${id}-cancel">Cancel</button>
              <button class="btn btn-${type}" id="${id}-confirm">${label}</button>
            </div>
          </div>
        </div>
      </div>`;

    document.body.appendChild(modal);
    this.openModal(id);

    document.getElementById(`${id}-cancel`).addEventListener('click', () => this.closeModal(id));
    document.getElementById(`${id}-confirm`).addEventListener('click', () => {
      this.closeModal(id);
      if (typeof onConfirm === 'function') onConfirm();
    });
  },

  /* ──────────────────────────────────────────────────────────
     DEBOUNCE
     ────────────────────────────────────────────────────────── */
  debounce(fn, ms = 300) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  },

  /* ──────────────────────────────────────────────────────────
     STATUS BADGE HTML
     statusBadge('delivered') → '<span class="badge badge-success">Delivered</span>'
     ────────────────────────────────────────────────────────── */
  statusBadge(status) {
    const map = {
      // Order
      pending:            'badge-neutral',
      confirmed:          'badge-info',
      preparing:          'badge-info',
      stockAllocated:     'badge-primary',
      loading:            'badge-warning',
      dispatched:         'badge-warning',
      inTransit:          'badge-warning',
      delivered:          'badge-success',
      cancelled:          'badge-danger',
      partiallyFulfilled: 'badge-warning',
      // Arrival
      arrived:            'badge-info',
      waiting:            'badge-neutral',
      weighing:           'badge-warning',
      qualityCheck:       'badge-warning',
      accepted:           'badge-success',
      rejected:           'badge-danger',
      completed:          'badge-success',
      // Attendance
      present:            'badge-success',
      absent:             'badge-danger',
      halfDay:            'badge-warning',
      overtime:           'badge-primary',
      // Inventory
      healthy:            'badge-success',
      lowStock:           'badge-warning',
      outOfStock:         'badge-danger',
      // Payment
      paid:               'badge-success',
      unpaid:             'badge-danger',
      partial:            'badge-warning',
      overdue:            'badge-danger',
      // Vehicle
      available:          'badge-success',
      inUse:              'badge-warning',
      maintenance:        'badge-danger',
    };
    const cls   = map[status] || 'badge-neutral';
    const label = (status || '').replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
    return `<span class="badge ${cls}">${label}</span>`;
  },

  /* ──────────────────────────────────────────────────────────
     TABLE HELPERS
     ────────────────────────────────────────────────────────── */

  /**
   * Initialize a table with search + sort + pagination.
   * options: { perPage, searchId, sortable }
   */
  initTable(tableId, options = {}) {
    const table = document.getElementById(tableId);
    if (!table) return;

    const perPage  = options.perPage || 25;
    const searchId = options.searchId;

    // Store data on the table element
    const allRows = Array.from(table.querySelectorAll('tbody tr'));
    table._allRows  = allRows;
    table._filtered = [...allRows];
    table._page     = 1;
    table._perPage  = perPage;
    table._sortCol  = null;
    table._sortDir  = 'asc';

    this._renderTablePage(table);

    // Wire search
    if (searchId) {
      const searchEl = document.getElementById(searchId);
      if (searchEl) {
        searchEl.addEventListener('input', this.debounce(() => {
          this.filterTable(tableId, searchEl.value);
        }, 250));
      }
    }

    // Wire sortable headers
    if (options.sortable !== false) {
      table.querySelectorAll('th[data-sortable]').forEach((th, i) => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => {
          const dir = (table._sortCol === i && table._sortDir === 'asc') ? 'desc' : 'asc';
          this.sortTable(tableId, i, dir);
        });
      });
    }
  },

  filterTable(tableId, query) {
    const table = document.getElementById(tableId);
    if (!table || !table._allRows) return;

    const q = (query || '').toLowerCase().trim();
    table._filtered = q
      ? table._allRows.filter(row => row.textContent.toLowerCase().includes(q))
      : [...table._allRows];

    table._page = 1;
    this._renderTablePage(table);
  },

  sortTable(tableId, colIndex, dir = 'asc') {
    const table = document.getElementById(tableId);
    if (!table || !table._filtered) return;

    table._sortCol = colIndex;
    table._sortDir = dir;

    table._filtered.sort((a, b) => {
      const aVal = (a.cells[colIndex] ? a.cells[colIndex].textContent.trim() : '');
      const bVal = (b.cells[colIndex] ? b.cells[colIndex].textContent.trim() : '');
      // Numeric check
      const aNum = parseFloat(aVal.replace(/[₹,]/g, ''));
      const bNum = parseFloat(bVal.replace(/[₹,]/g, ''));
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return dir === 'asc' ? aNum - bNum : bNum - aNum;
      }
      return dir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });

    // Update sort indicators
    table.querySelectorAll('th').forEach((th, i) => {
      th.classList.remove('sorted-asc', 'sorted-desc');
      if (i === colIndex) th.classList.add(`sorted-${dir}`);
    });

    table._page = 1;
    this._renderTablePage(table);
  },

  paginateTable(tableId, page, perPage) {
    const table = document.getElementById(tableId);
    if (!table) return;
    if (perPage) table._perPage = perPage;
    table._page = page;
    this._renderTablePage(table);
  },

  _renderTablePage(table) {
    const tbody   = table.querySelector('tbody');
    if (!tbody) return;

    const rows    = table._filtered || [];
    const page    = table._page    || 1;
    const perPage = table._perPage || 25;
    const total   = rows.length;
    const start   = (page - 1) * perPage;
    const end     = Math.min(start + perPage, total);
    const pageRows = rows.slice(start, end);

    // Hide all rows, show only current page
    (table._allRows || []).forEach(r => { r.style.display = 'none'; });
    pageRows.forEach(r => { r.style.display = ''; });

    // Update info text if exists
    const infoEl = document.getElementById(`${table.id}-info`);
    if (infoEl) {
      infoEl.textContent = total === 0
        ? 'No records found'
        : `Showing ${start + 1}–${end} of ${total} results`;
    }

    // Update pagination controls if exist
    const paginationEl = document.getElementById(`${table.id}-pagination`);
    if (paginationEl) {
      this._renderPagination(paginationEl, table.id, page, Math.ceil(total / perPage));
    }

    // Show empty state if no rows
    const emptyEl = document.getElementById(`${table.id}-empty`);
    if (emptyEl) {
      emptyEl.style.display = total === 0 ? 'flex' : 'none';
    }
  },

  _renderPagination(container, tableId, currentPage, totalPages) {
    if (totalPages <= 1) { container.innerHTML = ''; return; }

    let html = `<button class="pagination__btn" ${currentPage <= 1 ? 'disabled' : ''} onclick="Utils.paginateTable('${tableId}', ${currentPage - 1})">‹</button>`;

    // Page number buttons (show up to 5)
    const start = Math.max(1, currentPage - 2);
    const end   = Math.min(totalPages, start + 4);

    for (let p = start; p <= end; p++) {
      html += `<button class="pagination__btn ${p === currentPage ? 'active' : ''}" onclick="Utils.paginateTable('${tableId}', ${p})">${p}</button>`;
    }

    html += `<button class="pagination__btn" ${currentPage >= totalPages ? 'disabled' : ''} onclick="Utils.paginateTable('${tableId}', ${currentPage + 1})">›</button>`;

    container.innerHTML = html;
  },

  /* ──────────────────────────────────────────────────────────
     FORM UTILITIES
     ────────────────────────────────────────────────────────── */

  /**
   * Validate a form. Checks data-validate attributes.
   * data-validate="required"   — must not be empty
   * data-validate="number"     — must be numeric
   * data-validate="min:0"      — minimum value
   * data-validate="max:1000"   — maximum value
   * data-validate="email"      — valid email format
   * Returns true if all valid.
   */
  validateForm(formEl) {
    let valid = true;

    // Clear previous errors
    formEl.querySelectorAll('.form-input.is-invalid, .form-select.is-invalid, .form-textarea.is-invalid')
      .forEach(el => el.classList.remove('is-invalid'));
    formEl.querySelectorAll('.form-error.visible')
      .forEach(el => { el.classList.remove('visible'); el.textContent = ''; });

    formEl.querySelectorAll('[data-validate]').forEach(field => {
      const rules  = field.dataset.validate.split('|');
      const val    = field.value.trim();
      const errEl  = field.parentElement.querySelector('.form-error');

      let fieldError = '';

      for (const rule of rules) {
        if (rule === 'required' && !val) {
          fieldError = t ? t('validation.required') : 'This field is required.';
          break;
        }
        if (rule === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          fieldError = t ? t('validation.invalidEmail') : 'Invalid email.';
          break;
        }
        if (rule === 'number' && val && isNaN(Number(val))) {
          fieldError = t ? t('validation.positiveNumber') : 'Must be a number.';
          break;
        }
        if (rule.startsWith('min:')) {
          const min = Number(rule.split(':')[1]);
          if (val && Number(val) < min) {
            fieldError = t ? t('validation.minValue', { min }) : `Min value is ${min}.`;
            break;
          }
        }
        if (rule.startsWith('max:')) {
          const max = Number(rule.split(':')[1]);
          if (val && Number(val) > max) {
            fieldError = t ? t('validation.maxValue', { max }) : `Max value is ${max}.`;
            break;
          }
        }
      }

      if (fieldError) {
        valid = false;
        field.classList.add('is-invalid');
        if (errEl) { errEl.textContent = fieldError; errEl.classList.add('visible'); }
      }
    });

    return valid;
  },

  /**
   * Serialize all form fields into a plain object.
   * Handles input, select, textarea, checkboxes.
   */
  serializeForm(formEl) {
    const data = {};
    formEl.querySelectorAll('input, select, textarea').forEach(field => {
      if (!field.name) return;
      if (field.type === 'checkbox') {
        data[field.name] = field.checked;
      } else if (field.type === 'radio') {
        if (field.checked) data[field.name] = field.value;
      } else {
        data[field.name] = field.value.trim();
      }
    });
    return data;
  },

  /**
   * Reset a form and clear all validation errors.
   */
  resetForm(formEl) {
    formEl.reset();
    formEl.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    formEl.querySelectorAll('.form-error').forEach(el => { el.classList.remove('visible'); el.textContent = ''; });
  },

  /* ──────────────────────────────────────────────────────────
     TAB SWITCHER
     Wire tabs with class .tab-btn and panels with class .tab-panel
     Each tab-btn must have data-tab="panelId"
     ────────────────────────────────────────────────────────── */
  initTabs(containerSelector) {
    const containers = document.querySelectorAll(containerSelector || '.tabs');
    containers.forEach(container => {
      const buttons = container.querySelectorAll('.tab-btn');
      const panels  = container.querySelectorAll('.tab-panel');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          panels.forEach(p => p.classList.remove('active'));
          btn.classList.add('active');
          const target = document.getElementById(btn.dataset.tab);
          if (target) target.classList.add('active');
        });
      });

      // Activate first tab by default if none active
      if (!container.querySelector('.tab-btn.active') && buttons.length) {
        buttons[0].click();
      }
    });
  },

  /* ──────────────────────────────────────────────────────────
     PRICE INDICATOR ICON
     priceIcon('up') → '↑' in green
     ────────────────────────────────────────────────────────── */
  priceIcon(direction) {
    if (direction === 'up')      return '<span class="price-up">↑</span>';
    if (direction === 'down')    return '<span class="price-down">↓</span>';
    return '<span class="price-neutral">→</span>';
  },

  /* ──────────────────────────────────────────────────────────
     COPY TO CLIPBOARD
     ────────────────────────────────────────────────────────── */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('Copied to clipboard!', 'success', 2000);
    } catch {
      this.showToast('Copy failed.', 'error', 2000);
    }
  },

  /* ──────────────────────────────────────────────────────────
     SIMULATE CSV EXPORT
     exportCSV(data, filename)
     data: array of objects
     ────────────────────────────────────────────────────────── */
  exportCSV(data, filename = 'export.csv') {
    if (!data || !data.length) {
      this.showToast('No data to export.', 'warning');
      return;
    }
    const headers = Object.keys(data[0]);
    const rows = data.map(row =>
      headers.map(h => {
        const v = row[h];
        const s = v === null || v === undefined ? '' : String(v);
        return s.includes(',') || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
      }).join(',')
    );
    const csv = [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast(`Exported ${data.length} records.`, 'success');
  },

  /* ──────────────────────────────────────────────────────────
     SKELETON LOADER — fill a container with skeleton cards
     ────────────────────────────────────────────────────────── */
  showSkeleton(containerId, rows = 5) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let html = '';
    for (let i = 0; i < rows; i++) {
      html += `<div style="padding:12px;border-bottom:1px solid var(--color-border)">
        <div class="skeleton skeleton-text" style="width:${40+Math.random()*40}%"></div>
        <div class="skeleton skeleton-text" style="width:${20+Math.random()*30}%"></div>
      </div>`;
    }
    container.innerHTML = html;
  },

  /* ──────────────────────────────────────────────────────────
     TRUNCATE STRING
     ────────────────────────────────────────────────────────── */
  truncate(str, len = 30) {
    if (!str) return '';
    return String(str).length > len ? String(str).substring(0, len) + '…' : String(str);
  },
};

/* ──────────────────────────────────────────────────────────────────
   GLOBAL ALIAS — window.showToast
   Exposes Utils.showToast as a plain global function so that any
   inline script or page can call showToast(...) directly without
   needing to reference the Utils object.

   Usage:
     showToast('Saved!', 'success')
     showToast('Invalid credentials', 'error')
     showToast('Low stock warning', 'warning')
     showToast('Order placed', 'info', 5000)
   ────────────────────────────────────────────────────────────────── */
window.showToast = function (message, type, duration) {
  return Utils.showToast(message, type, duration);
};
