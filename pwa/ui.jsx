// Plate Analyzer — UI primitives (PWA)
const { useState, useMemo, useEffect, useRef } = React;

function PARing({ value = 0, target = 100, size = 64, stroke = 5, color = '#c4b5fd', track = 'rgba(255,255,255,0.08)', children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, Math.max(0, value / target));
  const offset = c * (1 - pct);
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
        {children}
      </div>
    </div>
  );
}

function PASpark({ values, w = 60, h = 18, color = '#c4b5fd', area = true, dotLast = true }) {
  if (!values || values.length === 0) return null;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const stepX = w / (values.length - 1 || 1);
  const pts = values.map((v, i) => [i * stepX, h - ((v - min) / range) * (h - 2) - 1]);
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const dArea = `${d} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} style={{ display: 'block', flexShrink: 0 }}>
      {area && <path d={dArea} fill={color} fillOpacity="0.12" />}
      <path d={d} fill="none" stroke={color} strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round" />
      {dotLast && <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2" fill={color} />}
    </svg>
  );
}

function PABar({ value, target, color = '#c4b5fd', track = 'rgba(255,255,255,0.06)', height = 4, max, showTick = true }) {
  const cap = max || target * 1.4;
  const pct = Math.min(100, (value / cap) * 100);
  const tickPct = Math.min(100, (target / cap) * 100);
  return (
    <div style={{ position: 'relative', height, background: track, borderRadius: height/2, overflow: 'visible' }}>
      <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: color, borderRadius: height/2 }} />
      {showTick && (
        <div style={{ position: 'absolute', top: -2, bottom: -2, left: `calc(${tickPct}% - 0.5px)`, width: 1, background: 'rgba(255,255,255,0.4)' }} />
      )}
    </div>
  );
}

function PAPill({ status = 'ok', children, mono = true, dot = false }) {
  const map = {
    ok:    { bg: 'var(--ok-soft)',     fg: 'var(--ok)' },
    warn:  { bg: 'var(--warn-soft)',   fg: 'var(--warn)' },
    alert: { bg: 'var(--alert-soft)',  fg: 'var(--alert)' },
    accent:{ bg: 'var(--accent-soft)', fg: 'var(--accent)' },
    cyan:  { bg: 'var(--accent-2-soft)', fg: 'var(--accent-2)' },
    muted: { bg: 'rgba(255,255,255,0.05)', fg: 'var(--text-2)' },
  };
  const c = map[status] || map.muted;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 7px', background: c.bg, color: c.fg,
      borderRadius: 4, fontFamily: mono ? 'var(--mono)' : 'var(--sans)',
      fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap',
    }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.fg }} />}
      {children}
    </span>
  );
}

function PAStat({ label, value, unit, sub, color = 'var(--text-1)', size = 'md' }) {
  const sizes = { sm: { value: 16, unit: 10, label: 10 }, md: { value: 22, unit: 11, label: 10 }, lg: { value: 32, unit: 12, label: 11 }, xl: { value: 44, unit: 14, label: 11 } };
  const s = sizes[size];
  return (
    <div>
      {label && <div style={{ fontFamily: 'var(--mono)', fontSize: s.label, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, color }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: s.value, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontFamily: 'var(--mono)', fontSize: s.unit, color: 'var(--text-3)', letterSpacing: '0.02em' }}>{unit}</span>}
      </div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function PACard({ children, style = {}, padded = true, onClick }) {
  return (
    <div onClick={onClick} style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 14, padding: padded ? 14 : 0, cursor: onClick ? 'pointer' : 'default', ...style }}>
      {children}
    </div>
  );
}

function PANova({ score = 1, compact = false }) {
  const colors = ['var(--ok)', 'var(--ok)', 'var(--warn)', 'var(--alert)'];
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center', flexShrink: 0 }}>
      {[1,2,3,4].map(n => {
        const active = n === score;
        return (
          <div key={n} style={{ width: compact ? 14 : 22, height: compact ? 5 : 7, borderRadius: 2, background: active ? colors[n-1] : 'rgba(255,255,255,0.08)' }}>
            {active && !compact && (
              <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 2, fontFamily: 'var(--mono)', fontSize: 9, color: colors[n-1] }}>{n}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PASection({ title, action, code, children, style = {} }) {
  return (
    <div style={{ marginBottom: 14, ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8, padding: '0 2px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{title}</span>
          {code && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>{code}</span>}
        </div>
        {action && <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>{action}</span>}
      </div>
      {children}
    </div>
  );
}

function PAStatusBar({ time = '09:41' }) {
  return (
    <div className="status-bar">
      <span style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 500, letterSpacing: '-0.02em' }}>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', opacity: 0.92 }}>
        <svg width="16" height="10" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill="currentColor"/>
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill="currentColor"/>
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill="currentColor"/>
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill="currentColor"/>
        </svg>
        <svg width="14" height="10" viewBox="0 0 17 12">
          <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill="currentColor"/>
          <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill="currentColor"/>
          <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor"/>
        </svg>
        <svg width="22" height="11" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="currentColor" strokeOpacity="0.4" fill="none"/>
          <rect x="2" y="2" width="17" height="9" rx="2" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
}

function PATabBar({ active, onChange }) {
  const tabs = [
    { id: 'capture', label: 'Capturer', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 8a2 2 0 012-2h2l1.5-2h7L17 6h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
        <circle cx="12" cy="13" r="3.5"/>
      </svg>
    )},
    { id: 'today', label: "Aujourd'hui", icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="16" rx="2"/>
        <path d="M8 3v4M16 3v4M3 10h18"/>
      </svg>
    )},
    { id: 'stats', label: 'Stats', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>
      </svg>
    )},
    { id: 'profile', label: 'Profil', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
      </svg>
    )},
  ];
  return (
    <div className="tab-bar">
      {tabs.map(t => (
        <div key={t.id} className="tab-item"
          onClick={() => onChange && onChange(t.id)}
          style={{ color: active === t.id ? 'var(--accent)' : 'var(--text-3)' }}>
          {t.icon}
          <span className="tab-label">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { PARing, PASpark, PABar, PAPill, PAStat, PACard, PANova, PASection, PAStatusBar, PATabBar });
