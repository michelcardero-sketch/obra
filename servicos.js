/* ---------- Derived totals ---------- */
const TOTAL_CONTRATADO = sum(CONTRATO_DATA.filter(c => c.valor !== null), c => c.valor);
const TOTAL_PAGO = sum(PAGAMENTOS_DATA, p => p.valor);
const SALDO = TOTAL_CONTRATADO - TOTAL_PAGO;
const TOTAL_ETAPAS = CONTRATO_DATA.length;

// Physical progress, weighted by each etapa's contract value (not just a
// head count) — e.g. a 50%-done R$36.000 etapa counts for more than a
// finished R$1.500 one.
const VALOR_EXECUTADO = sum(CONTRATO_DATA.filter(c => c.valor !== null), c => c.valor * c.progresso);
const VALOR_PENDENTE = Math.max(0, TOTAL_CONTRATADO - VALOR_EXECUTADO);
const PROGRESSO_PONDERADO = TOTAL_CONTRATADO > 0 ? VALOR_EXECUTADO / TOTAL_CONTRATADO : 0;

const ETAPAS_CONCLUIDAS = CONTRATO_DATA.filter(c => c.progresso >= 1).length;
const ETAPAS_EM_ANDAMENTO = CONTRATO_DATA.filter(c => c.progresso > 0 && c.progresso < 1).length;
const ETAPAS_NAO_INICIADAS = TOTAL_ETAPAS - ETAPAS_CONCLUIDAS - ETAPAS_EM_ANDAMENTO;

function statusInfo(progresso) {
  if (progresso >= 1) return { cls: 'done', label: 'Concluída' };
  if (progresso > 0) return { cls: 'in-progress', label: `${Math.round(progresso * 100)}% concluído` };
  return { cls: 'not-started', label: 'Não iniciada' };
}

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

/* ---------- Progress ring (weighted by contract value) ---------- */
function renderProgressRing() {
  const el = document.getElementById('progressRing');
  const pct = PROGRESSO_PONDERADO;
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
  document.getElementById('progressValue').textContent = `${Math.round(pct * 100)}%`;
  document.getElementById('progressSub').textContent = `${ETAPAS_CONCLUIDAS} concluídas · ${ETAPAS_EM_ANDAMENTO} em andamento`;
}

/* ---------- Entregue vs Pago (mini bar chart) ---------- */
function renderEntreguePagoChart() {
  const el = document.getElementById('entreguePagoChart');
  const w = el.clientWidth || 400;
  const h = el.clientHeight || 180;
  const padL = 60, padR = 15, padT = 26, padB = 26;
  const plotW = Math.max(20, w - padL - padR);
  const plotH = Math.max(20, h - padT - padB);

  const bars = [
    { label: 'Entregue', valor: VALOR_EXECUTADO, color: cssVar('--accent') || '#a86a4a' },
    { label: 'Pago', valor: TOTAL_PAGO, color: cssVar('--accent-light') || '#c98a63' },
  ];
  const maxVal = Math.max(bars[0].valor, bars[1].valor, 1);
  const niceMax = maxVal * 1.2;

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

  const gap = Math.min(60, plotW * 0.15);
  const barW = Math.min(110, (plotW - gap) / 2);
  const totalW = barW * 2 + gap;
  const startX = padL + (plotW - totalW) / 2;

  let barsSvg = '';
  bars.forEach((b, i) => {
    const x = startX + i * (barW + gap);
    const barH = (b.valor / niceMax) * plotH;
    const y = padT + plotH - barH;
    barsSvg += `
      <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="3" fill="${b.color}"/>
      <text x="${x + barW / 2}" y="${y - 8}" text-anchor="middle" fill="${mainText}" font-size="12" font-weight="700">R$ ${fmtBRL(b.valor)}</text>
      <text x="${x + barW / 2}" y="${padT + plotH + 18}" text-anchor="middle" fill="${mainText}" font-size="12" font-weight="600">${b.label}</text>
    `;
  });

  const axisSvg = `<line x1="${padL}" y1="${padT + plotH}" x2="${w - padR}" y2="${padT + plotH}" stroke="${gridColor}" stroke-width="1"/>`;

  el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" style="width:${w}px;height:100%;display:block;">
      ${gridSvg}${axisSvg}${barsSvg}
    </svg>`;

  const delta = VALOR_EXECUTADO - TOTAL_PAGO;
  const deltaEl = document.getElementById('entreguePagoDelta');
  if (Math.abs(delta) < 1) {
    deltaEl.textContent = 'Valor entregue e valor pago estão equilibrados.';
  } else if (delta > 0) {
    deltaEl.textContent = `R$ ${fmtBRL(delta)} já entregues pela equipe e ainda não pagos.`;
  } else {
    deltaEl.textContent = `R$ ${fmtBRL(-delta)} pagos além do que já foi entregue.`;
  }
}

/* ---------- Roadmap ---------- */
function getFilteredRoadmap() {
  return CONTRATO_DATA.filter(c => {
    if (state.status === 'done' && c.progresso < 1) return false;
    if (state.status === 'progress' && !(c.progresso > 0 && c.progresso < 1)) return false;
    if (state.status === 'pending' && c.progresso > 0) return false;
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

  el.innerHTML = rows.map(c => {
    const st = statusInfo(c.progresso);
    return `
    <div class="roadmap-item ${st.cls}">
      <div class="roadmap-line"><div class="roadmap-dot"></div></div>
      <div class="roadmap-body-wrap">
        <div class="roadmap-body">
          <div>
            <div class="roadmap-etapa">${c.etapa}</div>
            <div class="roadmap-desc">${c.descricao}</div>
          </div>
          <div class="roadmap-right">
            <div class="roadmap-valor">${c.valor !== null ? 'R$ ' + fmtBRL(c.valor) : 'A definir'}</div>
            <span class="roadmap-status ${st.cls}">${st.label}</span>
          </div>
        </div>
        <div class="stat-row-bar roadmap-progress-bar"><div class="stat-row-bar-fill" style="width:${Math.round(c.progresso * 100)}%"></div></div>
      </div>
    </div>`;
  }).join('');
}

/* ---------- KPIs ---------- */
function renderKpis() {
  document.getElementById('kpiContratado').textContent = `R$ ${fmtBRL(TOTAL_CONTRATADO)}`;
  document.getElementById('kpiPago').textContent = `R$ ${fmtBRL(TOTAL_PAGO)}`;
  document.getElementById('kpiPagoSub').textContent = `${((TOTAL_PAGO / TOTAL_CONTRATADO) * 100).toFixed(1)}% do total`;
  document.getElementById('kpiSaldo').textContent = `R$ ${fmtBRL(SALDO)}`;
  document.getElementById('kpiProgresso').textContent = `${Math.round(PROGRESSO_PONDERADO * 100)}%`;
  document.getElementById('kpiProgressoSub').textContent = `${ETAPAS_CONCLUIDAS} concluídas · ${ETAPAS_EM_ANDAMENTO} em andamento · ${ETAPAS_NAO_INICIADAS} a iniciar`;
}

/* ---------- Right column: gauge, status bars, contractor info ---------- */
function renderRightColumn() {
  renderGauge('gaugePago', TOTAL_PAGO, TOTAL_CONTRATADO);

  const doneW = TOTAL_CONTRATADO > 0 ? (VALOR_EXECUTADO / TOTAL_CONTRATADO) * 100 : 0;
  const pendW = TOTAL_CONTRATADO > 0 ? (VALOR_PENDENTE / TOTAL_CONTRATADO) * 100 : 0;
  document.getElementById('statDoneLabel').textContent = `R$ ${fmtBRL(VALOR_EXECUTADO)}`;
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
  renderEntreguePagoChart();
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

  window.addEventListener('resize', renderEntreguePagoChart);
}

document.addEventListener('DOMContentLoaded', init);
