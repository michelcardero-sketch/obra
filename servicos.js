/* ---------- Derived totals ---------- */
const TOTAL_CONTRATADO = sum(CONTRATO_DATA.filter(c => c.valor !== null), c => c.valor);
const TOTAL_PAGO = sum(PAGAMENTOS_DATA, p => p.valor);
const SALDO = TOTAL_CONTRATADO - TOTAL_PAGO;
const TOTAL_ETAPAS = CONTRATO_DATA.length;
const ETAPAS_ENTREGUES = CONTRATO_DATA.filter(c => c.entregue).length;
const VALOR_ENTREGUE = sum(CONTRATO_DATA.filter(c => c.entregue && c.valor !== null), c => c.valor);
const VALOR_PENDENTE = Math.max(0, TOTAL_CONTRATADO - VALOR_ENTREGUE);

/* Chronological running balance, computed once so it stays stable no matter how the table is sorted */
const PAGAMENTOS_SORTED = [...PAGAMENTOS_DATA].sort((a, b) => a.data.localeCompare(b.data));
let _running = 0;
PAGAMENTOS_SORTED.forEach(p => {
  _running += p.valor;
  p.saldoAcumulado = TOTAL_CONTRATADO - _running;
});

/* ---------- State ---------- */
const state = {
  status: 'todas', // todas | done | pending
  search: '',
  sortKey: 'data',
  sortDir: 'asc',
};

/* ---------- Progress ring (count-based) ---------- */
function renderProgressRing() {
  const el = document.getElementById('progressRing');
  const pct = TOTAL_ETAPAS > 0 ? ETAPAS_ENTREGUES / TOTAL_ETAPAS : 0;
  const size = 64, stroke = 8, r = (size - stroke) / 2, c = r * 2 * Math.PI;
  const offset = c * (1 - pct);
  const track = cssVar('--track') || '#3b2a22';
  const accent = cssVar('--accent') || '#a86a4a';
  const textColor = cssVar('--gauge-value-text') || '#f2e0d4';

  el.innerHTML = `<svg viewBox="0 0 ${size} ${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${track}" stroke-width="${stroke}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${accent}" stroke-width="${stroke}"
      stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${offset}"
      transform="rotate(-90 ${size/2} ${size/2})"/>
    <text x="${size/2}" y="${size/2 + 4}" text-anchor="middle" fill="${textColor}" font-size="14" font-weight="700">${Math.round(pct*100)}%</text>
  </svg>`;
  document.getElementById('progressValue').textContent = `${ETAPAS_ENTREGUES} / ${TOTAL_ETAPAS}`;
}

/* ---------- Roadmap ---------- */
function getFilteredRoadmap() {
  return CONTRATO_DATA.filter(c => {
    if (state.status === 'done' && !c.entregue) return false;
    if (state.status === 'pending' && c.entregue) return false;
    if (state.search) {
      const s = state.search.toLowerCase();
      if (!c.etapa.toLowerCase().includes(s) && !c.descricao.toLowerCase().includes(s)) return false;
    }
    return true;
  });
}

function renderRoadmap() {
  const rows = getFilteredRoadmap();
  const el = document.getElementById('roadmapScroll');

  if (!rows.length) {
    el.innerHTML = `<div class="kpi-sub" style="padding:12px 4px;">Nenhuma etapa encontrada.</div>`;
    return;
  }

  el.innerHTML = rows.map(c => `
    <div class="roadmap-item ${c.entregue ? 'done' : ''}">
      <div class="roadmap-line"><div class="roadmap-dot"></div></div>
      <div class="roadmap-body">
        <div>
          <div class="roadmap-etapa">${c.etapa}</div>
          <div class="roadmap-desc">${c.descricao}</div>
        </div>
        <div class="roadmap-right">
          <div class="roadmap-valor">${c.valor !== null ? 'R$ ' + fmtBRL(c.valor) : 'A definir'}</div>
          <span class="roadmap-status ${c.entregue ? 'done' : 'pending'}">${c.entregue ? 'Entregue' : 'Pendente'}</span>
        </div>
      </div>
    </div>
  `).join('');
}

/* ---------- KPIs ---------- */
function renderKpis() {
  document.getElementById('kpiContratado').textContent = `R$ ${fmtBRL(TOTAL_CONTRATADO)}`;
  document.getElementById('kpiPago').textContent = `R$ ${fmtBRL(TOTAL_PAGO)}`;
  document.getElementById('kpiPagoSub').textContent = `${((TOTAL_PAGO / TOTAL_CONTRATADO) * 100).toFixed(1)}% do total`;
  document.getElementById('kpiSaldo').textContent = `R$ ${fmtBRL(SALDO)}`;
  document.getElementById('kpiEntregues').textContent = `${ETAPAS_ENTREGUES}/${TOTAL_ETAPAS}`;
  document.getElementById('kpiEntreguesSub').textContent = `${Math.round((ETAPAS_ENTREGUES / TOTAL_ETAPAS) * 100)}% concluído`;
}

/* ---------- Right column: gauge, status bars, contractor info ---------- */
function renderRightColumn() {
  renderGauge('gaugePago', TOTAL_PAGO, TOTAL_CONTRATADO);

  const doneW = TOTAL_CONTRATADO > 0 ? (VALOR_ENTREGUE / TOTAL_CONTRATADO) * 100 : 0;
  const pendW = TOTAL_CONTRATADO > 0 ? (VALOR_PENDENTE / TOTAL_CONTRATADO) * 100 : 0;
  document.getElementById('statDoneLabel').textContent = `R$ ${fmtBRL(VALOR_ENTREGUE)}`;
  document.getElementById('statPendingLabel').textContent = `R$ ${fmtBRL(VALOR_PENDENTE)}`;
  document.getElementById('statDoneBar').style.width = `${doneW}%`;
  document.getElementById('statPendingBar').style.width = `${pendW}%`;

  document.getElementById('infoCount').textContent = `${PAGAMENTOS_DATA.length} pagamentos`;
  const last = PAGAMENTOS_SORTED[PAGAMENTOS_SORTED.length - 1];
  document.getElementById('infoLast').textContent = `${fmtDateBR(last.data)} - R$ ${fmtBRL(last.valor)}`;
}

/* ---------- Payments table ---------- */
function renderPaymentsTable() {
  const sorted = [...PAGAMENTOS_SORTED].sort((a, b) => {
    let av = a[state.sortKey], bv = b[state.sortKey];
    if (state.sortKey === 'valor') { av = Number(av); bv = Number(bv); }
    if (av < bv) return state.sortDir === 'asc' ? -1 : 1;
    if (av > bv) return state.sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  document.getElementById('paymentsBody').innerHTML = sorted.map(p => `
    <tr>
      <td>${fmtDateBR(p.data)}</td>
      <td>${p.descricao}</td>
      <td>${p.sacado}</td>
      <td class="col-valor">${fmtBRL(p.valor)}</td>
      <td class="col-valor">R$ ${fmtBRL(p.saldoAcumulado)}</td>
    </tr>
  `).join('');

  document.querySelectorAll('#paymentsTable thead th').forEach(th => {
    const arrow = th.querySelector('.sort-arrow');
    if (!arrow) return;
    if (th.dataset.key === state.sortKey) {
      arrow.textContent = state.sortDir === 'asc' ? '▲' : '▼';
    } else {
      arrow.textContent = '';
    }
  });
}

/* ---------- Main render ---------- */
function render() {
  renderProgressRing();
  renderRoadmap();
  renderKpis();
  renderRightColumn();
  renderPaymentsTable();
}

/* ---------- Init ---------- */
function init() {
  initTheme(render);

  document.querySelectorAll('#statusFilter .toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#statusFilter .toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.status = btn.dataset.status;
      renderRoadmap();
    });
  });

  let searchTimer = null;
  document.getElementById('searchBox').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    const val = e.target.value;
    searchTimer = setTimeout(() => { state.search = val; renderRoadmap(); }, 150);
  });

  document.getElementById('clearFilters').addEventListener('click', () => {
    state.status = 'todas';
    state.search = '';
    document.querySelectorAll('#statusFilter .toggle-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('#statusFilter .toggle-btn[data-status="todas"]').classList.add('active');
    document.getElementById('searchBox').value = '';
    renderRoadmap();
  });

  document.querySelectorAll('#paymentsTable thead th[data-key]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortKey = key;
        state.sortDir = 'asc';
      }
      renderPaymentsTable();
    });
  });

  document.getElementById('exportCsv').addEventListener('click', () => {
    exportCsv('pagamentos_servicos.csv', ['Data', 'Descricao', 'Sacado', 'Valor', 'Saldo Acumulado'],
      PAGAMENTOS_SORTED.map(p => [fmtDateBR(p.data), p.descricao, p.sacado, fmtBRL(p.valor), fmtBRL(p.saldoAcumulado)]));
  });

  render();
}

document.addEventListener('DOMContentLoaded', init);
