/* ---------- Fixed (unfiltered) totals for gauge scale ---------- */
const GRAND_TOTAL = sum(RAW_DATA, r => r.valor);
const GRAND_OBRA = sum(RAW_DATA.filter(r => r.tipo === 'Obra'), r => r.valor);
const GRAND_CASA = sum(RAW_DATA.filter(r => r.tipo === 'Casa'), r => r.valor);

/* ---------- State ---------- */
const state = {
  dateFrom: null,
  dateTo: null,
  sacado: new Set(),
  tipo: new Set(),
  fornecedor: new Set(),
  etapaFilter: null,
  search: '',
  sortKey: 'data',
  sortDir: 'asc',
};

/* ---------- Build filter option lists ---------- */
const uniq = (key) => [...new Set(RAW_DATA.map(r => r[key]))].sort((a, b) => a.localeCompare(b, 'pt-BR'));

function buildCheckboxGroup(container, key, values) {
  container.innerHTML = '';
  values.forEach(val => {
    const id = `${key}_${val}`.replace(/\s+/g, '_');
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" id="${id}" value="${val}"> <span>${val}</span>`;
    container.appendChild(label);
    label.querySelector('input').addEventListener('change', (e) => {
      if (e.target.checked) state[key].add(val);
      else state[key].delete(val);
      render();
    });
  });
}

/* ---------- Filtering ---------- */
function applyBaseFilters(rows) {
  return rows.filter(r => {
    if (state.dateFrom && r.data < state.dateFrom) return false;
    if (state.dateTo && r.data > state.dateTo) return false;
    if (state.sacado.size && !state.sacado.has(r.sacado)) return false;
    if (state.tipo.size && !state.tipo.has(r.tipo)) return false;
    if (state.fornecedor.size && !state.fornecedor.has(r.fornecedor)) return false;
    if (state.search) {
      const s = state.search.toLowerCase();
      if (!r.descricao.toLowerCase().includes(s) && !r.fornecedor.toLowerCase().includes(s)) return false;
    }
    return true;
  });
}

// Rows used by the chart itself: every filter EXCEPT the chart's own cross-filter selection.
function getChartRows() {
  return applyBaseFilters(RAW_DATA);
}

// Rows used by table / gauges / KPIs: all filters including the chart cross-filter.
function getFiltered() {
  const rows = applyBaseFilters(RAW_DATA);
  if (state.etapaFilter) return rows.filter(r => r.etapa === state.etapaFilter);
  return rows;
}

/* ---------- Bar chart (SVG, click-to-filter) ---------- */
function renderChart(chartRows) {
  const totals = {};
  chartRows.forEach(r => { totals[r.etapa] = (totals[r.etapa] || 0) + r.valor; });
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  const area = document.getElementById('chartArea');
  const containerW = area.clientWidth || 600;
  const h = area.clientHeight || 320;
  const padL = 60, padR = 15, padT = 30, padB = 70;

  const barCount = entries.length || 1;
  const gap = 10;
  const minBarW = 32; // below this, bars/labels become unreadable — scroll instead of squishing further
  const minW = padL + padR + barCount * minBarW + gap * (barCount - 1);
  const w = Math.max(containerW, minW);

  const plotW = Math.max(20, w - padL - padR);
  const plotH = Math.max(20, h - padT - padB);

  const maxVal = entries.length ? Math.max(...entries.map(e => e[1])) : 0;
  const niceMax = maxVal === 0 ? 1 : maxVal * 1.18;

  const barW = Math.max(6, (plotW - gap * (barCount - 1)) / barCount);

  const accent = cssVar('--accent') || '#a86a4a';
  const gridColor = cssVar('--grid-line') || 'rgba(255,255,255,0.08)';
  const dimText = cssVar('--text-dim') || '#b39a8a';
  const mainText = cssVar('--text-main') || '#f2e0d4';

  const yTicks = 3;
  let gridSvg = '';
  for (let i = 0; i <= yTicks; i++) {
    const val = (niceMax / yTicks) * i;
    const y = padT + plotH - (val / niceMax) * plotH;
    gridSvg += `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="${gridColor}" stroke-width="1"/>`;
    gridSvg += `<text x="${padL - 8}" y="${y + 4}" text-anchor="end" fill="${dimText}" font-size="11">${fmtMil(val)}</text>`;
  }

  let barsSvg = '';
  entries.forEach(([etapa, val], i) => {
    const x = padL + i * (barW + gap);
    const barH = (val / niceMax) * plotH;
    const y = padT + plotH - barH;
    const isSelected = state.etapaFilter === etapa;
    const isDimmed = state.etapaFilter && !isSelected;
    const barColor = isSelected ? cssVar('--accent-light') || accent : accent;
    barsSvg += `<g class="bar-etapa${isDimmed ? ' dimmed' : ''}" data-etapa="${etapa.replace(/"/g, '&quot;')}">
      <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="2" fill="${barColor}"/>
      <rect x="${x}" y="${padT}" width="${barW}" height="${plotH}" fill="transparent"/>
      <g>
        <rect x="${x + barW / 2 - 20}" y="${y - 22}" width="40" height="16" rx="8" fill="${cssVar('--thead-bg') || '#0d0b0a'}" stroke="${gridColor}"/>
        <text x="${x + barW / 2}" y="${y - 10}" text-anchor="middle" fill="#f2e0d4" font-size="10">${fmtMil(val)}</text>
      </g>
      <text x="${x + barW / 2}" y="${padT + plotH + 14}" text-anchor="end" fill="${mainText}" font-size="11" transform="rotate(-30 ${x + barW / 2} ${padT + plotH + 14})">${etapa}</text>
    </g>`;
  });

  const axisSvg = `<line x1="${padL}" y1="${padT + plotH}" x2="${w - padR}" y2="${padT + plotH}" stroke="${gridColor}" stroke-width="1"/>`;

  area.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" style="width:${w}px;">
      ${gridSvg}
      ${axisSvg}
      ${barsSvg}
    </svg>`;

  area.querySelectorAll('.bar-etapa').forEach(g => {
    g.style.cursor = 'pointer';
    g.addEventListener('click', () => {
      const etapa = g.dataset.etapa;
      state.etapaFilter = state.etapaFilter === etapa ? null : etapa;
      render();
    });
  });
}

/* ---------- Trend sparkline (cumulative, reacts to filters) ---------- */
function renderTrend(rows) {
  const el = document.getElementById('trendChart');
  const w = el.clientWidth || 200;
  const h = el.clientHeight || 60;

  if (!rows.length) {
    el.innerHTML = `<svg viewBox="0 0 ${w} ${h}"></svg>`;
    return;
  }

  const sorted = [...rows].sort((a, b) => a.data.localeCompare(b.data));
  const byDate = [];
  let running = 0;
  let curDate = null;
  sorted.forEach(r => {
    if (r.data !== curDate) {
      byDate.push({ data: r.data, cum: running });
      curDate = r.data;
    }
    running += r.valor;
    byDate[byDate.length - 1].cum = running;
  });

  const maxV = running || 1;
  const padX = 3, padY = 6;
  const stepX = (w - padX * 2) / Math.max(1, byDate.length - 1);
  const pts = byDate.map((p, i) => {
    const x = padX + i * stepX;
    const y = h - padY - (p.cum / maxV) * (h - padY * 2);
    return [x, y];
  });

  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L ${pts[pts.length - 1][0].toFixed(1)} ${h} L ${pts[0][0].toFixed(1)} ${h} Z`;

  const accent = cssVar('--accent') || '#a86a4a';

  el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <path d="${area}" fill="${accent}" opacity="0.18"/>
    <path d="${line}" fill="none" stroke="${accent}" stroke-width="1.8"/>
    <circle cx="${pts[pts.length - 1][0]}" cy="${pts[pts.length - 1][1]}" r="2.5" fill="${accent}"/>
  </svg>`;
}

/* ---------- Table ---------- */
function renderTable(rows) {
  const sorted = [...rows].sort((a, b) => {
    let av = a[state.sortKey], bv = b[state.sortKey];
    if (state.sortKey === 'valor') { av = Number(av); bv = Number(bv); }
    if (av < bv) return state.sortDir === 'asc' ? -1 : 1;
    if (av > bv) return state.sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = sorted.map(r => `
    <tr>
      <td>${fmtDateBR(r.data)}</td>
      <td>${r.descricao}</td>
      <td>${r.etapa}</td>
      <td>${r.fornecedor}</td>
      <td>${r.sacado}</td>
      <td class="col-valor">${fmtBRL(r.valor)}</td>
    </tr>
  `).join('');

  document.querySelectorAll('#dataTable thead th').forEach(th => {
    const arrow = th.querySelector('.sort-arrow');
    if (th.dataset.key === state.sortKey) {
      arrow.textContent = state.sortDir === 'asc' ? '▲' : '▼';
    } else {
      arrow.textContent = '';
    }
  });
}

/* ---------- KPI cards ---------- */
function renderKpis(rows) {
  if (!rows.length) {
    document.getElementById('kpiMaior').textContent = '-';
    document.getElementById('kpiMaiorSub').textContent = '';
    document.getElementById('kpiFornecedor').textContent = '-';
    document.getElementById('kpiFornecedorSub').textContent = '';
    document.getElementById('kpiTicket').textContent = '-';
    document.getElementById('kpiTicketSub').textContent = '';
    document.getElementById('kpiCount').textContent = '0';
    document.getElementById('kpiCountSub').textContent = '';
    return;
  }

  const maior = rows.reduce((a, r) => r.valor > a.valor ? r : a, rows[0]);
  document.getElementById('kpiMaior').textContent = `R$ ${fmtBRL(maior.valor)}`;
  document.getElementById('kpiMaiorSub').textContent = maior.descricao;

  const byFornecedor = {};
  rows.forEach(r => { byFornecedor[r.fornecedor] = (byFornecedor[r.fornecedor] || 0) + r.valor; });
  const topFornecedor = Object.entries(byFornecedor).sort((a, b) => b[1] - a[1])[0];
  document.getElementById('kpiFornecedor').textContent = topFornecedor[0];
  document.getElementById('kpiFornecedorSub').textContent = `R$ ${fmtBRL(topFornecedor[1])}`;

  const total = sum(rows, r => r.valor);
  const ticket = total / rows.length;
  document.getElementById('kpiTicket').textContent = `R$ ${fmtBRL(ticket)}`;
  document.getElementById('kpiTicketSub').textContent = `por lançamento`;

  document.getElementById('kpiCount').textContent = rows.length;
  document.getElementById('kpiCountSub').textContent = state.etapaFilter ? `em ${state.etapaFilter}` : 'lançamentos';
}

/* ---------- Main render ---------- */
let lastFiltered = RAW_DATA;

function render() {
  const chartRows = getChartRows();
  const rows = getFiltered();
  lastFiltered = rows;

  renderChart(chartRows);
  renderTable(rows);
  renderKpis(rows);
  renderTrend(rows);

  const total = sum(rows, r => r.valor);
  const obra = sum(rows.filter(r => r.tipo === 'Obra'), r => r.valor);
  const casa = sum(rows.filter(r => r.tipo === 'Casa'), r => r.valor);

  renderGauge('gaugeTotal', total, GRAND_TOTAL * 2);
  renderGauge('gaugeObra', obra, GRAND_OBRA * 2);
  renderGauge('gaugeCasa', casa, GRAND_CASA * 2);
}

/* ---------- Init ---------- */
function init() {
  initTheme(render);

  buildCheckboxGroup(document.getElementById('filterSacado'), 'sacado', uniq('sacado'));
  buildCheckboxGroup(document.getElementById('filterTipo'), 'tipo', uniq('tipo'));
  buildCheckboxGroup(document.getElementById('filterFornecedor'), 'fornecedor', uniq('fornecedor'));

  document.getElementById('dateFrom').addEventListener('change', (e) => { state.dateFrom = e.target.value || null; render(); });
  document.getElementById('dateTo').addEventListener('change', (e) => { state.dateTo = e.target.value || null; render(); });

  let searchTimer = null;
  document.getElementById('searchBox').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    const val = e.target.value;
    searchTimer = setTimeout(() => { state.search = val; render(); }, 150);
  });

  document.querySelectorAll('#dataTable thead th').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortKey = key;
        state.sortDir = 'asc';
      }
      renderTable(lastFiltered);
    });
  });

  document.getElementById('clearFilters').addEventListener('click', () => {
    state.dateFrom = null; state.dateTo = null;
    state.sacado.clear(); state.tipo.clear(); state.fornecedor.clear();
    state.etapaFilter = null; state.search = '';
    document.querySelectorAll('.checkbox-list input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    document.getElementById('searchBox').value = '';
    render();
  });

  document.getElementById('exportCsv').addEventListener('click', () => {
    exportCsv('custos_filtrados.csv', ['Data', 'Descricao', 'Etapa', 'Fornecedor', 'Sacado', 'Valor'],
      lastFiltered.map(r => [fmtDateBR(r.data), r.descricao, r.etapa, r.fornecedor, r.sacado, fmtBRL(r.valor)]));
  });

  render();

  window.addEventListener('resize', () => {
    renderChart(getChartRows());
    renderTrend(lastFiltered);
  });
}

document.addEventListener('DOMContentLoaded', init);
