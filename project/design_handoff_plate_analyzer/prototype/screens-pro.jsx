// Plate Analyzer — Pro mode screens (Standard pack)
// 5 écrans : Détail patient · Comparaison périodes · Notes cliniques · Compte-rendu PDF · Partage sécurisé

// ─── shared: patient header strip ──────────────
function PatientStrip({ name = 'M. Bernard, 58 ans', tag = 'HTA · DT2 · Cholestérolémie', meta = '47 analyses · suivi depuis 02/2025', back = true, action }) {
  return (
    <div style={{ padding: '8px 16px 14px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
      {back && (
        <button style={{
          width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)',
          color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: 'var(--bg-raised)', border: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)',
        flexShrink: 0,
      }}>{name.split(' ')[0][0]}{name.split(' ')[1][0]}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{tag}</span>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', marginTop: 2 }}>{meta}</div>
      </div>
      {action}
    </div>
  );
}

// ─── 1. Patient Detail ─────────────────────────
function ScreenPatientDetail() {
  return (
    <div>
      <PatientStrip
        action={
          <button style={{
            width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)',
            color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="2" cy="7" r="1" fill="currentColor"/><circle cx="7" cy="7" r="1" fill="currentColor"/><circle cx="12" cy="7" r="1" fill="currentColor"/></svg>
          </button>
        }
      />

      {/* tab nav clinique */}
      <div style={{ display: 'flex', gap: 0, padding: '8px 16px 0', borderBottom: '1px solid var(--line)' }}>
        {[
          { l: 'Suivi', a: true },
          { l: 'Comparer', s: '6 mois' },
          { l: 'Notes', s: '8' },
          { l: 'Partage', s: '1 actif' },
        ].map((t, i) => (
          <div key={i} style={{
            padding: '8px 12px',
            borderBottom: t.a ? '1.5px solid var(--accent)' : '1.5px solid transparent',
            color: t.a ? 'var(--text-1)' : 'var(--text-3)',
            display: 'flex', alignItems: 'center', gap: 5,
            cursor: 'pointer',
            marginBottom: -1,
          }}>
            <span style={{ fontSize: 12, fontWeight: 500 }}>{t.l}</span>
            {t.s && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>{t.s}</span>}
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 16px 24px' }}>
        {/* clinical context card */}
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--line)',
          borderRadius: 12, padding: 14, marginBottom: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Contexte clinique</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Modifier</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { l: 'HbA1c', v: '7.2', u: '%', sub: 'mar. 04', c: 'var(--warn)' },
              { l: 'LDL-c', v: '1.42', u: 'g/L', sub: 'mar. 04', c: 'var(--warn)' },
              { l: 'IMC', v: '29.4', u: '', sub: 'surpoids', c: 'var(--warn)' },
              { l: 'TA', v: '142/88', u: 'mmHg', sub: 'à domicile', c: 'var(--alert)' },
            ].map((b, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{b.l}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 500, color: b.c, letterSpacing: '-0.02em' }}>{b.v}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{b.u}</span>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', marginTop: 2 }}>{b.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, paddingTop: 10, marginTop: 10, borderTop: '1px solid var(--line)' }}>
            {[
              ['Metformine', '1000mg ×2'],
              ['Atorvastatine', '20mg'],
              ['Ramipril', '5mg'],
            ].map((m, i) => (
              <div key={i} style={{ padding: '3px 7px', background: 'var(--bg-canvas)', border: '1px solid var(--line)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 10, color: 'var(--text-1)' }}>{m[0]}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{m[1]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* score 30j + comparatif S-1 */}
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--line)',
          borderRadius: 14, padding: 14, marginBottom: 12,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 130, height: 130, background: 'radial-gradient(circle, rgba(251,191,36,0.10), transparent 70%)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, position: 'relative' }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Score 30j · vs M−1</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>Dernière analyse il y a 2j</div>
            </div>
            <PAPill status="warn" dot>À surveiller</PAPill>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
            <PARing value={64} target={100} size={86} stroke={6} color="var(--warn)">
              <div style={{ fontFamily: 'var(--mono)', fontSize: 24, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>64</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-3)', marginTop: 3, letterSpacing: '0.08em' }}>/ 100</div>
            </PARing>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 500, color: 'var(--alert)' }}>− 4 pts</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>vs 30j précédents (68)</span>
              </div>
              <PASpark values={[68,67,70,66,64,62,58,60,62,64,66,64]} w={170} h={28} color="var(--warn)" />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>
                <span>10 avr.</span><span>12 mai</span>
              </div>
            </div>
          </div>
        </div>

        {/* clinical signals */}
        <PASection title="Signaux cliniques · 14 j" code="déviations seuils">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <ClinicalSignal status="alert" l="Sel quotidien" v="7.2 g/j" delta="× 1.4 cible" sub="> 5 g/j sur 11 / 14 jours · risque HTA aggravé" />
            <ClinicalSignal status="warn" l="NOVA agrégé" v="2.8 / 4" delta="+ 0.4 vs S-1" sub="Plats préparés en hausse (dîner principalement)" />
            <ClinicalSignal status="ok" l="Activité photo" v="3.4 / j" delta="stable" sub="Excellente observance · Camille engagée" />
          </div>
        </PASection>

        {/* recent meals */}
        <PASection title="Derniers repas" action="Voir tout" code="14 / 47">
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { t: '12 · 13:14', n: 'Pizza surgelée 4 fromages', k: 720, nova: 4, s: 'alert', note: true },
              { t: '12 · 08:32', n: 'Croissant + café', k: 280, nova: 3, s: 'warn' },
              { t: '11 · 19:48', n: 'Cassoulet (boîte)', k: 642, nova: 4, s: 'alert' },
              { t: '11 · 12:30', n: 'Salade composée maison', k: 480, nova: 1, s: 'ok' },
            ].map((m, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px',
                borderBottom: i < 3 ? '1px solid var(--line)' : 'none',
                borderLeft: `2px solid ${m.s === 'alert' ? 'var(--alert)' : m.s === 'warn' ? 'var(--warn)' : 'var(--ok)'}`,
              }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', width: 50 }}>{m.t}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {m.n}
                    {m.note && (
                      <svg width="10" height="10" viewBox="0 0 14 14" style={{ flexShrink: 0, color: 'var(--accent)' }}>
                        <path d="M2 4h10M2 7h10M2 10h7" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                    )}
                  </div>
                </div>
                <PANova score={m.nova} compact />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-1)', width: 40, textAlign: 'right' }}>{m.k}</span>
              </div>
            ))}
          </div>
        </PASection>

        {/* objectifs prescrits */}
        <PASection title="Objectifs prescrits" code="3 / 5 sur 30j">
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '4px 0' }}>
            {[
              { l: 'Sel < 5 g/j', ok: false, m: '3 / 14 j', drug: 'HTA' },
              { l: 'NOVA < 2.5', ok: false, m: '5 / 14 j', drug: 'DT2' },
              { l: 'Fibres ≥ 25 g/j', ok: true, m: '11 / 14 j', drug: 'DT2' },
              { l: 'Glucides < 200 g/j', ok: true, m: '12 / 14 j', drug: 'DT2' },
              { l: 'Poisson gras 2×/sem', ok: true, m: '4× en 4 sem', drug: 'LDL' },
            ].map((o, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px', borderBottom: i < 4 ? '1px solid var(--line)' : 'none' }}>
                <div style={{
                  width: 14, height: 14, borderRadius: 3,
                  background: o.ok ? 'var(--ok-soft)' : 'var(--alert-soft)',
                  border: `1px solid ${o.ok ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: o.ok ? 'var(--ok)' : 'var(--alert)',
                  fontFamily: 'var(--mono)', fontSize: 9,
                }}>{o.ok ? '✓' : '×'}</div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12 }}>{o.l}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-4)', padding: '1px 4px', background: 'var(--bg-canvas)', borderRadius: 3, textTransform: 'uppercase' }}>{o.drug}</span>
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>{o.m}</span>
              </div>
            ))}
          </div>
        </PASection>

        {/* action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 12 }}>
          {[
            { l: 'Note', icon: 'note' },
            { l: 'PDF', icon: 'pdf' },
            { l: 'Partager', icon: 'share', accent: true },
          ].map((b, i) => (
            <button key={i} style={{
              padding: '11px 8px',
              background: b.accent ? 'var(--accent)' : 'var(--bg-surface)',
              color: b.accent ? '#0a0d12' : 'var(--text-1)',
              border: b.accent ? 'none' : '1px solid var(--line)',
              borderRadius: 10,
              fontSize: 12, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              cursor: 'pointer',
              fontFamily: 'var(--sans)',
            }}>
              <ActionIcon name={b.icon} />
              {b.l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClinicalSignal({ status, l, v, delta, sub }) {
  const colors = { ok: 'var(--ok)', warn: 'var(--warn)', alert: 'var(--alert)' };
  return (
    <div style={{
      background: 'var(--bg-surface)', border: '1px solid var(--line)',
      borderLeft: `2px solid ${colors[status]}`,
      borderRadius: 6, padding: '10px 12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 500 }}>{l}</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500, color: colors[status] }}>{v}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{delta}</span>
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}

function ActionIcon({ name }) {
  const s = { width: 14, height: 14, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 };
  if (name === 'note') return <svg {...s} viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>;
  if (name === 'pdf') return <svg {...s} viewBox="0 0 24 24"><path d="M6 2h10l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M14 2v6h6"/><path d="M8 13h2a1.5 1.5 0 010 3H8z"/></svg>;
  if (name === 'share') return <svg {...s} viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></svg>;
  return null;
}

// ─── 2. Patient Compare (avant/après) ─────────
function ScreenPatientCompare() {
  return (
    <div>
      <PatientStrip />
      <div style={{ display: 'flex', gap: 0, padding: '8px 16px 0', borderBottom: '1px solid var(--line)' }}>
        {[
          { l: 'Suivi' },
          { l: 'Comparer', a: true, s: '6 mois' },
          { l: 'Notes', s: '8' },
          { l: 'Partage', s: '1 actif' },
        ].map((t, i) => (
          <div key={i} style={{
            padding: '8px 12px',
            borderBottom: t.a ? '1.5px solid var(--accent)' : '1.5px solid transparent',
            color: t.a ? 'var(--text-1)' : 'var(--text-3)',
            display: 'flex', alignItems: 'center', gap: 5,
            marginBottom: -1,
          }}>
            <span style={{ fontSize: 12, fontWeight: 500 }}>{t.l}</span>
            {t.s && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>{t.s}</span>}
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 16px 24px' }}>
        {/* period picker */}
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--line)',
          borderRadius: 12, padding: 12, marginBottom: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Comparer 2 périodes</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', textTransform: 'uppercase' }}>Préset · post-intervention</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 24px 1fr', gap: 6, alignItems: 'center' }}>
            <PeriodChip label="AVANT" date="01–28 fév." color="var(--text-2)" />
            <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--text-4)' }}>→</div>
            <PeriodChip label="APRÈS" date="15 avr. – 12 mai" color="var(--accent)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', marginTop: 12, background: 'var(--bg-canvas)', border: '1px solid var(--line)', borderRadius: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Intervention</span>
            <span style={{ fontSize: 11, color: 'var(--text-1)', flex: 1 }}>Régime méditerranéen + éducation thérapeutique</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>14 mars</span>
          </div>
        </div>

        {/* score comparison hero */}
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--line)',
          borderRadius: 16, padding: 16, marginBottom: 12,
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14, textAlign: 'center' }}>Score nutritionnel global</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <PARing value={51} target={100} size={70} stroke={5} color="var(--text-2)">
                <div style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 500, letterSpacing: '-0.04em', color: 'var(--text-2)' }}>51</div>
              </PARing>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 6 }}>Avant</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 500, color: 'var(--ok)', letterSpacing: '-0.02em' }}>+ 13</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>pts · p &lt; 0.05</span>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <PARing value={64} target={100} size={88} stroke={6} color="var(--accent)">
                <div style={{ fontFamily: 'var(--mono)', fontSize: 26, fontWeight: 500, letterSpacing: '-0.04em' }}>64</div>
              </PARing>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 6 }}>Après</div>
            </div>
          </div>
        </div>

        {/* indicators side-by-side table */}
        <PASection title="Indicateurs · médiane journalière" code="11 mesures">
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
            {/* header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 64px 64px 50px',
              padding: '8px 12px',
              borderBottom: '1px solid var(--line)',
              fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              background: 'var(--bg-raised)',
            }}>
              <span>Indicateur</span>
              <span style={{ textAlign: 'right' }}>Avant</span>
              <span style={{ textAlign: 'right' }}>Après</span>
              <span style={{ textAlign: 'right' }}>Δ</span>
            </div>
            {[
              { l: 'Sel · g/j', cible: '< 5', a: '8.4', b: '7.2', d: '−14%', good: true },
              { l: 'AGS · g/j', cible: '< 16.7', a: '24.1', b: '18.6', d: '−23%', good: true },
              { l: 'Sucres libres · g/j', cible: '< 50', a: '62', b: '38', d: '−39%', good: true },
              { l: 'Fibres · g/j', cible: '≥ 25', a: '16', b: '24', d: '+50%', good: true },
              { l: 'NOVA · agrégé', cible: '< 2.5', a: '3.2', b: '2.4', d: '−25%', good: true },
              { l: 'ω-6 / ω-3', cible: '< 5', a: '8.4', b: '6.1', d: '−27%', good: true },
              { l: 'Poisson gras · /sem', cible: '≥ 2', a: '0.4', b: '1.6', d: '+300%', good: true },
              { l: 'Kcal · j', cible: '~2 200', a: '2 480', b: '2 110', d: '−15%', good: true },
            ].map((r, i, arr) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 64px 64px 50px',
                padding: '9px 12px', borderBottom: i < arr.length-1 ? '1px solid var(--line)' : 'none',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-1)' }}>{r.l}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', marginTop: 1 }}>cible {r.cible}</div>
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-3)', textAlign: 'right' }}>{r.a}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-1)', fontWeight: 500, textAlign: 'right' }}>{r.b}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: r.good ? 'var(--ok)' : 'var(--alert)', textAlign: 'right' }}>{r.d}</span>
              </div>
            ))}
          </div>
        </PASection>

        {/* trends overlay */}
        <PASection title="Évolution superposée" code="score · 6 mois">
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
            <CompareChart />
            <div style={{ display: 'flex', gap: 14, paddingTop: 10, marginTop: 8, borderTop: '1px solid var(--line)' }}>
              <Legend2 c="var(--text-2)" l="Avant intervention" v="51" sub="médiane" />
              <Legend2 c="var(--accent)" l="Après intervention" v="64" sub="médiane" />
            </div>
          </div>
        </PASection>

        {/* clinical takeaway */}
        <PASection title="Synthèse clinique" code="IA-assistée · à valider">
          <div style={{
            padding: 14,
            background: 'linear-gradient(135deg, rgba(196,181,253,0.06), transparent)',
            border: '1px solid var(--accent-line)',
            borderRadius: 12,
          }}>
            <div style={{ fontSize: 12, color: 'var(--text-1)', lineHeight: 1.55, marginBottom: 12 }}>
              Amélioration significative sur 8/8 indicateurs ciblés. <b style={{ color: 'var(--ok)' }}>Score +25% en 2 mois</b>. Profil ω-6/ω-3 revenu à un seuil acceptable. Apport en sel reste au-dessus de la recommandation OMS.
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{
                flex: 1, padding: '9px 12px',
                background: 'var(--accent)', color: '#0a0d12', border: 'none', borderRadius: 8,
                fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--sans)',
              }}>Inclure au CR PDF</button>
              <button style={{
                padding: '9px 12px',
                background: 'transparent', color: 'var(--text-2)',
                border: '1px solid var(--line-strong)', borderRadius: 8,
                fontSize: 12, fontFamily: 'var(--sans)',
              }}>Reformuler</button>
            </div>
          </div>
        </PASection>
      </div>
    </div>
  );
}

function PeriodChip({ label, date, color }) {
  return (
    <div style={{
      padding: '10px 10px',
      background: 'var(--bg-canvas)',
      border: `1px solid ${color === 'var(--accent)' ? 'var(--accent-line)' : 'var(--line)'}`,
      borderRadius: 8,
    }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>{label}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-1)' }}>{date}</div>
    </div>
  );
}

function CompareChart() {
  // 24 weekly points; before = first 12, after = last 12
  const before = [48, 50, 47, 52, 49, 51, 48, 50, 53, 51, 49, 52];
  const after = [55, 53, 58, 56, 60, 62, 61, 63, 64, 65, 63, 66];
  const W = 290, H = 110;
  const allPts = [...before, ...after];
  const min = 40, max = 75;
  const stepX = W / (allPts.length - 1);
  const toY = v => H - ((v - min) / (max - min)) * H;
  const dBefore = before.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * stepX},${toY(v)}`).join(' ');
  const offset = before.length - 1;
  const dAfter = after.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i + offset) * stepX},${toY(v)}`).join(' ');
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 18}`} style={{ display: 'block' }}>
      {/* horizontal grid */}
      {[40, 50, 60, 70].map(y => (
        <g key={y}>
          <line x1="0" y1={toY(y)} x2={W} y2={toY(y)} stroke="rgba(255,255,255,0.04)" />
          <text x="0" y={toY(y) - 2} fill="var(--text-4)" fontSize="8" fontFamily="var(--mono)">{y}</text>
        </g>
      ))}
      {/* intervention line */}
      <line x1={offset * stepX} y1="0" x2={offset * stepX} y2={H} stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <text x={offset * stepX + 3} y="10" fill="var(--accent)" fontSize="8" fontFamily="var(--mono)" textTransform="uppercase">14 mars</text>
      {/* before */}
      <path d={dBefore} stroke="var(--text-2)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      {/* after */}
      <path d={dAfter} stroke="var(--accent)" strokeWidth="1.75" fill="none" strokeLinejoin="round" />
      {/* dot on last */}
      <circle cx={(allPts.length - 1) * stepX} cy={toY(after[after.length-1])} r="2.5" fill="var(--accent)" />
      {/* axis */}
      <text x="0" y={H + 14} fill="var(--text-4)" fontSize="8" fontFamily="var(--mono)">Fév.</text>
      <text x={W/2 - 10} y={H + 14} fill="var(--text-4)" fontSize="8" fontFamily="var(--mono)">Mars</text>
      <text x={W - 22} y={H + 14} fill="var(--text-4)" fontSize="8" fontFamily="var(--mono)">Mai</text>
    </svg>
  );
}

function Legend2({ c, l, v, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 12, height: 2, background: c, borderRadius: 1 }} />
      <div>
        <div style={{ fontSize: 11, color: 'var(--text-1)' }}>{l}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500, color: c }}>{v}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{sub}</span>
        </div>
      </div>
    </div>
  );
}

// ─── 3. Clinical Notes timeline ────────────────
function ScreenClinicalNotes() {
  return (
    <div>
      <PatientStrip
        action={
          <button style={{
            padding: '6px 10px', background: 'var(--accent)', color: '#0a0d12',
            border: 'none', borderRadius: 7, fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>+ Note</button>
        }
      />
      <div style={{ display: 'flex', gap: 0, padding: '8px 16px 0', borderBottom: '1px solid var(--line)' }}>
        {[
          { l: 'Suivi' },
          { l: 'Comparer', s: '6 mois' },
          { l: 'Notes', a: true, s: '8' },
          { l: 'Partage', s: '1 actif' },
        ].map((t, i) => (
          <div key={i} style={{
            padding: '8px 12px',
            borderBottom: t.a ? '1.5px solid var(--accent)' : '1.5px solid transparent',
            color: t.a ? 'var(--text-1)' : 'var(--text-3)',
            display: 'flex', alignItems: 'center', gap: 5,
            marginBottom: -1,
          }}>
            <span style={{ fontSize: 12, fontWeight: 500 }}>{t.l}</span>
            {t.s && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>{t.s}</span>}
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 16px 24px' }}>
        {/* filter chips */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
          {[
            { l: 'Toutes', n: 8, a: true },
            { l: 'Intervention', n: 2, c: 'var(--accent)' },
            { l: 'Observation', n: 4, c: 'var(--accent-2)' },
            { l: 'Éducation', n: 1, c: 'var(--ok)' },
            { l: 'Objectif', n: 1, c: 'var(--warn)' },
          ].map((c, i) => (
            <div key={i} style={{
              padding: '5px 9px',
              background: c.a ? 'var(--accent-soft)' : 'var(--bg-surface)',
              border: `1px solid ${c.a ? 'var(--accent-line)' : 'var(--line)'}`,
              borderRadius: 6,
              display: 'flex', alignItems: 'center', gap: 5,
              whiteSpace: 'nowrap',
            }}>
              {c.c && !c.a && <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.c }} />}
              <span style={{ fontSize: 11, color: c.a ? 'var(--accent)' : 'var(--text-2)', fontWeight: 500 }}>{c.l}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: c.a ? 'var(--accent)' : 'var(--text-4)' }}>{c.n}</span>
            </div>
          ))}
        </div>

        {/* timeline */}
        <div style={{ position: 'relative', paddingLeft: 16 }}>
          {/* vertical line */}
          <div style={{ position: 'absolute', left: 5, top: 8, bottom: 8, width: 1, background: 'var(--line-strong)' }} />

          <Note
            d="14 mars 2026 · 10:24"
            tag="Intervention" tagColor="var(--accent)"
            t="Prescription régime méditerranéen"
            body="Mise en place du régime méditerranéen suite au bilan lipidique. Objectif LDL < 1.30 g/L à 3 mois. Recommandation EPA+DHA ≥ 250 mg/j (poisson gras 2×/sem). Rappel des sources : sardines, maquereau, saumon, huile de colza."
            objectives={['LDL < 1.30', 'AGS < 16.7 g/j', 'Poisson gras 2×/sem']}
          />
          <Note
            d="22 mars 2026 · 14:10"
            tag="Observation" tagColor="var(--accent-2)"
            t="Première semaine d'adhérence"
            body="Score 53 → 58 sur 7j. Patient remplace pain blanc par pain complet, ajoute légumes verts à 70% des dîners. Difficulté persistante sur l'apport en poisson : refus du saumon (texture)."
            linkedMeal={{ name: 'Salade quinoa-thon', score: 78 }}
          />
          <Note
            d="01 avril 2026 · 11:45"
            tag="Éducation" tagColor="var(--ok)"
            t="Atelier lecture étiquettes"
            body="Patient a appris à identifier les ultra-transformés via la liste d'ingrédients (>5 ingrédients + additifs). Compréhension validée sur 4 produits-tests."
          />
          <Note
            d="14 avril 2026 · 09:30"
            tag="Objectif" tagColor="var(--warn)"
            t="Réviser objectif sel"
            body="Échec objectif sel < 5 g/j (médiane 6.8 g/j sur 4 sem). Cause identifiée : pain et plats préparés du soir. Nouvel objectif : remplacer 4 dîners industriels / sem. par recettes maison."
            objectives={['Sel < 6 g/j (transitoire)', '4 dîners maison/sem']}
            isLast
          />
        </div>

        {/* compose stub */}
        <div style={{
          marginTop: 16,
          background: 'var(--bg-surface)',
          border: '1px dashed var(--line-strong)',
          borderRadius: 12, padding: 12,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7, background: 'var(--accent-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
            fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 500,
          }}>+</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500 }}>Ajouter une note clinique</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>Lier à une analyse · ajouter des objectifs · tag</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Note({ d, tag, tagColor, t, body, objectives, linkedMeal, isLast }) {
  return (
    <div style={{ position: 'relative', marginBottom: isLast ? 0 : 14 }}>
      {/* dot */}
      <div style={{
        position: 'absolute', left: -16, top: 6,
        width: 11, height: 11, borderRadius: '50%',
        background: 'var(--bg-canvas)',
        border: `2px solid ${tagColor}`,
      }} />
      <div style={{
        background: 'var(--bg-surface)', border: '1px solid var(--line)',
        borderRadius: 10, padding: 12,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              padding: '2px 6px', background: 'rgba(255,255,255,0.04)',
              borderRadius: 3,
              fontFamily: 'var(--mono)', fontSize: 9, color: tagColor,
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>{tag}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>{d}</span>
          </div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, letterSpacing: '-0.01em' }}>{t}</div>
        <div style={{ fontSize: 11.5, color: 'var(--text-2)', lineHeight: 1.55 }}>{body}</div>
        {objectives && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: 4 }}>Objectifs</span>
            {objectives.map((o, i) => (
              <span key={i} style={{
                padding: '2px 6px', background: 'var(--bg-canvas)', border: '1px solid var(--line)',
                borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--text-1)',
              }}>{o}</span>
            ))}
          </div>
        )}
        {linkedMeal && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--line)',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Lié</span>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '3px 8px', background: 'var(--bg-canvas)', border: '1px solid var(--line)', borderRadius: 6,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--ok)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-1)' }}>{linkedMeal.name}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ok)' }}>{linkedMeal.score}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 4. PDF Report Preview ─────────────────────
function ScreenPDFReport() {
  return (
    <div>
      {/* dark chrome bar */}
      <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em' }}>Compte-rendu nutritionnel</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', marginTop: 1 }}>2 pages · 384 ko · v 1</div>
        </div>
        <button style={{ padding: '6px 10px', background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 7, color: 'var(--text-2)', fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Éditer</button>
      </div>

      {/* page selector */}
      <div style={{ display: 'flex', gap: 4, padding: '10px 16px', borderBottom: '1px solid var(--line)', background: 'var(--bg-canvas)' }}>
        {[1, 2].map(p => (
          <div key={p} style={{
            padding: '3px 9px',
            background: p === 1 ? 'var(--accent-soft)' : 'transparent',
            border: `1px solid ${p === 1 ? 'var(--accent-line)' : 'var(--line)'}`,
            borderRadius: 4,
            fontFamily: 'var(--mono)', fontSize: 10,
            color: p === 1 ? 'var(--accent)' : 'var(--text-3)',
          }}>p. {p}</div>
        ))}
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', alignSelf: 'center' }}>A4 · zoom 35%</span>
      </div>

      {/* paper page */}
      <div style={{ padding: 16, background: 'var(--bg-canvas)' }}>
        <div style={{
          background: '#f7f4ee', color: '#1a1f28',
          borderRadius: 4,
          padding: '20px 18px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
          fontSize: 9,
          lineHeight: 1.4,
          minHeight: 480,
          fontFamily: '"Inter", system-ui, sans-serif',
          position: 'relative',
        }}>
          {/* header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #cdc7bb', paddingBottom: 10, marginBottom: 10 }}>
            <div>
              <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 7, color: '#6a6a6a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Compte-rendu nutritionnel</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2, letterSpacing: '-0.01em' }}>M. Bernard, 58 ans</div>
              <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 7, color: '#6a6a6a', marginTop: 2 }}>NIP 048392 · 14/03 – 12/05/2026 · 2 mois</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: 'linear-gradient(135deg, #6b5ad6, #4a9bcf)', marginLeft: 'auto' }} />
              <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 7, color: '#6a6a6a', marginTop: 3, textTransform: 'uppercase' }}>Dr. B. Hansel</div>
              <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 7, color: '#6a6a6a' }}>Endocrinologie · AP-HP</div>
            </div>
          </div>

          {/* synthesis */}
          <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 7, color: '#6a6a6a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Synthèse</div>
          <div style={{ fontSize: 9, marginBottom: 12, lineHeight: 1.5 }}>
            Amélioration significative sur l'ensemble des 8 indicateurs ciblés suite à l'instauration du régime méditerranéen le 14/03. Score nutritionnel composite <b>+25%</b> (51 → 64) en 2 mois. Profil ω-6/ω-3 revenu à un seuil acceptable (8.4 → 6.1). Apport en sel reste au-dessus de la recommandation OMS — objectif révisé.
          </div>

          {/* score block */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1, padding: 8, background: '#ebe6da', borderRadius: 3 }}>
              <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 7, color: '#6a6a6a', textTransform: 'uppercase' }}>Score · avant</div>
              <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 18, fontWeight: 600, color: '#6a6a6a' }}>51</div>
            </div>
            <div style={{ flex: 1, padding: 8, background: '#ebe6da', borderRadius: 3 }}>
              <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 7, color: '#6a6a6a', textTransform: 'uppercase' }}>Score · après</div>
              <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 18, fontWeight: 600, color: '#1a1f28' }}>64</div>
            </div>
            <div style={{ flex: 1, padding: 8, background: '#dceadc', borderRadius: 3 }}>
              <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 7, color: '#3a6b3a', textTransform: 'uppercase' }}>Delta</div>
              <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 18, fontWeight: 600, color: '#3a6b3a' }}>+13 pts</div>
            </div>
          </div>

          {/* indicators mini-table */}
          <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 7, color: '#6a6a6a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Indicateurs clés (médiane / jour)</div>
          <div style={{ border: '1px solid #cdc7bb', borderRadius: 3, overflow: 'hidden' }}>
            {[
              ['Sel · g', '8.4', '7.2', '−14%', false],
              ['AGS · g', '24.1', '18.6', '−23%', true],
              ['Sucres libres · g', '62', '38', '−39%', true],
              ['Fibres · g', '16', '24', '+50%', true],
              ['NOVA agrégé', '3.2', '2.4', '−25%', true],
              ['ω-6 / ω-3', '8.4', '6.1', '−27%', true],
            ].map((r, i, arr) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 50px 50px 50px',
                padding: '4px 6px',
                borderBottom: i < arr.length - 1 ? '1px solid #ebe6da' : 'none',
                fontSize: 8,
                background: i % 2 ? '#f0ece1' : 'transparent',
              }}>
                <span>{r[0]}</span>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', textAlign: 'right', color: '#888' }}>{r[1]}</span>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', textAlign: 'right', fontWeight: 600 }}>{r[2]}</span>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', textAlign: 'right', color: r[4] ? '#3a6b3a' : '#a05050', fontWeight: 600 }}>{r[3]}</span>
              </div>
            ))}
          </div>

          {/* footer */}
          <div style={{
            position: 'absolute', bottom: 10, left: 18, right: 18,
            display: 'flex', justifyContent: 'space-between',
            fontFamily: '"IBM Plex Mono", monospace', fontSize: 6,
            color: '#9a9a9a', textTransform: 'uppercase', letterSpacing: '0.08em',
            paddingTop: 6, borderTop: '1px solid #cdc7bb',
          }}>
            <span>Généré le 12/05/2026 · Plate Analyzer v 0.9.2</span>
            <span>1 / 2</span>
          </div>
        </div>
      </div>

      {/* sections toggle */}
      <div style={{ padding: '4px 16px 14px' }}>
        <PASection title="Sections incluses" code="5 / 7">
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '4px 0' }}>
            {[
              { l: 'Identité + contexte clinique', on: true },
              { l: 'Synthèse + score composite', on: true },
              { l: 'Tableau indicateurs (8)', on: true },
              { l: 'Graphique évolution superposée', on: true },
              { l: 'Notes cliniques (sélection)', on: true, sub: '3 / 8 notes' },
              { l: 'Détail nutrimentaire (39)', on: false },
              { l: 'Annexe scientifique (sources)', on: false },
            ].map((s, i, arr) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 14px',
                borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{
                  width: 26, height: 14, borderRadius: 8,
                  background: s.on ? 'var(--accent)' : 'var(--bg-canvas)',
                  border: `1px solid ${s.on ? 'var(--accent-line)' : 'var(--line-strong)'}`,
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: 1, left: s.on ? 13 : 1,
                    width: 10, height: 10, borderRadius: '50%',
                    background: s.on ? '#0a0d12' : 'var(--text-3)',
                  }} />
                </div>
                <span style={{ flex: 1, fontSize: 12 }}>{s.l}</span>
                {s.sub && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{s.sub}</span>}
              </div>
            ))}
          </div>
        </PASection>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <button style={{
            padding: '13px 12px', background: 'var(--bg-surface)', color: 'var(--text-1)',
            border: '1px solid var(--line-strong)', borderRadius: 10,
            fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--sans)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <ActionIcon name="pdf" /> Télécharger
          </button>
          <button style={{
            padding: '13px 12px', background: 'var(--accent)', color: '#0a0d12',
            border: 'none', borderRadius: 10,
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--sans)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <ActionIcon name="share" /> Partager
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 5. Secure Share ───────────────────────────
function ScreenSecureShare() {
  return (
    <div>
      <PatientStrip />
      <div style={{ display: 'flex', gap: 0, padding: '8px 16px 0', borderBottom: '1px solid var(--line)' }}>
        {[
          { l: 'Suivi' },
          { l: 'Comparer', s: '6 mois' },
          { l: 'Notes', s: '8' },
          { l: 'Partage', a: true, s: '1 actif' },
        ].map((t, i) => (
          <div key={i} style={{
            padding: '8px 12px',
            borderBottom: t.a ? '1.5px solid var(--accent)' : '1.5px solid transparent',
            color: t.a ? 'var(--text-1)' : 'var(--text-3)',
            display: 'flex', alignItems: 'center', gap: 5,
            marginBottom: -1,
          }}>
            <span style={{ fontSize: 12, fontWeight: 500 }}>{t.l}</span>
            {t.s && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>{t.s}</span>}
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 16px 24px' }}>
        {/* generated link card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(196,181,253,0.06), transparent)',
          border: '1px solid var(--accent-line)',
          borderRadius: 14, padding: 14, marginBottom: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)', boxShadow: '0 0 6px var(--ok)' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ok)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Lien actif</span>
            <span style={{ flex: 1 }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>Expire dans 6j 14h</span>
          </div>
          {/* link */}
          <div style={{
            padding: 10,
            background: 'var(--bg-canvas)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 8,
            marginBottom: 10,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.5"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>
            <span style={{
              flex: 1, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-1)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              letterSpacing: '-0.02em',
            }}>plate.app/s/<span style={{ color: 'var(--accent)' }}>k7m9-x2pq-4nzj</span></span>
            <button style={{
              padding: '4px 9px', background: 'var(--accent)', color: '#0a0d12',
              border: 'none', borderRadius: 5,
              fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>Copier</button>
          </div>
          {/* QR + meta */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 12 }}>
            <QRCode />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <ShareMeta l="Destinataire" v="cardiologue.dupont@aphp.fr" mono />
                <ShareMeta l="Contenu" v="CR mai 2026 · 2 pages" />
                <ShareMeta l="Chiffrement" v="AES-256 · TLS 1.3" mono />
                <ShareMeta l="Consenti par" v="M. Bernard · 12/05 10:14" />
              </div>
            </div>
          </div>
        </div>

        {/* new share config */}
        <PASection title="Nouveau lien" code="config">
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
            {/* scope */}
            <ConfigBlock label="Périmètre">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                <ScopeOpt label="Dernier CR" sub="2 pages" />
                <ScopeOpt label="Période" sub="14/03 – 12/05" active />
                <ScopeOpt label="Suivi complet" sub="6 mois · 47 anal." />
              </div>
            </ConfigBlock>

            {/* expiry */}
            <ConfigBlock label="Expiration">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                <ScopeOpt label="24 h" />
                <ScopeOpt label="7 j" active />
                <ScopeOpt label="30 j" />
                <ScopeOpt label="Usage unique" />
              </div>
            </ConfigBlock>

            {/* security */}
            <ConfigBlock label="Sécurité">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <ToggleRow label="Code PIN à la première ouverture" sub="6 chiffres · partagé hors-bande" on />
                <ToggleRow label="Notification à chaque ouverture" sub="vous + le patient" on />
                <ToggleRow label="Téléchargement autorisé" sub="le destinataire peut sauvegarder le PDF" />
                <ToggleRow label="Consentement patient requis" sub="conforme RGPD article 9" on locked />
              </div>
            </ConfigBlock>

            <button style={{
              width: '100%', marginTop: 12,
              padding: '12px', background: 'var(--accent)', color: '#0a0d12',
              border: 'none', borderRadius: 10,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--sans)',
            }}>Générer le lien sécurisé</button>
          </div>
        </PASection>

        {/* history */}
        <PASection title="Historique des partages" code="12 mois · 5 liens">
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { dest: 'cardiologue.dupont@aphp.fr', date: '12 mai', status: 'actif', open: 1, color: 'var(--ok)' },
              { dest: 'dieteticienne.cabinet@…', date: '02 avr.', status: 'expiré', open: 3, color: 'var(--text-3)' },
              { dest: 'medecin.traitant@…', date: '14 mars', status: 'expiré', open: 2, color: 'var(--text-3)' },
              { dest: 'patient · auto', date: '02 fév.', status: 'expiré', open: 1, color: 'var(--text-3)' },
            ].map((h, i, arr) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px',
                borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: h.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.dest}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', marginTop: 2 }}>{h.date} · {h.open} ouverture{h.open > 1 ? 's' : ''}</div>
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: h.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h.status}</span>
              </div>
            ))}
          </div>
        </PASection>
      </div>
    </div>
  );
}

function QRCode() {
  // pseudo QR — 11x11 grid
  const seed = [
    '11111110.111',
    '10000010.001',
    '10111010.101',
    '10111010.111',
    '10111010.011',
    '10000010.101',
    '11111110.111',
    '........101',
    '11.01.110.0',
    '10101.10101',
    '01.10010.11',
    '11111110.111',
    '10000011.10',
    '10111010110',
  ];
  return (
    <div style={{
      width: 76, height: 76, padding: 4,
      background: '#fff', borderRadius: 6,
      display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: 1,
    }}>
      {Array.from({length: 14 * 11}).map((_, i) => {
        const row = Math.floor(i / 11);
        const col = i % 11;
        const s = seed[row] || '';
        const fill = s[col] === '1';
        return <div key={i} style={{ width: '100%', aspectRatio: '1', background: fill ? '#000' : 'transparent' }} />;
      })}
    </div>
  );
}

function ShareMeta({ l, v, mono }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</span>
      <span style={{ fontFamily: mono ? 'var(--mono)' : 'var(--sans)', fontSize: 10, color: 'var(--text-1)', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v}</span>
    </div>
  );
}

function ConfigBlock({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

function ScopeOpt({ label, sub, active }) {
  return (
    <div style={{
      padding: '8px 6px',
      background: active ? 'var(--accent-soft)' : 'var(--bg-canvas)',
      border: `1px solid ${active ? 'var(--accent-line)' : 'var(--line)'}`,
      borderRadius: 6, textAlign: 'center',
      cursor: 'pointer',
    }}>
      <div style={{ fontSize: 11, fontWeight: 500, color: active ? 'var(--accent)' : 'var(--text-1)' }}>{label}</div>
      {sub && <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-3)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function ToggleRow({ label, sub, on, locked }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 0',
      borderBottom: '1px solid var(--line)',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: 'var(--text-1)' }}>{label}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', marginTop: 2 }}>{sub}{locked && ' · verrouillé'}</div>
      </div>
      <div style={{
        width: 28, height: 16, borderRadius: 9,
        background: on ? 'var(--accent)' : 'var(--bg-canvas)',
        border: `1px solid ${on ? 'var(--accent-line)' : 'var(--line-strong)'}`,
        position: 'relative', opacity: locked ? 0.6 : 1,
      }}>
        <div style={{
          position: 'absolute', top: 1, left: on ? 13 : 1,
          width: 12, height: 12, borderRadius: '50%',
          background: on ? '#0a0d12' : 'var(--text-3)',
        }} />
      </div>
    </div>
  );
}

Object.assign(window, { ScreenPatientDetail, ScreenPatientCompare, ScreenClinicalNotes, ScreenPDFReport, ScreenSecureShare });
