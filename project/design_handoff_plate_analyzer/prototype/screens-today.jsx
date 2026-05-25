// Plate Analyzer — Today dashboard, Capture, Loading

// ─── Today dashboard ────────────────────────
function ScreenToday({ dense = false }) {
  return (
    <div style={{ padding: '8px 16px 24px' }}>
      {/* date nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 0 18px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Aujourd'hui · J−0</div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2 }}>Lun. 12 mai</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* hero composite card */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--line)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* subtle bg accent */}
        <div style={{
          position: 'absolute', top: -20, right: -20, width: 140, height: 140,
          background: 'radial-gradient(circle, rgba(196,181,253,0.10), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, position: 'relative' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Score nutritionnel</div>
          <PAPill status="ok" dot>Bon</PAPill>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18, position: 'relative' }}>
          <PARing value={78} target={100} size={96} stroke={6} color="var(--accent)">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>78</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', marginTop: 3, letterSpacing: '0.08em' }}>/ 100</div>
          </PARing>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { l: 'NOVA moyen', v: '2.1', sub: 'modéré', c: 'var(--warn)' },
              { l: 'Hansel', v: '2.3', sub: '/ 3', c: 'var(--ok)' },
              { l: 'Équilibre', v: '83%', sub: 'macros', c: 'var(--accent-2)' },
            ].map((x, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: i < 2 ? '1px solid var(--line)' : 'none', paddingBottom: i < 2 ? 6 : 0 }}>
                <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{x.l}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 500, color: x.c }}>{x.v}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{x.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* kcal hero */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--line)',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Énergie · Kcal</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-4)' }}>cible 2 148</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 36, fontWeight: 500, letterSpacing: '-0.03em' }}>1 487</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text-3)' }}>kcal</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)' }}>−661</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>restant</span>
        </div>
        <PABar value={1487} target={2148} max={2400} color="var(--accent)" height={6} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
          {[
            { l: 'Protéines', v: '72', u: 'g', pct: 19, c: 'var(--accent)', t: 90 },
            { l: 'Glucides',  v: '182', u: 'g', pct: 49, c: 'var(--accent-2)', t: 235 },
            { l: 'Lipides',   v: '54', u: 'g', pct: 33, c: 'var(--warn)', t: 75 },
          ].map((m, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{m.l}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>{m.v}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>{m.u}</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 9, color: m.c }}>{m.pct}%</span>
              </div>
              <PABar value={Number(m.v)} target={m.t} max={m.t * 1.3} color={m.c} height={3} />
            </div>
          ))}
        </div>
      </div>

      {/* indicators grid */}
      <PASection title="Indicateurs · vs OMS / PNNS" action={dense ? 'Réduire' : 'Détail'} code="J−0">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Indicator label="Sel" code="NaCl" v="4.2" u="g" target="5.0" status="warn" pct={84} sub="↑ 84% · 0.8g restants" />
          <Indicator label="AG saturés" code="AGS" v="14.7" u="g" target="16.7" status="ok" pct={88} sub="cible adaptée" />
          <Indicator label="Sucres libres" code="GS" v="42" u="g" target="50" status="ok" pct={84} sub="—" />
          <Indicator label="Fibres" code="FA" v="18" u="g" target="30" status="warn" pct={60} sub="↓ 12g manquants" />
        </div>
        {dense && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
            <Indicator label="Cholestérol" code="C" v="184" u="mg" target="300" status="ok" pct={61} sub="—" />
            <Indicator label="Sodium" code="Na" v="1 680" u="mg" target="2 000" status="ok" pct={84} sub="—" />
          </div>
        )}
      </PASection>

      {/* omega card */}
      <PASection title="Acides gras essentiels" code="ANSES · ≤ 5:1">
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--line)',
          borderRadius: 12,
          padding: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Ratio ω-6 / ω-3</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em' }}>6.4</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--text-3)' }}>: 1</span>
              </div>
            </div>
            <PAPill status="warn" dot>Attention</PAPill>
          </div>

          {/* visual ratio scale */}
          <div style={{ position: 'relative', height: 22, marginBottom: 12 }}>
            <div style={{ position: 'absolute', top: 9, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--ok) 0%, var(--ok) 33%, var(--warn) 50%, var(--alert) 100%)', borderRadius: 2 }} />
            {/* target tick */}
            <div style={{ position: 'absolute', top: 4, left: '33%', width: 1, height: 14, background: 'rgba(255,255,255,0.4)' }}>
              <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>5:1</div>
            </div>
            {/* current */}
            <div style={{ position: 'absolute', top: 1, left: '45%', width: 2, height: 20, background: 'var(--text-1)', borderRadius: 1 }}>
              <div style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-1)' }}>●</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, paddingTop: 10, borderTop: '1px solid var(--line)' }}>
            <MicroStat l="ALA" v="1.8" u="g" t="1.6" ok />
            <MicroStat l="EPA+DHA" v="0.18" u="g" t="0.50" warn />
            <MicroStat l="AL · ω-6" v="11.5" u="g" t="—" />
          </div>
        </div>
      </PASection>

      {/* meals */}
      <PASection title="Repas du jour" action="+ Ajouter" code="3 · 1 487 kcal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Meal time="08:14" name="Tartines avocat + œuf" kcal={412} nova={2} hansel={2} thumb="ok" />
          <Meal time="12:48" name="Salade quinoa-feta" kcal={628} nova={2} hansel={3} thumb="cyan" />
          <Meal time="16:22" name="Pomme + amandes" kcal={228} nova={1} hansel={3} thumb="warm" />
          <Meal placeholder label="Dîner" />
        </div>
      </PASection>

      {/* alerts */}
      <PASection title="Alertes · cumul du jour">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Alert status="warn" title="Sel 4.2 / 5 g" sub="Limite restante : 0.8 g. Évitez plats préparés ce soir." />
          <Alert status="alert" title="EPA+DHA insuffisants" sub="Aucun poisson gras depuis 6 jours. Cible 0.50 g/j." />
          <Alert status="muted" title="Fibres en retard" sub="+12 g requis. Suggestion : légumineuses au dîner." />
        </div>
      </PASection>

      {/* capture CTA */}
      <button style={{
        width: '100%',
        marginTop: 8,
        padding: '14px 16px',
        background: 'var(--accent)',
        color: '#0a0d12',
        border: 'none', borderRadius: 12,
        fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        fontFamily: 'var(--sans)',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 8a2 2 0 012-2h2l1.5-2h7L17 6h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
          <circle cx="12" cy="13" r="3.5"/>
        </svg>
        Analyser une nouvelle assiette
      </button>
    </div>
  );
}

function Indicator({ label, code, v, u, target, status, pct, sub }) {
  const colors = { ok: 'var(--ok)', warn: 'var(--warn)', alert: 'var(--alert)' };
  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--line)',
      borderRadius: 10,
      padding: 11,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>{code}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 6 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em', color: colors[status] }}>{v}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>{u}</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>/ {target}</span>
      </div>
      <PABar value={pct} target={100} max={100} color={colors[status]} showTick={false} height={2} />
      {sub && <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

function MicroStat({ l, v, u, t, ok, warn }) {
  const c = ok ? 'var(--ok)' : warn ? 'var(--warn)' : 'var(--text-1)';
  return (
    <div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{l}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 500, color: c }}>{v}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{u}</span>
      </div>
      {t !== '—' && (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', marginTop: 2 }}>cible {t}</div>
      )}
    </div>
  );
}

function Meal({ time, name, kcal, nova, hansel, thumb, placeholder, label }) {
  if (placeholder) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: 10,
        background: 'transparent',
        border: '1px dashed var(--line-strong)',
        borderRadius: 10,
        color: 'var(--text-3)',
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, border: '1px dashed var(--line-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)' }}>+</div>
        <div style={{ flex: 1, fontSize: 12 }}>{label}</div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-4)' }}>à venir</span>
      </div>
    );
  }
  const thumbColors = { ok: 'var(--ok)', cyan: 'var(--accent-2)', warm: 'var(--accent)' };
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: 8,
      background: 'var(--bg-surface)',
      border: '1px solid var(--line)',
      borderRadius: 10,
    }}>
      {/* thumb (placeholder) */}
      <div style={{
        width: 38, height: 38, borderRadius: 8,
        background: 'var(--bg-raised)',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `repeating-linear-gradient(45deg, ${thumbColors[thumb]}22 0 6px, transparent 6px 12px)`,
        }} />
        <div style={{
          position: 'absolute', bottom: 2, left: 2, fontFamily: 'var(--mono)', fontSize: 7,
          color: thumbColors[thumb], opacity: 0.7,
        }}>IMG</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>{time}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>·</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-2)' }}>{kcal} kcal</span>
          <PANova score={nova} compact />
        </div>
      </div>
      <svg width="6" height="10" viewBox="0 0 6 10" style={{ flexShrink: 0, opacity: 0.4 }}><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
    </div>
  );
}

function Alert({ status, title, sub }) {
  const colors = { ok: 'var(--ok)', warn: 'var(--warn)', alert: 'var(--alert)', muted: 'var(--text-2)' };
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: '10px 12px',
      background: 'var(--bg-surface)',
      border: '1px solid var(--line)',
      borderLeft: `2px solid ${colors[status]}`,
      borderRadius: 6,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>{sub}</div>
      </div>
    </div>
  );
}

// ─── Capture viewfinder ──────────────────────
function ScreenCapture() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}>
      {/* viewfinder placeholder (food photo) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 45%, #2a2418 0%, #0e0a06 60%, #000 100%)',
      }}>
        {/* fake plate */}
        <div style={{
          position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 260, height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #5a4530, #2a1f12)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 0 0 8px rgba(255,255,255,0.04)',
        }}>
          {/* fake food shapes */}
          <div style={{ position: 'absolute', top: '20%', left: '15%', width: 100, height: 70, borderRadius: 30, background: '#7d8a3a', opacity: 0.6 }} />
          <div style={{ position: 'absolute', top: '15%', right: '10%', width: 60, height: 60, borderRadius: '50%', background: '#c97843', opacity: 0.55 }} />
          <div style={{ position: 'absolute', bottom: '15%', left: '25%', width: 130, height: 50, borderRadius: 20, background: '#a06845', opacity: 0.5 }} />
        </div>

        {/* tip strip */}
        <div style={{
          position: 'absolute', top: 100, left: 16, right: 16,
          padding: '10px 12px',
          background: 'rgba(11,14,19,0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Conseil</div>
          <div style={{ flex: 1, fontSize: 12, color: 'var(--text-1)' }}>Cadrez l'assiette à plat. Lumière naturelle.</div>
        </div>

        {/* corner brackets */}
        {[
          { top: 180, left: 30 }, { top: 180, right: 30 },
          { bottom: 220, left: 30 }, { bottom: 220, right: 30 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 24, height: 24,
            borderTop: pos.top ? '1.5px solid var(--accent)' : 'none',
            borderBottom: pos.bottom ? '1.5px solid var(--accent)' : 'none',
            borderLeft: pos.left ? '1.5px solid var(--accent)' : 'none',
            borderRight: pos.right ? '1.5px solid var(--accent)' : 'none',
            ...pos,
          }} />
        ))}

        {/* grid overlay */}
        <div style={{
          position: 'absolute', top: 200, left: 30, right: 30, bottom: 240,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '33.33% 33.33%',
          pointerEvents: 'none',
        }} />

        {/* live readout */}
        <div style={{
          position: 'absolute', top: 160, right: 16,
          padding: '6px 10px',
          background: 'rgba(11,14,19,0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 6,
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>EXPO</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)' }}>ƒ/1.8</div>
        </div>

        {/* bottom controls */}
        <div style={{
          position: 'absolute', bottom: 50, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
        }}>
          {/* gallery */}
          <button style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--text-1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="5" width="18" height="14" rx="2"/>
              <circle cx="8.5" cy="11" r="2"/>
              <path d="M3 17l5-5 4 4 3-3 6 6"/>
            </svg>
          </button>
          {/* shutter */}
          <div style={{
            width: 76, height: 76, borderRadius: '50%',
            background: 'transparent',
            border: '3px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <div style={{
              width: 62, height: 62, borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 30px rgba(196,181,253,0.4)',
            }} />
            <div style={{
              position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
              fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)',
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>Capturer</div>
          </div>
          {/* flash */}
          <button style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--text-1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L4 13h6l-1 9 9-11h-6l1-9z"/>
            </svg>
          </button>
        </div>

        {/* close */}
        <button style={{
          position: 'absolute', top: 56, left: 16,
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(11,14,19,0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'var(--text-1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
      </div>
    </div>
  );
}

// ─── Loading / pipeline ──────────────────────
function ScreenLoading() {
  const Step = ({ n, l, sub, status, color = 'var(--accent)' }) => {
    const isDone = status === 'done';
    const isActive = status === 'active';
    const c = isDone ? 'var(--ok)' : isActive ? color : 'var(--text-4)';
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, position: 'relative' }}>
        {/* dot + line */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: isActive ? `${color}26` : isDone ? 'var(--ok-soft)' : 'var(--bg-surface)',
            border: `1.5px solid ${isActive || isDone ? c : 'var(--line-strong)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: c, fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
            position: 'relative', zIndex: 2,
          }}>
            {isDone ? '✓' : n}
            {isActive && (
              <div style={{
                position: 'absolute', inset: -6, borderRadius: '50%',
                border: `1.5px solid ${color}`,
                animation: 'paPulse 1.6s ease-out infinite',
              }} />
            )}
          </div>
          {n < 4 && (
            <div style={{
              width: 1, flex: 1, minHeight: 36,
              background: isDone ? c : 'var(--line)',
              marginTop: 4, marginBottom: 4,
            }} />
          )}
        </div>
        {/* content */}
        <div style={{ flex: 1, paddingTop: 1, paddingBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: isActive || isDone ? 'var(--text-1)' : 'var(--text-3)' }}>{l}</span>
            {isActive && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: c, textTransform: 'uppercase', letterSpacing: '0.08em' }}>en cours</span>}
            {isDone && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: c }}>·</span>}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3, fontFamily: 'var(--mono)' }}>{sub}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      padding: '24px 24px 32px',
      background: 'var(--bg-canvas)',
    }}>
      <style>{`
        @keyframes paPulse {
          0% { transform: scale(0.85); opacity: 0.8; }
          80%, 100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes paScan {
          0% { transform: translateY(0); }
          50% { transform: translateY(180px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* header */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Analyse en cours</div>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 4 }}>Pipeline scientifique</div>
      </div>

      {/* photo preview with scan line */}
      <div style={{
        height: 200, borderRadius: 14,
        background: 'radial-gradient(circle at 50% 45%, #5a4530, #1a120a)',
        border: '1px solid var(--line-strong)',
        marginBottom: 28, position: 'relative', overflow: 'hidden',
      }}>
        {/* fake food */}
        <div style={{
          position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)',
          width: 140, height: 140, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #5a4530, #2a1f12)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
        }}>
          <div style={{ position: 'absolute', top: '18%', left: '15%', width: 50, height: 38, borderRadius: 18, background: '#7d8a3a', opacity: 0.6 }} />
          <div style={{ position: 'absolute', top: '15%', right: '10%', width: 32, height: 32, borderRadius: '50%', background: '#c97843', opacity: 0.55 }} />
        </div>
        {/* scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0,
          height: 2, top: 0,
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          boxShadow: '0 0 12px rgba(196,181,253,0.6)',
          animation: 'paScan 2.4s ease-in-out infinite',
        }} />
        {/* detection chips */}
        <div style={{ position: 'absolute', top: 12, left: 12, padding: '3px 7px', background: 'rgba(11,14,19,0.7)', border: '1px solid var(--accent-line)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)' }}>quinoa · 87%</div>
        <div style={{ position: 'absolute', top: 36, right: 12, padding: '3px 7px', background: 'rgba(11,14,19,0.7)', border: '1px solid var(--accent-2-line)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent-2)' }}>feta · 92%</div>
      </div>

      {/* pipeline */}
      <div style={{ flex: 1 }}>
        <Step n={1} l="Vision IA · Gemini 2.5 Flash" sub="Identification aliments · 4.2 s" status="done" />
        <Step n={2} l="Matching CIQUAL" sub="Embeddings · 3 185 candidats · 1.8 s" status="done" />
        <Step n={3} l="LLM Chooser" sub="Sélection finale + portions · est. 2.5 s" status="active" />
        <Step n={4} l="Scoring + persist" sub="NOVA · Hansel · OMS · Postgres" status="pending" />
      </div>

      {/* footer */}
      <div style={{
        marginTop: 16, paddingTop: 14,
        borderTop: '1px solid var(--line)',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)',
      }}>
        <span>~8.5 s / ~12 s</span>
        <span style={{ color: 'var(--text-4)' }}>Annuler</span>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenToday, ScreenCapture, ScreenLoading });
