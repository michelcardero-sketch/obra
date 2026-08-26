/* ---------- Shared helpers used across every tab ---------- */
const fmtMil = (v) => {
  const mil = v / 1000;
  const rounded = Math.round(mil);
  return `${rounded.toLocaleString('pt-BR')} Mil`;
};
const fmtMilDec = (v) => {
  const mil = v / 1000;
  return `$${mil.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Mil`;
};
const fmtBRL = (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtDateBR = (iso) => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};
const sum = (arr, fn) => arr.reduce((a, r) => a + fn(r), 0);
const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/* ---------- Theme (shared across pages via localStorage) ---------- */
const ICON_SUN = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>';
const ICON_MOON = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5a8.5 8.5 0 1 0 11.2 11.2Z"/></svg>';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.innerHTML = (theme === 'light' ? ICON_SUN : ICON_MOON) + '<span>' + (theme === 'light' ? 'Claro' : 'Escuro') + '</span>';
  }
  try { localStorage.setItem('bi-theme', theme); } catch (e) { /* ignore (file:// or blocked storage) */ }
}

function initTheme(onToggle) {
  let saved = null;
  try { saved = localStorage.getItem('bi-theme'); } catch (e) { /* ignore */ }
  applyTheme(saved === 'light' ? 'light' : 'dark');

  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'light' ? 'dark' : 'light');
      if (onToggle) onToggle();
    });
  }
}

/* ---------- Semicircle gauge (SVG) ---------- */
function renderGauge(elId, value, max) {
  const el = document.getElementById(elId);
  if (!el) return;
  const w = 220, h = 156;
  const cx = w / 2, cy = 130, r = 90; // h has 26px of headroom below cy so the min/max labels (drawn at cy+16) aren't clipped by the viewBox edge

  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const startAngle = Math.PI;
  const endAngle = Math.PI - pct * Math.PI;

  const polarToXY = (angle) => [cx + r * Math.cos(angle), cy - r * Math.sin(angle)];
  const [sx, sy] = polarToXY(startAngle);
  const [ex, ey] = polarToXY(endAngle);
  const largeArc = pct > 0.5 ? 1 : 0;

  const trackPath = `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy}`;
  const valuePath = pct > 0 ? `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}` : '';

  const track = cssVar('--track') || '#3b2a22';
  const accent = cssVar('--accent') || '#a86a4a';
  const dimText = cssVar('--text-dim') || '#b39a8a';
  const valueText = cssVar('--gauge-value-text') || '#f2e0d4';

  el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">
    <path d="${trackPath}" fill="none" stroke="${track}" stroke-width="14" stroke-linecap="round"/>
    ${valuePath ? `<path d="${valuePath}" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>` : ''}
    <text x="${cx}" y="${cy - 28}" text-anchor="middle" fill="${valueText}" font-size="19" font-weight="600">${fmtMilDec(value)}</text>
    <text x="${cx - r}" y="${cy + 16}" text-anchor="start" fill="${dimText}" font-size="11">$0 Mil</text>
    <text x="${cx + r}" y="${cy + 16}" text-anchor="end" fill="${dimText}" font-size="11">${fmtMilDec(max)}</text>
  </svg>`;
}

/* ---------- Generic CSV export ---------- */
function exportCsv(filename, headers, rows) {
  const lines = [headers.join(';')];
  rows.forEach(cols => {
    lines.push(cols.map(c => {
      const s = String(c);
      return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(';'));
  });
  const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ---------- Nav: mark current page's tab active + last-update stamp ---------- */
function initNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.top-nav a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === path);
  });

  const lastUpdateEl = document.getElementById('lastUpdate');
  if (lastUpdateEl) {
    const now = new Date();
    lastUpdateEl.textContent = now.toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }
}

document.addEventListener('DOMContentLoaded', initNav);
