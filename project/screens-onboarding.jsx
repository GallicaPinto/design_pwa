// Plate Analyzer — Onboarding screens (3 screens)
// Welcome • Demographics • Goals & restrictions

const { useState: useStateOB } = React;

// shared chrome
function OBChrome({ step, total, title, sub, children, primary, primaryLabel, secondary }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      padding: '20px 24px 32px',
    }}>
      {/* progress dots + step counter */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 36,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({length: total}).map((_, i) => (
            <div key={i} style={{
              width: i === step ? 22 : 6, height: 4, borderRadius: 2,
              background: i <= step ? 'var(--accent)' : 'rgba(255,255,255,0.10)',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'var(--text-3)', letterSpacing: '0.1em',
        }}>{String(step+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em',
          lineHeight: 1.15, marginBottom: 10,
        }}>{title}</div>
        {sub && (
          <div style={{
            fontSize: 14, color: 'var(--text-2)', lineHeight: 1.5,
            marginBottom: 28,
          }}>{sub}</div>
        )}
        {children}
      </div>

      {secondary && (
        <div style={{
          textAlign: 'center', fontSize: 12, color: 'var(--text-3)',
          marginBottom: 14,
        }}>{secondary}</div>
      )}
      <button style={{
        background: 'var(--accent)', color: '#0a0d12',
        border: 'none', borderRadius: 12, padding: '15px 20px',
        fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
        cursor: 'pointer', fontFamily: 'var(--sans)',
      }}>{primaryLabel || 'Continuer'}</button>
    </div>
  );
}

// ─── 1. Welcome ──────────────────────────────
function ScreenWelcome() {
  return (
    <OBChrome step={0} total={4} title="Photographiez ce que vous mangez." sub="Plate Analyzer extrait 39 nutriments de chaque assiette grâce à la base CIQUAL et un scoring scientifique multidimensionnel." secondary="En continuant, vous acceptez les CGU et la politique de confidentialité. Plate Analyzer n'est pas un dispositif médical.">
      {/* brand mark */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 36px' }}>
        <div style={{
          width: 84, height: 84, borderRadius: 22,
          background: 'linear-gradient(135deg, rgba(196,181,253,0.18), rgba(125,211,252,0.10))',
          border: '1px solid var(--accent-line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="14" stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="6" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1.2" />
            <circle cx="20" cy="20" r="2" fill="var(--accent)" />
          </svg>
        </div>
      </div>

      {/* feature list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
        {[
          { c: 'var(--accent)', t: 'CIQUAL — ANSES', s: '3 185 aliments référencés' },
          { c: 'var(--accent-2)', t: 'NOVA + Hansel', s: 'Scoring de transformation' },
          { c: 'var(--ok)', t: 'Indicateurs OMS / PNNS', s: 'Sel, AGS, sucres, ω-6/ω-3' },
          { c: 'var(--text-2)', t: 'Mode professionnel', s: 'Suivi patient · export PDF' },
        ].map((f, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 14px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--line)',
            borderRadius: 10,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: f.c }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{f.t}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>{f.s}</div>
            </div>
          </div>
        ))}
      </div>
    </OBChrome>
  );
}

// ─── 2. Demographics ────────────────────────
function ScreenDemographics() {
  const Field = ({ label, value, unit, suffix, mono = true }) => (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--line)',
      borderRadius: 10,
      padding: '12px 14px',
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
    }}>
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 10,
        color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>{label}</span>
      <div>
        <span style={{ fontFamily: mono ? 'var(--mono)' : 'var(--sans)', fontSize: 16, fontWeight: 500 }}>{value}</span>
        {unit && <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)', marginLeft: 4 }}>{unit}</span>}
      </div>
    </div>
  );

  return (
    <OBChrome step={1} total={4} title="Caractéristiques." sub="Pour ajuster les seuils journaliers à votre profil. Tout peut être modifié plus tard.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <Field label="Âge" value="34" unit="ans" />
        <Field label="Sexe" value="Femme" mono={false} />
        <Field label="Taille" value="168" unit="cm" />
        <Field label="Poids" value="62.4" unit="kg" />
      </div>

      {/* activity selector */}
      <div style={{
        background: 'var(--bg-surface)', border: '1px solid var(--line)',
        borderRadius: 10, padding: 12, marginBottom: 18,
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'var(--text-3)', textTransform: 'uppercase',
          letterSpacing: '0.08em', marginBottom: 10,
        }}>Activité physique</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
          {[
            { id: 'sed', l: 'Sédent.', m: '×1.20' },
            { id: 'leg', l: 'Légère', m: '×1.37' },
            { id: 'mod', l: 'Modéré', m: '×1.55', a: true },
            { id: 'int', l: 'Intense', m: '×1.73' },
          ].map(o => (
            <div key={o.id} style={{
              padding: 8,
              background: o.a ? 'var(--accent-soft)' : 'var(--bg-raised)',
              border: `1px solid ${o.a ? 'var(--accent-line)' : 'var(--line)'}`,
              borderRadius: 6, textAlign: 'center',
            }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: o.a ? 'var(--accent)' : 'var(--text-1)' }}>{o.l}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', marginTop: 2 }}>{o.m}</div>
            </div>
          ))}
        </div>
      </div>

      {/* derived */}
      <div style={{
        padding: '14px 14px 16px',
        background: 'linear-gradient(135deg, rgba(196,181,253,0.06), transparent)',
        border: '1px solid var(--accent-line)',
        borderRadius: 10,
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9,
          color: 'var(--accent)', textTransform: 'uppercase',
          letterSpacing: '0.12em', marginBottom: 10,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>Calculé · Mifflin-St Jeor</span>
          <span style={{ color: 'var(--text-4)' }}>auto</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em' }}>22.1</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>IMC <span style={{ color: 'var(--ok)' }}>normal</span></div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em' }}>1 386 <span style={{ fontSize: 10, color: 'var(--text-3)' }}>kcal</span></div>
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>Métabolisme base</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em' }}>2 148 <span style={{ fontSize: 10, color: 'var(--text-3)' }}>kcal</span></div>
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>Cible journalière</div>
          </div>
        </div>
      </div>
    </OBChrome>
  );
}

// ─── 3. Goals & restrictions ────────────────
function ScreenGoals() {
  const Chip = ({ label, active, status }) => (
    <div style={{
      padding: '8px 12px',
      background: active ? 'var(--accent-soft)' : 'var(--bg-surface)',
      border: `1px solid ${active ? 'var(--accent-line)' : 'var(--line)'}`,
      borderRadius: 8,
      fontSize: 12, fontWeight: 500,
      color: active ? 'var(--accent)' : 'var(--text-2)',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      {active && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />}
      {label}
      {status && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', marginLeft: 4 }}>{status}</span>}
    </div>
  );

  return (
    <OBChrome step={2} total={4} title="Objectifs." sub="Adapte les seuils PNNS / OMS à votre situation. Aucune obligation.">
      {/* main goal */}
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 10,
        color: 'var(--text-3)', textTransform: 'uppercase',
        letterSpacing: '0.1em', marginBottom: 8,
      }}>Objectif pondéral</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 22 }}>
        {[
          { l: 'Stabiliser', s: '2 148 kcal', a: true },
          { l: 'Perdre', s: '−15% kcal' },
          { l: 'Prendre', s: '+10% kcal' },
        ].map((o, i) => (
          <div key={i} style={{
            padding: '12px 8px',
            background: o.a ? 'var(--accent-soft)' : 'var(--bg-surface)',
            border: `1px solid ${o.a ? 'var(--accent-line)' : 'var(--line)'}`,
            borderRadius: 10, textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: o.a ? 'var(--accent)' : 'var(--text-1)' }}>{o.l}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 3 }}>{o.s}</div>
          </div>
        ))}
      </div>

      {/* concerns */}
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 10,
        color: 'var(--text-3)', textTransform: 'uppercase',
        letterSpacing: '0.1em', marginBottom: 8,
      }}>Surveillance particulière</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
        <Chip label="Diabète T2" active status="G ≤ 40%" />
        <Chip label="Cholestérolémie" active status="AGS ≤ 7%" />
        <Chip label="Hypertension" />
        <Chip label="Sport endurance" />
        <Chip label="Aucune" />
      </div>

      {/* regimes */}
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 10,
        color: 'var(--text-3)', textTransform: 'uppercase',
        letterSpacing: '0.1em', marginBottom: 8,
      }}>Régime & restrictions</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
        <Chip label="Méditerranéen" active />
        <Chip label="Végétarien" />
        <Chip label="Végan" />
        <Chip label="Sans gluten" />
        <Chip label="Sans lactose" />
      </div>

      {/* note */}
      <div style={{
        padding: 10,
        background: 'var(--bg-canvas)',
        border: '1px dashed var(--line-strong)',
        borderRadius: 8,
        fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5,
      }}>
        <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>Cibles ajustées · </span>
        glucides limités à 215 g/j (vs 295 g de référence), AGS limités à 16.7 g/j (vs 23.9 g).
      </div>
    </OBChrome>
  );
}

// ─── 4. Permissions ─────────────────────────
function ScreenPermissions() {
  const Perm = ({ icon, title, sub, required }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px',
      background: 'var(--bg-surface)',
      border: '1px solid var(--line)',
      borderRadius: 12,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 9,
        background: 'var(--accent-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)', flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
          {title}
          {required && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', textTransform: 'uppercase' }}>requis</span>}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.45 }}>{sub}</div>
      </div>
    </div>
  );

  return (
    <OBChrome step={3} total={4} title="Autorisations." sub="Trois permissions, demandées seulement au moment où elles servent." primaryLabel="Activer l'app" secondary="Vos analyses sont chiffrées. Suppression du compte (RGPD) disponible à tout moment dans Profil.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Perm required icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8a2 2 0 012-2h2l1.5-2h7L17 6h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
            <circle cx="12" cy="13" r="3.5"/>
          </svg>
        } title="Appareil photo" sub="Pour capturer vos repas. Aucune image n'est stockée sans votre validation après analyse." />

        <Perm icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <circle cx="8.5" cy="11" r="2"/>
            <path d="M3 17l5-5 4 4 3-3 6 6"/>
          </svg>
        } title="Photothèque" sub="Pour analyser des photos déjà prises. Lecture seule, sélection unitaire." />

        <Perm icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 17h5l-1.4-1.4A7.97 7.97 0 0020 10a8 8 0 10-2.6 5.9L19 17M9 17v1a3 3 0 006 0v-1"/>
          </svg>
        } title="Rappels discrets" sub="Un seul rappel quotidien si vous le souhaitez. Désactivable d'un geste." />
      </div>

      <div style={{ marginTop: 22, padding: 12, background: 'var(--bg-canvas)', borderRadius: 10, border: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Sources scientifiques utilisées</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['CIQUAL · ANSES', 'NOVA · Monteiro', 'PNNS', 'OMS', 'EFSA'].map(s => (
            <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-2)', padding: '3px 7px', background: 'var(--bg-raised)', borderRadius: 4 }}>{s}</span>
          ))}
        </div>
      </div>
    </OBChrome>
  );
}

Object.assign(window, { ScreenWelcome, ScreenDemographics, ScreenGoals, ScreenPermissions });
