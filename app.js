// ─────────────────────────────────────────────────────
//  FinFlow — app.js
//  Finance dashboard: state, rendering, charts, CRUD
// ─────────────────────────────────────────────────────


// ── App State ─────────────────────────────────────────

const state = {
  role:       'admin',
  theme:      'light',
  page:       'overview',
  sort:       { field: 'date', dir: 'desc' },
  filters:    { search: '', type: '', cat: '', month: '' },
  editId:     null,
  transactions: []
};


// ── Seed Data ─────────────────────────────────────────

const seedTransactions = [
  // November 2024
  { id: 1,  date: '2024-11-01', desc: 'Monthly Salary',       cat: 'Salary',        type: 'income',  amount: 85000 },
  { id: 2,  date: '2024-11-04', desc: 'Swiggy Order',         cat: 'Food',          type: 'expense', amount: 580   },
  { id: 3,  date: '2024-11-07', desc: 'Amazon Purchase',      cat: 'Shopping',      type: 'expense', amount: 3200  },
  { id: 4,  date: '2024-11-11', desc: 'Electricity Bill',     cat: 'Utilities',     type: 'expense', amount: 1800  },
  { id: 5,  date: '2024-11-16', desc: 'Freelance Project A',  cat: 'Freelance',     type: 'income',  amount: 18000 },
  { id: 6,  date: '2024-11-20', desc: 'Gym Membership',       cat: 'Healthcare',    type: 'expense', amount: 2500  },
  { id: 7,  date: '2024-11-24', desc: 'Netflix',              cat: 'Entertainment', type: 'expense', amount: 649   },
  { id: 8,  date: '2024-11-28', desc: 'House Rent',           cat: 'Housing',       type: 'expense', amount: 22000 },
  // December 2024
  { id: 9,  date: '2024-12-01', desc: 'Monthly Salary',       cat: 'Salary',        type: 'income',  amount: 85000 },
  { id: 10, date: '2024-12-05', desc: 'Zomato Order',         cat: 'Food',          type: 'expense', amount: 720   },
  { id: 11, date: '2024-12-09', desc: 'Flight Tickets',       cat: 'Transport',     type: 'expense', amount: 8500  },
  { id: 12, date: '2024-12-13', desc: 'Myntra Shopping',      cat: 'Shopping',      type: 'expense', amount: 5600  },
  { id: 13, date: '2024-12-17', desc: 'Freelance Project B',  cat: 'Freelance',     type: 'income',  amount: 22000 },
  { id: 14, date: '2024-12-21', desc: 'Christmas Gifts',      cat: 'Shopping',      type: 'expense', amount: 4200  },
  { id: 15, date: '2024-12-24', desc: 'House Rent',           cat: 'Housing',       type: 'expense', amount: 22000 },
  { id: 16, date: '2024-12-28', desc: 'Mutual Fund SIP',      cat: 'Investment',    type: 'expense', amount: 10000 },
  // January 2025
  { id: 17, date: '2025-01-01', desc: 'Monthly Salary',       cat: 'Salary',        type: 'income',  amount: 85000 },
  { id: 18, date: '2025-01-05', desc: 'DMart Groceries',      cat: 'Food',          type: 'expense', amount: 3200  },
  { id: 19, date: '2025-01-10', desc: 'Uber Rides',           cat: 'Transport',     type: 'expense', amount: 1400  },
  { id: 20, date: '2025-01-15', desc: 'Doctor Visit',         cat: 'Healthcare',    type: 'expense', amount: 1500  },
  { id: 21, date: '2025-01-19', desc: 'Freelance Project C',  cat: 'Freelance',     type: 'income',  amount: 15000 },
  { id: 22, date: '2025-01-22', desc: 'Internet Bill',        cat: 'Utilities',     type: 'expense', amount: 999   },
  { id: 23, date: '2025-01-26', desc: 'House Rent',           cat: 'Housing',       type: 'expense', amount: 22000 },
  // February 2025
  { id: 24, date: '2025-02-01', desc: 'Monthly Salary',       cat: 'Salary',        type: 'income',  amount: 85000 },
  { id: 25, date: '2025-02-06', desc: 'Restaurant Dinner',    cat: 'Food',          type: 'expense', amount: 2800  },
  { id: 26, date: '2025-02-10', desc: 'Cab Monthly Pass',     cat: 'Transport',     type: 'expense', amount: 2100  },
  { id: 27, date: '2025-02-15', desc: 'Dividend Income',      cat: 'Investment',    type: 'income',  amount: 4500  },
  { id: 28, date: '2025-02-20', desc: 'House Rent',           cat: 'Housing',       type: 'expense', amount: 22000 },
  { id: 29, date: '2025-02-24', desc: 'Mutual Fund SIP',      cat: 'Investment',    type: 'expense', amount: 10000 },
  // March 2025
  { id: 30, date: '2025-03-01', desc: 'Monthly Salary',       cat: 'Salary',        type: 'income',  amount: 90000 },
  { id: 31, date: '2025-03-05', desc: 'Swiggy Instamart',     cat: 'Food',          type: 'expense', amount: 1100  },
  { id: 32, date: '2025-03-09', desc: 'Flipkart Appliance',   cat: 'Shopping',      type: 'expense', amount: 9800  },
  { id: 33, date: '2025-03-14', desc: 'Freelance Project D',  cat: 'Freelance',     type: 'income',  amount: 28000 },
  { id: 34, date: '2025-03-18', desc: 'Movie & Dinner',       cat: 'Entertainment', type: 'expense', amount: 1850  },
  { id: 35, date: '2025-03-22', desc: 'House Rent',           cat: 'Housing',       type: 'expense', amount: 22000 },
  { id: 36, date: '2025-03-26', desc: 'Mutual Fund SIP',      cat: 'Investment',    type: 'expense', amount: 10000 },
  // April 2025
  { id: 37, date: '2025-04-01', desc: 'Monthly Salary',       cat: 'Salary',        type: 'income',  amount: 90000 },
  { id: 38, date: '2025-04-03', desc: 'Grocery Run',          cat: 'Food',          type: 'expense', amount: 2200  },
  { id: 39, date: '2025-04-05', desc: 'Petrol',               cat: 'Transport',     type: 'expense', amount: 3000  },
];


// ── Category Config ───────────────────────────────────

const cats = {
  Food:          { emoji: '🍕', color: '#f59e0b' },
  Transport:     { emoji: '🚗', color: '#3b82f6' },
  Shopping:      { emoji: '🛍️', color: '#8b5cf6' },
  Housing:       { emoji: '🏠', color: '#ef4444' },
  Healthcare:    { emoji: '💊', color: '#10b981' },
  Entertainment: { emoji: '🎮', color: '#6366f1' },
  Salary:        { emoji: '💼', color: '#059669' },
  Freelance:     { emoji: '💻', color: '#0ea5e9' },
  Investment:    { emoji: '📈', color: '#ec4899' },
  Utilities:     { emoji: '💡', color: '#f97316' },
  Other:         { emoji: '📦', color: '#6b7280' },
};


// ── Helpers ───────────────────────────────────────────

const fmt    = n => '₹' + Math.abs(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });
const fmtRaw = n => n.toLocaleString('en-IN',  { maximumFractionDigits: 0 });
const MONTHS  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function monthKey(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(key) {
  const [y, m] = key.split('-');
  return `${MONTHS[+m - 1]} ${y}`;
}

function hexAlpha(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function nextId() {
  return Math.max(0, ...state.transactions.map(t => t.id)) + 1;
}


// ── Init ──────────────────────────────────────────────

function init() {
  const saved = localStorage.getItem('finflow_tx');
  state.transactions = saved ? JSON.parse(saved) : [...seedTransactions];

  const savedTheme = localStorage.getItem('finflow_theme') || 'light';
  const savedRole  = localStorage.getItem('finflow_role')  || 'admin';

  applyTheme(savedTheme);
  applyRole(savedRole);

  document.getElementById('role-select').value = savedRole;

  bindEvents();
  populateFilters();
  renderAll();
  setTimeout(drawCharts, 80);
}

function persist() {
  localStorage.setItem('finflow_tx', JSON.stringify(state.transactions));
}


// ── Events ────────────────────────────────────────────

function bindEvents() {
  // Navigation
  document.querySelectorAll('.nav-link, [data-page]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.page));
  });

  // Topbar
  document.getElementById('role-select').addEventListener('change', e => applyRole(e.target.value));
  document.getElementById('theme-btn').addEventListener('click', toggleTheme);
  document.getElementById('menu-btn').addEventListener('click', toggleSidebar);

  // Sidebar backdrop
  const backdrop = createBackdrop();
  backdrop.addEventListener('click', closeSidebar);

  // Export
  document.getElementById('export-btn').addEventListener('click', exportCSV);

  // Transactions filters
  document.getElementById('search').addEventListener('input', () => {
    state.filters.search = document.getElementById('search').value.toLowerCase();
    renderTransactions();
  });
  document.getElementById('filter-type').addEventListener('change',  e => { state.filters.type  = e.target.value; renderTransactions(); });
  document.getElementById('filter-cat').addEventListener('change',   e => { state.filters.cat   = e.target.value; renderTransactions(); });
  document.getElementById('filter-month').addEventListener('change', e => { state.filters.month = e.target.value; renderTransactions(); });
  document.getElementById('clear-filters').addEventListener('click', clearFilters);

  // Table sort
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const f = th.dataset.sort;
      state.sort.dir = state.sort.field === f && state.sort.dir === 'desc' ? 'asc' : 'desc';
      state.sort.field = f;
      renderTransactions();
    });
  });

  // Add transaction
  document.getElementById('add-btn').addEventListener('click', () => openModal());

  // Modal
  document.getElementById('modal-close').addEventListener('click',  closeModal);
  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('modal-save').addEventListener('click',   saveTransaction);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if ((e.ctrlKey || e.metaKey) && e.key === 'n' && state.role === 'admin') {
      e.preventDefault();
      openModal();
    }
  });

  // Resize → redraw charts
  window.addEventListener('resize', () => {
    if (state.page === 'overview') drawCharts();
  });
}

function createBackdrop() {
  const el = document.createElement('div');
  el.className = 'sidebar-backdrop';
  el.id = 'sidebar-backdrop';
  document.body.appendChild(el);
  return el;
}


// ── Navigation ────────────────────────────────────────

const pageMeta = {
  overview:     ['Overview',     'Financial Summary'],
  transactions: ['Transactions', 'Activity Log'],
  insights:     ['Insights',     'Spending Patterns'],
};

function navigate(page) {
  if (!page) return;
  state.page = page;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');

  document.querySelectorAll('.nav-link').forEach(n => {
    n.classList.toggle('active', n.dataset.page === page);
  });

  const [title, sub] = pageMeta[page] || [page, ''];
  document.getElementById('page-heading').textContent = title;
  document.getElementById('page-sub').textContent     = sub;

  closeSidebar();

  if (page === 'overview')     drawCharts();
  if (page === 'transactions') renderTransactions();
  if (page === 'insights')     renderInsights();
}


// ── Theme ─────────────────────────────────────────────

function toggleTheme() {
  applyTheme(state.theme === 'light' ? 'dark' : 'light');
}

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);

  const moon = document.getElementById('theme-icon-moon');
  const sun  = document.getElementById('theme-icon-sun');
  moon.style.display = theme === 'dark'  ? 'none' : 'block';
  sun.style.display  = theme === 'light' ? 'none' : 'block';

  localStorage.setItem('finflow_theme', theme);
  setTimeout(drawCharts, 80);
}


// ── Role ──────────────────────────────────────────────

function applyRole(role) {
  state.role = role;
  localStorage.setItem('finflow_role', role);

  const isAdmin = role === 'admin';
  document.querySelectorAll('.admin-only').forEach(el => {
    el.style.display = isAdmin ? '' : 'none';
  });

  const meta = { admin: ['Alex Kumar', 'Admin'], viewer: ['Guest User', 'Viewer'] };
  const [name, label] = meta[role];

  document.getElementById('user-name').textContent  = name;
  document.getElementById('user-role').textContent  = label;
  document.getElementById('user-avatar').textContent = name.split(' ').map(w => w[0]).join('');

  renderTransactions();
  toast(`Switched to ${label} view`, 'info');
}


// ── Sidebar (mobile) ──────────────────────────────────

function toggleSidebar() {
  const open = document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-backdrop').classList.toggle('open', open);
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  const bd = document.getElementById('sidebar-backdrop');
  if (bd) bd.classList.remove('open');
}


// ── Data helpers ──────────────────────────────────────

function getMonthlyData() {
  const map = {};
  state.transactions.forEach(tx => {
    const key = monthKey(tx.date);
    if (!map[key]) map[key] = { income: 0, expense: 0 };
    tx.type === 'income' ? (map[key].income += tx.amount) : (map[key].expense += tx.amount);
  });
  return { keys: Object.keys(map).sort(), map };
}

function getCategoryTotals() {
  const map = {};
  state.transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.cat] = (map[t.cat] || 0) + t.amount;
  });
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}

function getTotals() {
  return state.transactions.reduce((acc, t) => {
    t.type === 'income' ? acc.income += t.amount : acc.expense += t.amount;
    return acc;
  }, { income: 0, expense: 0 });
}

function getFiltered() {
  const { search, type, cat, month } = state.filters;
  let list = state.transactions.filter(t => {
    if (search && !t.desc.toLowerCase().includes(search) && !t.cat.toLowerCase().includes(search)) return false;
    if (type  && t.type !== type)               return false;
    if (cat   && t.cat  !== cat)                return false;
    if (month && monthKey(t.date) !== month)    return false;
    return true;
  });

  list.sort((a, b) => {
    const va = state.sort.field === 'amount' ? a.amount : state.sort.field === 'date' ? a.date : a.desc;
    const vb = state.sort.field === 'amount' ? b.amount : state.sort.field === 'date' ? b.date : b.desc;
    return state.sort.dir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
  });

  return list;
}


// ── Render All ────────────────────────────────────────

function renderAll() {
  renderCards();
  renderRecentTx();
  renderTransactions();
  updatePill();
}


// ── Summary Cards ─────────────────────────────────────

function renderCards() {
  const { income, expense } = getTotals();
  const balance  = income - expense;
  const savings  = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;

  const { keys, map } = getMonthlyData();
  const last = map[keys[keys.length - 1]] || { income: 0, expense: 0 };
  const prev = map[keys[keys.length - 2]] || { income: 0, expense: 0 };

  const pct = (cur, old) => old === 0 ? 0 : (((cur - old) / old) * 100).toFixed(1);

  document.getElementById('card-balance').textContent = fmt(balance);
  document.getElementById('card-income').textContent  = fmt(income);
  document.getElementById('card-expense').textContent = fmt(expense);
  document.getElementById('card-savings').textContent = savings + '%';

  setBadge('badge-income',  pct(last.income,  prev.income),  true);
  setBadge('badge-expense', pct(last.expense, prev.expense), false);
  setBadge('badge-balance', pct(last.income - last.expense, prev.income - prev.expense), true);

  const savBadge = document.getElementById('badge-savings');
  savBadge.textContent  = +savings >= 20 ? 'Healthy' : +savings >= 10 ? 'Fair' : 'Low';
  savBadge.className    = 'card-badge ' + (+savings >= 20 ? 'card-badge--up' : +savings < 10 ? 'card-badge--down' : '');
}

function setBadge(id, pct, higherIsBetter) {
  const el  = document.getElementById(id);
  const up  = parseFloat(pct) >= 0;
  el.textContent = (up ? '+' : '') + pct + '%';
  el.className   = 'card-badge ' + ((up === higherIsBetter) ? 'card-badge--up' : 'card-badge--down');
}


// ── Tables ────────────────────────────────────────────

function txRow(tx, actions = false) {
  const meta    = cats[tx.cat] || cats['Other'];
  const dateStr = new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const sign    = tx.type === 'income' ? '+' : '−';
  const actHtml = actions && state.role === 'admin'
    ? `<td><div class="row-actions">
         <button class="action-btn" onclick="openModal(${tx.id})">✏️</button>
         <button class="action-btn delete" onclick="deleteTx(${tx.id})">🗑️</button>
       </div></td>`
    : (actions ? '<td></td>' : '');

  return `<tr>
    <td style="color:var(--text-3);font-size:12px;white-space:nowrap">${dateStr}</td>
    <td class="desc">${tx.desc}</td>
    <td><span class="cat-tag" style="background:${hexAlpha(meta.color, 0.12)};color:${meta.color}">${meta.emoji} ${tx.cat}</span></td>
    <td><span class="type-tag ${tx.type}">${tx.type}</span></td>
    <td class="amount ${tx.type}">${sign}${fmt(tx.amount)}</td>
    ${actHtml}
  </tr>`;
}

function renderRecentTx() {
  const rows = [...state.transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)
    .map(tx => txRow(tx, false))
    .join('');
  document.getElementById('recent-body').innerHTML = rows || '<tr><td colspan="5" class="empty-state">No transactions yet.</td></tr>';
}

function renderTransactions() {
  const list  = getFiltered();
  const tbody = document.getElementById('tx-body');
  const empty = document.getElementById('tx-empty');

  // Update sort indicators
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.classList.toggle('sorted', th.dataset.sort === state.sort.field);
    const arrow = th.querySelector('.sort-arrow');
    if (arrow) arrow.textContent = th.dataset.sort === state.sort.field ? (state.sort.dir === 'asc' ? '↑' : '↓') : '↕';
  });

  if (!list.length) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
    tbody.innerHTML = list.map(tx => txRow(tx, true)).join('');
  }

  let tIncome = 0, tExpense = 0;
  list.forEach(t => t.type === 'income' ? tIncome += t.amount : tExpense += t.amount);

  document.getElementById('tx-count-label').textContent = `Showing ${list.length} of ${state.transactions.length}`;
  document.getElementById('tx-totals').textContent      = `In: ${fmt(tIncome)} · Out: ${fmt(tExpense)}`;
}

function updatePill() {
  document.getElementById('tx-pill').textContent = state.transactions.length;
}


// ── Filters ───────────────────────────────────────────

function populateFilters() {
  const cats   = [...new Set(state.transactions.map(t => t.cat))].sort();
  const months = [...new Set(state.transactions.map(t => monthKey(t.date)))].sort().reverse();

  const catSel = document.getElementById('filter-cat');
  catSel.innerHTML = '<option value="">All Categories</option>' +
    cats.map(c => `<option value="${c}">${c}</option>`).join('');

  const monSel = document.getElementById('filter-month');
  monSel.innerHTML = '<option value="">All Months</option>' +
    months.map(m => `<option value="${m}">${monthLabel(m)}</option>`).join('');
}

function clearFilters() {
  state.filters = { search: '', type: '', cat: '', month: '' };
  document.getElementById('search').value       = '';
  document.getElementById('filter-type').value  = '';
  document.getElementById('filter-cat').value   = '';
  document.getElementById('filter-month').value = '';
  renderTransactions();
}


// ── Insights ──────────────────────────────────────────

function renderInsights() {
  const { income, expense } = getTotals();
  const balance = income - expense;
  const savings = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;
  const ratio   = income > 0 ? ((expense / income) * 100).toFixed(1) : 0;

  const catTotals  = getCategoryTotals();
  const topCat     = catTotals[0] || ['—', 0];
  const avgTx      = state.transactions.length ? (expense / state.transactions.length) : 0;

  const { keys, map } = getMonthlyData();
  const lastKey  = keys[keys.length - 1];
  const prevKey  = keys[keys.length - 2];
  const last     = map[lastKey] || { income: 0, expense: 0 };
  const prev     = map[prevKey] || { income: 0, expense: 0 };
  const momNet   = (last.income - last.expense) - (prev.income - prev.expense);

  const bestIncomeKey = keys.reduce((best, k) => (!best || map[k].income > map[best].income) ? k : best, null);

  const items = [
    { emoji: '🏆', label: 'Top Category',          value: topCat[0],                          desc: `${fmt(topCat[1])} in expenses`             },
    { emoji: '📅', label: 'Month-over-Month',       value: (momNet >= 0 ? '+' : '') + fmt(momNet), desc: `vs ${monthLabel(prevKey || lastKey)}`  },
    { emoji: '💰', label: 'Savings Rate',           value: savings + '%',                      desc: +savings >= 20 ? 'Excellent saving habit' : +savings >= 10 ? 'Moderate — can improve' : 'Below target' },
    { emoji: '📊', label: 'Avg Transaction',        value: fmt(avgTx),                         desc: `Across ${state.transactions.length} transactions` },
    { emoji: '📈', label: 'Best Income Month',      value: bestIncomeKey ? monthLabel(bestIncomeKey) : '—', desc: 'Highest earnings recorded' },
    { emoji: '🎯', label: 'Expense/Income Ratio',   value: ratio + '%',                        desc: 'Lower ratio = healthier finances'          },
  ];

  document.getElementById('insight-cards').innerHTML = items.map(i => `
    <div class="insight-item">
      <div class="insight-emoji">${i.emoji}</div>
      <div class="insight-label">${i.label}</div>
      <div class="insight-value">${i.value}</div>
      <div class="insight-desc">${i.desc}</div>
    </div>
  `).join('');

  // Monthly breakdown table
  document.getElementById('monthly-body').innerHTML = [...keys].reverse().map(k => {
    const d    = map[k];
    const net  = d.income - d.expense;
    const rate = d.income > 0 ? ((net / d.income) * 100).toFixed(1) : '0.0';
    const col  = +rate >= 20 ? 'var(--green)' : +rate >= 10 ? 'var(--amber)' : 'var(--red)';
    return `<tr>
      <td style="font-weight:600;color:var(--text)">${monthLabel(k)}</td>
      <td class="amount income">+${fmt(d.income)}</td>
      <td class="amount expense">−${fmt(d.expense)}</td>
      <td class="amount ${net >= 0 ? 'income' : 'expense'}">${net >= 0 ? '+' : '−'}${fmt(net)}</td>
      <td>
        <div class="progress-wrap">
          <div class="progress"><div class="progress-fill" style="width:${Math.min(+rate, 100)}%;background:${col}"></div></div>
          <span style="font-family:var(--font-mono);font-size:12px;color:var(--text-2)">${rate}%</span>
        </div>
      </td>
    </tr>`;
  }).join('');

  // Category bars
  const maxVal = catTotals[0]?.[1] || 1;
  const totalExp = catTotals.reduce((s, [, v]) => s + v, 0);
  document.getElementById('cat-bars').innerHTML = catTotals.map(([cat, val]) => {
    const meta  = cats[cat] || cats['Other'];
    const pct   = ((val / maxVal) * 100).toFixed(1);
    const share = totalExp > 0 ? ((val / totalExp) * 100).toFixed(1) : 0;
    return `<div class="cat-bar-row">
      <div class="cat-bar-top">
        <span class="cat-bar-name">${meta.emoji} ${cat}</span>
        <div style="display:flex;gap:12px;align-items:center">
          <span style="font-size:11px;color:var(--text-3)">${share}%</span>
          <span class="cat-bar-val" style="color:${meta.color}">${fmt(val)}</span>
        </div>
      </div>
      <div class="progress" style="max-width:100%;height:6px">
        <div class="progress-fill" style="width:${pct}%;background:${meta.color}"></div>
      </div>
    </div>`;
  }).join('');
}


// ── Charts ────────────────────────────────────────────

function drawCharts() {
  drawLineChart();
  drawDonutChart();
}

function drawLineChart() {
  const canvas = document.getElementById('line-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const W = canvas.parentElement.clientWidth - 44;
  const H = 200;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);

  const { keys, map } = getMonthlyData();
  const last6  = keys.slice(-6);
  const income  = last6.map(k => map[k]?.income  || 0);
  const expense = last6.map(k => map[k]?.expense  || 0);

  const padL = 52, padR = 16, padT = 16, padB = 32;
  const cW = W - padL - padR;
  const cH = H - padT - padB;
  const maxV = Math.max(...income, ...expense, 1) * 1.15;

  const textColor  = cssVar('--text-3');
  const gridColor  = cssVar('--border');

  ctx.clearRect(0, 0, W, H);

  // Grid + Y labels
  for (let i = 0; i <= 4; i++) {
    const y = padT + (cH / 4) * i;
    ctx.strokeStyle = gridColor;
    ctx.lineWidth   = 1;
    ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + cW, y); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle   = textColor;
    ctx.font        = '10px JetBrains Mono, monospace';
    ctx.textAlign   = 'right';
    ctx.fillText('₹' + fmtRaw(maxV * (1 - i / 4)), padL - 6, y + 4);
  }

  // X labels
  ctx.textAlign = 'center';
  ctx.font = '11px Outfit, sans-serif';
  ctx.fillStyle = textColor;
  last6.forEach((k, i) => {
    const x = padL + (cW / (last6.length - 1)) * i;
    ctx.fillText(monthLabel(k).slice(0, 6), x, H - 6);
  });

  // Draw line with area
  function drawLine(data, color) {
    const points = data.map((v, i) => [
      padL + (cW / (data.length - 1)) * i,
      padT + cH - (v / maxV) * cH
    ]);

    // Area
    ctx.beginPath();
    points.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
    ctx.lineTo(points[points.length - 1][0], padT + cH);
    ctx.lineTo(points[0][0], padT + cH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, padT, 0, padT + cH);
    grad.addColorStop(0, color + '28');
    grad.addColorStop(1, color + '00');
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    points.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
    ctx.strokeStyle = color;
    ctx.lineWidth   = 2;
    ctx.lineJoin    = 'round';
    ctx.stroke();

    // Dots
    points.forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = cssVar('--surface'); ctx.fill();
    });
  }

  drawLine(expense, '#dc2626');
  drawLine(income,  '#059669');
}

function drawDonutChart() {
  const canvas = document.getElementById('donut-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const size = Math.min(canvas.parentElement.clientWidth - 44, 180);
  canvas.width  = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width  = size + 'px';
  canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);

  const catTotals = getCategoryTotals().slice(0, 6);
  const total     = catTotals.reduce((s, [, v]) => s + v, 0) || 1;
  const cx = size / 2, cy = size / 2;
  const outerR = size / 2 - 8;
  const innerR = outerR * 0.6;

  let start = -Math.PI / 2;
  catTotals.forEach(([cat, val]) => {
    const color = cats[cat]?.color || '#888';
    const sweep = (val / total) * (Math.PI * 2);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, outerR, start, start + sweep);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    start += sweep;
  });

  // Hole
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.fillStyle = cssVar('--surface');
  ctx.fill();

  // Center text
  ctx.textAlign   = 'center';
  ctx.fillStyle   = cssVar('--text-3');
  ctx.font        = '10px Outfit, sans-serif';
  ctx.fillText('SPENT', cx, cy - 5);
  ctx.fillStyle   = cssVar('--text');
  ctx.font        = 'bold 12px JetBrains Mono, monospace';
  ctx.fillText('₹' + fmtRaw(total), cx, cy + 10);

  // Legend
  document.getElementById('donut-legend').innerHTML = catTotals.map(([cat]) => {
    const meta = cats[cat] || cats['Other'];
    return `<div class="donut-legend-item">
      <span style="background:${meta.color}"></span>${meta.emoji} ${cat}
    </div>`;
  }).join('');
}


// ── CRUD ──────────────────────────────────────────────

function openModal(id) {
  if (state.role !== 'admin') return toast('Admin access required', 'error');
  state.editId = id || null;

  const isEdit = id != null;
  document.getElementById('modal-title').textContent = isEdit ? 'Edit Transaction' : 'Add Transaction';

  if (isEdit) {
    const tx = state.transactions.find(t => t.id === id);
    if (!tx) return;
    document.getElementById('f-desc').value   = tx.desc;
    document.getElementById('f-amount').value = tx.amount;
    document.getElementById('f-type').value   = tx.type;
    document.getElementById('f-cat').value    = tx.cat;
    document.getElementById('f-date').value   = tx.date;
  } else {
    document.getElementById('f-desc').value   = '';
    document.getElementById('f-amount').value = '';
    document.getElementById('f-type').value   = 'expense';
    document.getElementById('f-cat').value    = 'Food';
    document.getElementById('f-date').value   = new Date().toISOString().split('T')[0];
  }

  document.getElementById('modal-overlay').classList.add('open');
  document.getElementById('f-desc').focus();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function saveTransaction() {
  const desc   = document.getElementById('f-desc').value.trim();
  const amount = parseFloat(document.getElementById('f-amount').value);
  const type   = document.getElementById('f-type').value;
  const cat    = document.getElementById('f-cat').value;
  const date   = document.getElementById('f-date').value;

  if (!desc)               return toast('Description is required', 'error');
  if (!amount || amount <= 0) return toast('Enter a valid amount',  'error');
  if (!date)               return toast('Date is required',         'error');

  if (state.editId != null) {
    const idx = state.transactions.findIndex(t => t.id === state.editId);
    if (idx > -1) state.transactions[idx] = { ...state.transactions[idx], desc, amount, type, cat, date };
    toast('Transaction updated', 'success');
  } else {
    state.transactions.push({ id: nextId(), desc, amount, type, cat, date });
    toast('Transaction added', 'success');
  }

  persist();
  populateFilters();
  renderAll();
  if (state.page === 'overview')  drawCharts();
  if (state.page === 'insights')  renderInsights();
  closeModal();
}

function deleteTx(id) {
  if (!confirm('Delete this transaction?')) return;
  state.transactions = state.transactions.filter(t => t.id !== id);
  persist();
  populateFilters();
  renderAll();
  if (state.page === 'overview') drawCharts();
  toast('Transaction deleted', 'info');
}


// ── Export CSV ────────────────────────────────────────

function exportCSV() {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows    = [...state.transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(t => [t.date, `"${t.desc}"`, t.cat, t.type, t.amount]);

  const csv  = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = 'finflow_export.csv';
  a.click();
  URL.revokeObjectURL(url);
  toast('CSV exported', 'success');
}


// ── Toast ─────────────────────────────────────────────

function toast(msg, type = 'info') {
  const icons   = { success: '✓', error: '✕', info: 'i' };
  const el      = document.createElement('div');
  el.className  = `toast ${type}`;
  el.innerHTML  = `<strong>${icons[type]}</strong> ${msg}`;
  document.getElementById('toast-stack').appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity 0.3s, transform 0.3s';
    el.style.opacity    = '0';
    el.style.transform  = 'translateX(50px)';
    setTimeout(() => el.remove(), 320);
  }, 2800);
}


// ── Start ─────────────────────────────────────────────

init();
