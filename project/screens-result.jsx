// Plate Analyzer — Analysis Result screen
// Shows: hero (plat global + macros) · aliments editable · NOVA · indicators · ω-6/ω-3 · warnings

function ScreenResult({ dense = false }) {
  return (
    <div style={{ padding: '8px 16px 24px' }}>
      {/* back + meta */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0 16px' }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'transparent', border: 'none',
          color: 'var(--text-2)', fontSize: 12, padding: 0, cursor: 'pointer',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Aujourd'hui
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>12:48 · 12 mai</span>
          <button style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="2" cy="7" r="1" fill="currentColor"/><circle cx="7" cy="7" r="1" fill="currentColor"/><circle cx="12" cy="7" r="1" fill="currentColor"/></svg>
          </button>
        </div>
      </div>

      {/* hero: image + plat global */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--line)',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 12,
      }}>
        {/* image */}
        <div style={{
          height: 140, position: 'relative',
          background: 'radial-gradient(circle at 50% 50%, #5a4530, #1a120a)',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 110, height: 110, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #5a4530, #2a1f12)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
          }}>
            <div style={{ position: 'absolute', top: '20%', left: '15%', width: 40, height: 30, borderRadius: 14, background: '#7d8a3a', opacity: 0.7 }} />
            <div style={{ position: 'absolute', top: '15%', right: '12%', width: 28, height: 28, borderRadius: '50%', background: '#c97843', opacity: 0.65 }} />
            <div style={{ position: 'absolute', bottom: '15%', left: '25%', width: 50, height: 22, borderRadius: 10, background: '#a06845', opacity: 0.6 }} />
          </div>
          {/* corner badges */}
          <div style={{ position: 'absolute', top: 10, left: 10, padding: '3px 8px', background: 'rgba(11,14,19,0.7)', backdropFilter: 'blur(10px)', border: '1px solid var(--accent-line)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)' }}>SCAN · 11.4 s</div>
          <div style={{ position: 'absolute', top: 10, right: 10, padding: '3px 8px', background: 'rgba(11,14,19,0.7)', backdropFilter: 'blur(10px)', border: '1px solid var(--line)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-2)' }}>EDIT</div>
        </div>

        {/* plat global + kcal */}
        <div style={{ padding: 14 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Plat détecté</div>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 12, lineHeight: 1.25 }}>Salade quinoa · feta · concombre · pois chiches</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
            {[
              { l: 'Kcal', v: '628', u: 'kcal', big: true },
              { l: 'P', v: '32', u: 'g', c: 'var(--accent)' },
              { l: 'G', v: '74', u: 'g', c: 'var(--accent-2)' },
              { l: 'L', v: '22', u: 'g', c: 'var(--warn)' },
              { l: 'Poids', v: '485', u: 'g' },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: i === 0 ? 'left' : 'left' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{m.l}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: m.big ? 18 : 15, fontWeight: 500, letterSpacing: '-0.02em', color: m.c || 'var(--text-1)' }}>{m.v}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{m.u}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* aliments — editable list */}
      <PASection title="Aliments détectés" code="6 · CIQUAL" action="+ ajouter">
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--line)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          <FoodRow name="Quinoa cuit" ciqual="9520" conf={94} qty={120} kcal={144} nova={1} ok />
          <FoodRow name="Feta" ciqual="12410" conf={92} qty={45} kcal={119} nova={3} warn />
          <FoodRow name="Concombre cru" ciqual="20009" conf={89} qty={90} kcal={14} nova={1} ok />
          <FoodRow name="Pois chiches cuits" ciqual="20524" conf={86} qty={80} kcal={130} nova={1} ok />
          <FoodRow name="Huile d'olive vierge" ciqual="17130" conf={71} qty={12} kcal={106} nova={1} edit ok />
          <FoodRow name="Menthe fraîche" ciqual="11020" conf={64} qty={5} kcal={2} nova={1} warn last />
        </div>
        {/* uncertainty banner */}
        <div style={{
          marginTop: 8,
          padding: '8px 12px',
          background: 'var(--warn-soft)',
          border: '1px solid rgba(251,191,36,0.25)',
          borderRadius: 8,
          fontSize: 11, color: 'var(--warn)', lineHeight: 1.4,
          display: 'flex', alignItems: 'flex-start', gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v4M7 9.5v0.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <span><b style={{ color: 'var(--warn)', fontWeight: 600 }}>2 aliments avec faible confiance.</b> <span style={{ color: 'var(--text-2)' }}>Estimations visuelles ±15–30%. Validez ou corrigez les portions.</span></span>
        </div>
      </PASection>

      {/* NOVA agrégé */}
      <PASection title="Classification NOVA" code="Monteiro · OMS">
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--line)',
          borderRadius: 12,
          padding: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Score agrégé · pondéré g</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em' }}>1.4</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)' }}>/ 4</span>
              </div>
            </div>
            <PAPill status="ok" dot>Bon</PAPill>
          </div>

          {/* stacked bar */}
          <div style={{ position: 'relative', height: 22, borderRadius: 4, overflow: 'hidden', display: 'flex', marginBottom: 8 }}>
            <div style={{ width: '76%', background: 'var(--ok)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 6, color: '#0a0d12', fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600 }}>76%</div>
            <div style={{ width: '14%', background: 'var(--accent-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0d12', fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600 }}>14</div>
            <div style={{ width: '10%', background: 'var(--warn)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0d12', fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600 }}>10</div>
            <div style={{ width: '0%', background: 'var(--alert)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            {[
              { c: 'var(--ok)', l: '1 · Bruts', p: '76%' },
              { c: 'var(--accent-2)', l: '2 · Culinaire', p: '14%' },
              { c: 'var(--warn)', l: '3 · Transformés', p: '10%' },
              { c: 'var(--alert)', l: '4 · Ultra-tr.', p: '0%' },
            ].map((g, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                <span style={{ display: 'inline-block', width: 10, height: 2, background: g.c, borderRadius: 1 }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{g.l}</span>
              </div>
            ))}
          </div>
        </div>
      </PASection>

      {/* indicators */}
      <PASection title="Indicateurs · part repas (30% AJR)" code="OMS / PNNS">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Indic2 l="Sel" v="1.2" u="g" cap="1.5" pct={80} status="warn" />
          <Indic2 l="AG saturés" v="6.1" u="g" cap="7.0" pct={87} status="warn" />
          <Indic2 l="Sucres libres" v="7.4" u="g" cap="15" pct={49} status="ok" />
          <Indic2 l="Cholestérol" v="42" u="mg" cap="100" pct={42} status="ok" />
          <Indic2 l="Fibres" v="9.8" u="g" cap="8" pct={122} status="ok" target />
          <Indic2 l="Eau" v="358" u="g" cap="—" status="ok" noBar />
        </div>
      </PASection>

      {/* omega profile */}
      <PASection title="Profil ω-6 / ω-3" code="ANSES">
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--line)',
          borderRadius: 12, padding: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Ratio</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 24, fontWeight: 500, color: 'var(--ok)' }}>3.8</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-3)' }}>: 1</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>cible ≤ 5 : 1</div>
            </div>
            <PAPill status="ok" dot>Excellent</PAPill>
          </div>

          {/* visualization: two bars side-by-side */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60, marginBottom: 10, position: 'relative' }}>
            {/* baseline */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: 'var(--line)' }} />
            <Bar label="AL" v="1.42" u="g" h={42} c="var(--accent-2)" />
            <Bar label="ALA" v="0.38" u="g" h={20} c="var(--accent)" />
            <Bar label="EPA" v="0.02" u="g" h={3} c="var(--accent)" muted />
            <Bar label="DHA" v="0.04" u="g" h={4} c="var(--accent)" muted />
            <div style={{ flex: 1 }} />
            {/* legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, background: 'var(--accent-2)', borderRadius: 1 }} /><span style={{ color: 'var(--text-2)' }}>ω-6</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: 1 }} /><span style={{ color: 'var(--text-2)' }}>ω-3</span></div>
            </div>
          </div>

          <div style={{ paddingTop: 10, borderTop: '1px solid var(--line)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5 }}>
            EPA+DHA (0.06 g) faible. Poisson gras 2×/semaine recommandé.
          </div>
        </div>
      </PASection>

      {/* Hansel rules */}
      <PASection title="Règles Hansel · par aliment" code="3 / 3">
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--line)',
          borderRadius: 12, padding: '12px 14px',
        }}>
          {[
            { l: 'Ratio P/L ≥ 1', ok: true, sub: '1.45 — protéines suffisantes vs lipides' },
            { l: 'Glucides < 20% du poids', ok: true, sub: '15.3% — quinoa modéré' },
            { l: 'NOVA ≤ 3', ok: true, sub: '1.4 — peu de transformés' },
          ].map((r, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '7px 0',
              borderBottom: i < 2 ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: 3, marginTop: 1,
                background: r.ok ? 'var(--ok-soft)' : 'var(--alert-soft)',
                border: `1px solid ${r.ok ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: r.ok ? 'var(--ok)' : 'var(--alert)',
                fontFamily: 'var(--mono)', fontSize: 10, flexShrink: 0,
              }}>{r.ok ? '✓' : '×'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{r.l}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </PASection>

      {/* vitamins / minerals (detail mode) */}
      {dense && (
        <PASection title="Vitamines & minéraux" code="22 nutriments">
          <div style={{
            background: 'var(--bg-surface)', border: '1px solid var(--line)',
            borderRadius: 12, padding: 12,
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {[
                { l: 'B9', v: '142', u: 'µg', pct: 71, ok: true },
                { l: 'B12', v: '0.4', u: 'µg', pct: 16, warn: true },
                { l: 'D', v: '0.2', u: 'µg', pct: 4, alert: true },
                { l: 'C', v: '18', u: 'mg', pct: 22 },
                { l: 'Fer', v: '4.2', u: 'mg', pct: 30 },
                { l: 'Ca', v: '215', u: 'mg', pct: 27 },
                { l: 'Mg', v: '112', u: 'mg', pct: 30 },
                { l: 'K', v: '690', u: 'mg', pct: 20 },
              ].map((m, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.l}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginTop: 2 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: m.alert ? 'var(--alert)' : m.warn ? 'var(--warn)' : 'var(--text-1)' }}>{m.v}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-4)' }}>{m.u}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-4)', marginTop: 1 }}>{m.pct}% AJR</div>
                </div>
              ))}
            </div>
          </div>
        </PASection>
      )}

      {/* warnings */}
      <div style={{
        padding: '12px 14px',
        background: 'var(--bg-canvas)',
        border: '1px dashed var(--line-strong)',
        borderRadius: 10,
        marginTop: 12,
        fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5,
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Avertissements scientifiques</div>
        <div style={{ marginBottom: 4 }}>• Reconnaissance visuelle automatique, marge d'erreur 15-30% sur portions.</div>
        <div style={{ marginBottom: 4 }}>• Données AG essentiels couvrent 58% de la base CIQUAL.</div>
        <div>• Plate Analyzer n'est pas un dispositif médical.</div>
      </div>
    </div>
  );
}

// ─── sub-components ────────────────────────────

function FoodRow({ name, ciqual, conf, qty, kcal, nova, ok, warn, last, edit }) {
  const confColor = conf > 85 ? 'var(--ok)' : conf > 70 ? 'var(--warn)' : 'var(--alert)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 12px',
      borderBottom: last ? 'none' : '1px solid var(--line)',
    }}>
      <PANova score={nova} compact />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
          {edit && <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--accent)', textTransform: 'uppercase' }}>modifié</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>CIQUAL · {ciqual}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: confColor }}>conf {conf}%</span>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, justifyContent: 'flex-end' }}>
          <input style={{
            width: 36, padding: '2px 4px',
            background: 'var(--bg-canvas)',
            border: '1px solid var(--line-strong)',
            borderRadius: 4,
            color: 'var(--text-1)',
            fontFamily: 'var(--mono)', fontSize: 12,
            textAlign: 'right',
          }} defaultValue={qty} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>g</span>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 3 }}>{kcal} kcal</div>
      </div>
    </div>
  );
}

function Indic2({ l, v, u, cap, pct, status, target, noBar }) {
  const colors = { ok: 'var(--ok)', warn: 'var(--warn)', alert: 'var(--alert)' };
  return (
    <div style={{
      background: 'var(--bg-surface)', border: '1px solid var(--line)',
      borderRadius: 10, padding: 11,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 500 }}>{l}</span>
        {cap !== '—' && (
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>{target ? '⌃ cible' : '/ ' + cap}</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: noBar ? 0 : 6 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 17, fontWeight: 500, color: colors[status] }}>{v}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{u}</span>
      </div>
      {!noBar && pct !== undefined && (
        <PABar value={Math.min(pct, 100)} target={100} max={100} color={colors[status]} showTick={false} height={2} />
      )}
    </div>
  );
}

function Bar({ label, v, u, h, c, muted }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: muted ? 0.6 : 1 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-2)' }}>{v}</span>
      <div style={{ width: 22, height: h, background: c, borderRadius: 2 }} />
      <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{label}</span>
    </div>
  );
}

Object.assign(window, { ScreenResult });
