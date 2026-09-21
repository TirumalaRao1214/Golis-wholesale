/* ============================================================
   GOLIS Wholesale — app.js
   Auth, session management, role guard, sidebar nav renderer,
   topbar renderer, demo banner, language switcher.
   ============================================================ */

const APP = {
  user: null,     // current session user object
  _currentPage: '',

  /* ──────────────────────────────────────────────────────────
     INIT — call on every page's DOMContentLoaded
     requiredRole: 'owner'|'manager'|'farmer'|'vendor'|'labour'|null
     ────────────────────────────────────────────────────────── */
  init(requiredRole = null) {
    // 1. Init data layer
    MockDB.init();

    // 2. Init i18n
    I18N.currentLang = I18N.getLanguage();
    document.documentElement.setAttribute('lang', I18N.currentLang);

    // 3. Load session
    this.user = this.getSession();

    // 4. Route guard
    if (requiredRole) {
      if (!this.user) {
        window.location.href = this._resolveRoot() + 'login.html';
        return;
      }
      if (this.user.role !== requiredRole) {
        window.location.href = this._resolveRoot() + 'unauthorized.html';
        return;
      }
    }

    // 5. Render authenticated shell
    if (requiredRole && this.user) {
      this.renderDemoBanner();
      this.renderSidebar(this.user.role);
      this.renderTopbar();
      this._initSidebarToggle();
      this._highlightActiveNavItem();
    }

    // 6. Language switcher (public + authenticated)
    this.initLanguageSwitcher();

    // 7. Apply translations
    I18N.applyTranslations();
  },

  /* ──────────────────────────────────────────────────────────
     RESOLVE ROOT PATH (handles nested dirs like /owner/)
     ────────────────────────────────────────────────────────── */
  _resolveRoot() {
    const path = window.location.pathname;
    // If in a subdirectory (owner/, manager/, etc.), go up one level
    const parts = path.split('/').filter(Boolean);
    const subdirs = ['owner','manager','farmer','vendor','labour'];
    if (subdirs.includes(parts[parts.length - 2])) {
      return '../';
    }
    // In root golis-wholesale/
    return '';
  },

  /* ──────────────────────────────────────────────────────────
     AUTH — Login / Logout / Session
     ────────────────────────────────────────────────────────── */
  login(email, password) {
    const users = MockDB.getUsers ? MockDB.getUsers() : MockDB._users;
    const normalizedEmail = (email || '').trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (!user || user.password !== password) {
      return { success: false, role: null, user: null, message: t('toast.login.failed') };
    }
    this.saveSession(user);
    this.user = user;
    return { success: true, role: user.role, user };
  },

  logout() {
    localStorage.removeItem('golis_session');
    localStorage.removeItem('golis_cart');
    this.user = null;
    window.location.href = this._resolveRoot() + 'login.html';
  },

  getSession() {
    try {
      const raw = localStorage.getItem('golis_session');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  saveSession(user) {
    // Store minimal user info (no password)
    const safe = { id: user.id, email: user.email, role: user.role, name: user.name, mobile: user.mobile, refId: user.refId };
    localStorage.setItem('golis_session', JSON.stringify(safe));
  },

  /* ──────────────────────────────────────────────────────────
     DEMO BANNER
     ────────────────────────────────────────────────────────── */
  renderDemoBanner() {
    const existing = document.getElementById('demo-banner');
    if (existing) return;
    const banner = document.createElement('div');
    banner.id = 'demo-banner';
    banner.className = 'demo-banner';
    banner.innerHTML = `<span>⚠</span><span data-i18n="app.demo">${t('app.demo')}</span>`;
    document.body.insertBefore(banner, document.body.firstChild);
    document.body.classList.add('has-demo-banner');
  },

  /* ──────────────────────────────────────────────────────────
     SIDEBAR RENDER
     ────────────────────────────────────────────────────────── */
  renderSidebar(role) {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const navItems = this.NAV_CONFIG[role] || [];
    const root = this._resolveRoot();

    // Build nav HTML
    const navHTML = navItems.map(item => {
      if (item.type === 'section') {
        return `<div class="sidebar-nav__label">${t(item.key)}</div>`;
      }
      return `
        <a href="${root}${item.href}" class="sidebar-nav__item" data-nav="${item.href}">
          <span class="sidebar-nav__icon">${item.icon}</span>
          <span data-i18n="${item.key}">${t(item.key)}</span>
        </a>`;
    }).join('');

    const initials = (this.user.name || 'U').split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();

    sidebar.innerHTML = `
      <a href="${root}${role}/dashboard.html" class="sidebar-logo" style="text-decoration:none">
        <div class="sidebar-logo__mark">G</div>
        <div class="sidebar-logo__text">
          <span class="sidebar-logo__name">GOLIS</span>
          <span class="sidebar-logo__sub">Wholesale</span>
        </div>
      </a>
      <nav class="sidebar-nav">
        ${navHTML}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-user__avatar">${initials}</div>
          <div class="sidebar-user__info">
            <div class="sidebar-user__name">${this.user.name}</div>
            <div class="sidebar-user__role">${this.user.role}</div>
          </div>
        </div>
      </div>`;
  },

  /* ──────────────────────────────────────────────────────────
     TOPBAR RENDER
     ────────────────────────────────────────────────────────── */
  renderTopbar() {
    const topbar = document.getElementById('topbar');
    if (!topbar) return;

    const initials = (this.user.name || 'U').split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
    const roleBadge = `<span class="role-badge role-badge--${this.user.role}">${this.user.role}</span>`;
    const pageTitle = document.getElementById('page-title-text');
    const titleText = pageTitle ? pageTitle.textContent : (document.title || 'Dashboard');

    topbar.innerHTML = `
      <button id="sidebar-toggle" aria-label="Toggle sidebar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <div class="topbar-page-info flex-1">
        <div class="topbar-page-title" id="topbar-title">${titleText}</div>
      </div>
      <div class="topbar-actions">
        <div class="lang-switcher">
          <button class="lang-switcher__btn ${I18N.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
          <div class="lang-switcher__divider"></div>
          <button class="lang-switcher__btn ${I18N.currentLang === 'te' ? 'active' : ''}" data-lang="te">తె</button>
        </div>
        <div class="dropdown">
          <button class="topbar-user" id="user-menu-btn" aria-label="User menu">
            <div class="topbar-user__avatar">${initials}</div>
            <span class="topbar-user__name">${this.user.name}</span>
            <svg class="topbar-user__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="dropdown-menu" id="user-dropdown">
            <div style="padding:8px 16px 6px;border-bottom:1px solid var(--color-border);margin-bottom:4px">
              <div style="font-size:var(--text-sm);font-weight:600">${this.user.name}</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-secondary)">${this.user.email}</div>
            </div>
            <a href="${this._resolveRoot()}${this.user.role}/profile.html">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Profile
            </a>
            <div class="dropdown-divider"></div>
            <button class="danger" onclick="APP.logout()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span data-i18n="auth.logout">${t('auth.logout')}</span>
            </button>
          </div>
        </div>
      </div>`;

    // Re-wire sidebar toggle after topbar render
    this._initSidebarToggle();

    // Wire user dropdown
    const menuBtn = document.getElementById('user-menu-btn');
    const dropdown = document.getElementById('user-dropdown');
    if (menuBtn && dropdown) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('is-open');
      });
      document.addEventListener('click', () => dropdown.classList.remove('is-open'));
    }

    // Wire lang switcher in topbar
    topbar.querySelectorAll('.lang-switcher__btn').forEach(btn => {
      btn.addEventListener('click', () => I18N.setLanguage(btn.dataset.lang));
    });
  },

  /* ──────────────────────────────────────────────────────────
     SIDEBAR TOGGLE (mobile hamburger)
     ────────────────────────────────────────────────────────── */
  _initSidebarToggle() {
    const toggle  = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    let overlay   = document.getElementById('sidebar-overlay');

    if (!toggle || !sidebar) return;

    // Create overlay if not present
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'sidebar-overlay';
      document.body.appendChild(overlay);
    }

    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
      overlay.classList.toggle('is-open');
      document.body.classList.toggle('sidebar-open', sidebar.classList.contains('is-open'));
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.classList.remove('sidebar-open');
    });
  },

  /* ──────────────────────────────────────────────────────────
     HIGHLIGHT ACTIVE NAV ITEM
     ────────────────────────────────────────────────────────── */
  _highlightActiveNavItem() {
    const current = window.location.pathname;
    document.querySelectorAll('.sidebar-nav__item').forEach(item => {
      const href = item.getAttribute('href') || '';
      // Match on file name (e.g. dashboard.html)
      const itemFile = href.split('/').pop();
      const curFile  = current.split('/').pop();
      if (itemFile && itemFile === curFile) {
        item.classList.add('active');
      }
    });
  },

  /* ──────────────────────────────────────────────────────────
     LANGUAGE SWITCHER (public pages — wires buttons by class)
     ────────────────────────────────────────────────────────── */
  initLanguageSwitcher() {
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        I18N.setLanguage(btn.dataset.lang);
        // Update active class on all lang buttons
        document.querySelectorAll('[data-lang]').forEach(b => {
          b.classList.toggle('active', b.dataset.lang === btn.dataset.lang);
        });
      });
      // Set initial active state
      btn.classList.toggle('active', btn.dataset.lang === I18N.currentLang);
    });
  },

  /* ──────────────────────────────────────────────────────────
     NAV CONFIGURATION — per role
     Each item: { key, icon (SVG string), href }
     Section labels: { type: 'section', key }
     ────────────────────────────────────────────────────────── */
  NAV_CONFIG: {

    /* ── OWNER — 23 items ──────────────────────────────────── */
    owner: [
      { key: 'nav.dashboard',    href: 'owner/dashboard.html',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
      { type: 'section', key: 'nav.section.operations' },
      { key: 'nav.farmers',      href: 'owner/farmers.html',       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
      { key: 'nav.vendors',      href: 'owner/vendors.html',       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>' },
      { key: 'nav.vegetables',   href: 'owner/vegetables.html',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>' },
      { type: 'section', key: 'nav.section.supply' },
      { key: 'nav.arrivals',     href: 'manager/arrivals.html',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' },
      { key: 'nav.purchases',    href: 'owner/purchases.html',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' },
      { key: 'nav.weighment',    href: 'owner/weighment.html',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>' },
      { key: 'nav.quality',      href: 'owner/quality.html',       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' },
      { key: 'nav.inventory',    href: 'owner/inventory.html',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
      { key: 'nav.orders',       href: 'owner/orders.html',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>' },
      { key: 'nav.loading',      href: 'owner/loading.html',       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>' },
      { key: 'nav.labour',       href: 'owner/labour.html',        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>' },
      { key: 'nav.vehicles',     href: 'owner/vehicles.html',      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>' },
      { key: 'nav.dispatch',     href: 'owner/dispatch.html',      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' },
      { type: 'section', key: 'nav.section.finance' },
      { key: 'nav.payments',     href: 'owner/payments.html',      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' },
      { key: 'nav.farmerLedger', href: 'owner/farmer-ledger.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' },
      { key: 'nav.vendorLedger', href: 'owner/vendor-ledger.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' },
      { key: 'nav.expenses',     href: 'owner/expenses.html',      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
      { key: 'nav.cashBook',     href: 'owner/cash-book.html',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
      { key: 'nav.reports',      href: 'owner/reports.html',       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
      { key: 'nav.dailyClosing', href: 'owner/daily-closing.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
      { type: 'section', key: 'nav.section.management' },
      { key: 'nav.settings',     href: 'owner/settings.html',      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>' },
    ],

    /* ── MANAGER — 12 items ──────────────────────────────── */
    manager: [
      { key: 'nav.dashboard',      href: 'manager/dashboard.html',          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
      { type: 'section', key: 'nav.section.operations' },
      { key: 'nav.arrivals',       href: 'manager/arrivals.html',           icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' },
      { key: 'nav.weighment',      href: 'manager/weighment.html',          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>' },
      { key: 'nav.quality',        href: 'manager/quality.html',            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' },
      { key: 'nav.purchases',      href: 'manager/purchases.html',          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' },
      { key: 'nav.inventory',      href: 'manager/inventory.html',          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
      { key: 'nav.orders',         href: 'manager/orders.html',             icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>' },
      { key: 'nav.stockAllocation',href: 'manager/stock-allocation.html',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 8 8 21"/><line x1="2" y1="3" x2="6" y2="3"/><line x1="2" y1="8" x2="6" y2="8"/><line x1="2" y1="13" x2="14" y2="13"/></svg>' },
      { key: 'nav.loading',        href: 'manager/loading.html',            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>' },
      { key: 'nav.dispatch',       href: 'manager/dispatch.html',           icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' },
      { key: 'nav.attendance',     href: 'manager/labour-attendance.html',  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="23 11 17 17 14 14"/></svg>' },
      { key: 'nav.returns',        href: 'manager/returns.html',            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>' },
    ],

    /* ── FARMER — 6 items ────────────────────────────────── */
    farmer: [
      { key: 'nav.dashboard',     href: 'farmer/dashboard.html',  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
      { key: 'nav.supplies',      href: 'farmer/supplies.html',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/></svg>' },
      { key: 'nav.prices',        href: 'farmer/prices.html',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
      { key: 'nav.payments',      href: 'farmer/payments.html',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' },
      { key: 'nav.ledger',        href: 'farmer/ledger.html',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' },
      { key: 'nav.profile',       href: 'farmer/profile.html',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
    ],

    /* ── VENDOR — 7 items ────────────────────────────────── */
    vendor: [
      { key: 'nav.dashboard',     href: 'vendor/dashboard.html',  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
      { key: 'nav.prices',        href: 'vendor/prices.html',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
      { key: 'nav.cart',          href: 'vendor/cart.html',       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' },
      { key: 'nav.myOrders',      href: 'vendor/orders.html',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
      { key: 'nav.payments',      href: 'vendor/payments.html',   icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' },
      { key: 'nav.ledger',        href: 'vendor/ledger.html',     icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' },
      { key: 'nav.profile',       href: 'vendor/profile.html',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
    ],

    /* ── LABOUR — 4 items ────────────────────────────────── */
    labour: [
      { key: 'nav.dashboard',     href: 'labour/dashboard.html',  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
      { key: 'nav.attendance',    href: 'labour/attendance.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="23 11 17 17 14 14"/></svg>' },
      { key: 'nav.workHistory',   href: 'labour/work-history.html',icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 0 .5-4.5"/><polyline points="3 3 3 7 7 7"/></svg>' },
      { key: 'nav.profile',       href: 'labour/profile.html',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
    ],
  },
};
