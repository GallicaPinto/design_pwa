// Plate Analyzer — Santé globale · holistique
// 7 screens: Journal · Mindful eating · Glycémie prédictive
//            Diversité végétale · Fenêtre alimentaire · Corrélations · Inflammation & gut

// ─── Hub ──────────────────────────────────────
function ScreenHolistic({ navigate, back }) {
  const sections = [
    { id: 'journal',  label: 'Journal multi-type',  sub: 'food · sport · eau · sommeil',   color: 'var(--accent)',   icon: 'journal' },
    { id: 'mindful',  label: 'Mindful eating',       sub: 'faim · satiété · plaisir',        color: 'var(--ok)',       icon: 'mindful' },
    { id: 'glycemia', label: 'Glycémie prédictive',  sub: 'courbe estimée · CGM-like',       color: 'var(--warn)',     icon: 'glycemia' },
    { id: 'plants',   label: 'Diversité végétale',   sub: '24 / 30 plantes · microbiote',    color: 'var(--ok)',       icon: 'plants' },
    { id: 'fasting',  label: 'Fenêtre alimentaire',  sub: 'TRE 14:10 · jeûne intermittent',  color: 'var(--accent-2)', icon: 'fasting' },
    { id: 'correl',   label: 'Corrélations',          sub: 'food × mood × sleep × symptoms', color: 'var(--accent)',   icon: 'correl' },
    { id: 'inflam',   label: 'Inflammation & gut',   sub: 'DII · microbiote estimé',         color: 'var(--alert)',    icon: 'inflam' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px 10px' }}>
        <button onClick={back} style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Analyse avancée</div>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2 }}>Santé globale · holistique</div>
        </div>
      </div>

      <div style={{ padding: '4px 16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => navigate(s.id)} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 14px', width: '100%', textAlign: 'left',
            background: 'var(--bg-surface)', border: '1px solid var(--line)',
            borderLeft: `3px solid ${s.color}`,
            borderRadius: 12, cursor: 'pointer',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: 'var(--bg-raised)', color: s.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <HolisticIcon name={s.icon} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-1)', letterSpacing: '-0.01em' }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.sub}</div>
            </div>
            <svg width="6" height="10" viewBox="0 0 6 10" style={{ opacity: 0.35, flexShrink: 0 }}><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
          </button>
        ))}
      </div>
    </div>
  );
}

function HolisticIcon({ name }) {
  const s = { width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 };
  switch (name) {
    case 'journal':  return <svg {...s} viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>;
    case 'mindful':  return <svg {...s} viewBox="0 0 24 24"><path d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path d="M8 13s1 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>;
    case 'glycemia': return <svg {...s} viewBox="0 0 24 24"><polyline points="3,17 7,10 11,14 15,7 21,11"/></svg>;
    case 'plants':   return <svg {...s} viewBox="0 0 24 24"><path d="M12 22V10M12 10C12 10 8 8 5 4c5 0 7 6 7 6zM12 10c0 0 4-2 7-6-5 0-7 6-7 6zM5 22h14"/></svg>;
    case 'fasting':  return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'correl':   return <svg {...s} viewBox="0 0 24 24"><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h10M5 7v10M19 7v10M7 19h10"/></svg>;
    case 'inflam':   return <svg {...s} viewBox="0 0 24 24"><path d="M12 3l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/></svg>;
    default: return null;
  }
}

// ─── 1. Journal multi-type ─────────────────────
function ScreenJournalEntry({ back }) {
  const types = [
    { id: 'food',  label: 'Prise alimentaire', sub: 'analyse photo',   icon: 'plate',  c: 'var(--accent)',   a: true },
    { id: 'sport', label: 'Activité physique',  sub: 'kcal dépensées', icon: 'bike',   c: 'var(--accent-2)' },
    { id: 'water', label: 'Hydratation',        sub: '6 / 8 verres',   icon: 'drop',   c: 'var(--accent-2)' },
    { id: 'sympt', label: 'Symptômes',          sub: 'corrélations',   icon: 'search', c: 'var(--warn)' },
    { id: 'sleep', label: 'Sommeil',            sub: 'qualité · durée',icon: 'moon',   c: 'var(--accent)' },
    { id: 'mood',  label: 'Ressentis',          sub: 'mood × food',    icon: 'sun',    c: 'var(--ok)' },
  ];

  return (
    <div style={{ padding: '8px 16px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, marginBottom: 14 }}>
        <button onClick={back} style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button style={{ padding: '8px 18px', background: 'var(--accent)', color: '#0a0d12', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: 'var(--sans)', cursor: 'pointer' }}>Ajouter</button>
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Nouvelle entrée · journal</div>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2, lineHeight: 1.2 }}>Que voulez-vous consigner&nbsp;?</div>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Heure</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 500, color: 'var(--text-1)', marginTop: 2 }}>15:01</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['Maintenant', '−1h', 'Choisir'].map((l, i) => (
            <button key={i} style={{ padding: '5px 9px', background: i === 0 ? 'var(--accent-soft)' : 'var(--bg-canvas)', border: `1px solid ${i === 0 ? 'var(--accent-line)' : 'var(--line)'}`, borderRadius: 6, color: i === 0 ? 'var(--accent)' : 'var(--text-2)', fontFamily: 'var(--mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer' }}>{l}</button>
          ))}
        </div>
      </div>

      <PASection title="Type d'entrée" code="6 modules">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {types.map(t => (
            <div key={t.id} style={{ background: t.a ? 'var(--accent-soft)' : 'var(--bg-surface)', border: `1px solid ${t.a ? 'var(--accent-line)' : 'var(--line)'}`, borderRadius: 12, padding: 14, cursor: 'pointer', position: 'relative', overflow: 'hidden', minHeight: 96 }}>
              {t.a && (
                <div style={{ position: 'absolute', top: 8, right: 8, width: 16, height: 16, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0d12', fontSize: 10, fontFamily: 'var(--mono)', fontWeight: 600 }}>✓</div>
              )}
              <div style={{ width: 32, height: 32, borderRadius: 8, background: t.a ? 'var(--accent)' : 'var(--bg-raised)', color: t.a ? '#0a0d12' : t.c, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <JournalIcon name={t.icon} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: t.a ? 'var(--accent)' : 'var(--text-1)', letterSpacing: '-0.01em' }}>{t.label}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: t.a ? 'var(--accent)' : 'var(--text-3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: t.a ? 0.85 : 1 }}>{t.sub}</div>
            </div>
          ))}
        </div>
      </PASection>

      <PASection title="Mode de saisie" code="prise alimentaire">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { l: 'Photo de l\'assiette', sub: 'reconnaissance auto · 12 s', icon: 'camera', a: true },
            { l: 'Aliment(s) à la main', sub: 'recherche CIQUAL · 3 185 réf.', icon: 'search' },
            { l: 'Re-utiliser un repas', sub: '47 repas en historique', icon: 'history' },
            { l: 'Scanner un code-barres', sub: 'OpenFoodFacts · 2.5M produits', icon: 'barcode' },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: m.a ? 'var(--accent-soft)' : 'var(--bg-surface)', border: `1px solid ${m.a ? 'var(--accent-line)' : 'var(--line)'}`, borderRadius: 10, cursor: 'pointer' }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--bg-canvas)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.a ? 'var(--accent)' : 'var(--text-2)' }}>
                <JournalIcon name={m.icon} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: m.a ? 'var(--accent)' : 'var(--text-1)' }}>{m.l}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{m.sub}</div>
              </div>
              <svg width="6" height="10" viewBox="0 0 6 10" style={{ opacity: 0.4 }}><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
            </div>
          ))}
        </div>
      </PASection>
    </div>
  );
}

function JournalIcon({ name }) {
  const s = { width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 };
  switch (name) {
    case 'plate':   return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 7v6M12 7v3a2 2 0 002 2v1M15 7v6"/></svg>;
    case 'bike':    return <svg {...s} viewBox="0 0 24 24"><circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="M5 17l4-7h6l-3-4M9 10l5 7M15 6h3"/></svg>;
    case 'drop':    return <svg {...s} viewBox="0 0 24 24"><path d="M12 3l-5 8a5 5 0 1010 0l-5-8z"/></svg>;
    case 'search':  return <svg {...s} viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"/><path d="M14.5 14.5L20 20"/></svg>;
    case 'moon':    return <svg {...s} viewBox="0 0 24 24"><path d="M19 14.5A8 8 0 119.5 5a6 6 0 009.5 9.5z"/></svg>;
    case 'sun':     return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 3v2M12 19v2M5 5l1.4 1.4M17.6 17.6L19 19M3 12h2M19 12h2M5 19l1.4-1.4M17.6 6.4L19 5"/></svg>;
    case 'camera':  return <svg {...s} viewBox="0 0 24 24"><path d="M3 8a2 2 0 012-2h2l1.5-2h7L17 6h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/><circle cx="12" cy="13" r="3.5"/></svg>;
    case 'history': return <svg {...s} viewBox="0 0 24 24"><path d="M3 12a9 9 0 109-9 9 9 0 00-7 3M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>;
    case 'barcode': return <svg {...s} viewBox="0 0 24 24"><path d="M3 6v12M6 6v12M9 6v12M12 6v6M12 16v2M15 6v12M18 6v8M18 17v1M21 6v12"/></svg>;
    default: return null;
  }
}

// ─── 2. Mindful eating ────────────────────────
function ScreenMindful({ back }) {
  return (
    <div style={{ padding: '8px 16px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, marginBottom: 14 }}>
        <button onClick={back} style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button style={{ padding: '8px 18px', background: 'var(--accent)', color: '#0a0d12', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Ajouter</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Mindful eating · post-repas</div>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2, lineHeight: 1.2 }}>Comment était ce repas&nbsp;?</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 6, lineHeight: 1.5 }}>
          Inspiré du modèle d'<b style={{ color: 'var(--text-2)', fontWeight: 600 }}>alimentation intuitive</b>. Aucune obligation, mais ces signaux permettent de détecter les déclencheurs émotionnels.
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Description</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}>↻ depuis hier</span>
        </div>
        <div style={{ minHeight: 76, padding: 10, background: 'var(--bg-canvas)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12, color: 'var(--text-3)', fontStyle: 'italic', lineHeight: 1.55 }}>
          Décrivez ici votre repas, le lieu, vos sensations ou encore les difficultés rencontrées…
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-4)', marginTop: 6 }}>0 / 400</div>
      </div>

      <PASection title="Signaux corporels" code="0 → 10">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
          <MindSlider l="Faim / envie de manger" pos={0.65} v="6" sub="cause physique" />
          <MindSlider l="Satiété (corps)" pos={0.8} v="8" sub="bien rempli" />
          <MindSlider l="Rassasiement (cerveau / cœur)" pos={0.7} v="7" sub="comblé psychiquement" />
          <MindSlider l="Plaisir alimentaire" pos={0.9} v="9" sub="gourmand" />
          <MindSlider l="Durée du repas" pos={0.18} v="22" unit="min" sub="rapide" max="120" last />
        </div>
      </PASection>

      <PASection title="Contexte émotionnel" code="optionnel · multi-select">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5, marginBottom: 12 }}>
          {[
            { l: 'Détendu', emoji: '◐', a: true },
            { l: 'Stressé', emoji: '◑' },
            { l: 'Fatigué', emoji: '◒' },
            { l: 'Anxieux', emoji: '◓' },
            { l: 'Joyeux', emoji: '◔', a: true },
            { l: 'Triste', emoji: '◕' },
          ].map((c, i) => (
            <div key={i} style={{ padding: '8px 6px', background: c.a ? 'var(--accent-soft)' : 'var(--bg-surface)', border: `1px solid ${c.a ? 'var(--accent-line)' : 'var(--line)'}`, borderRadius: 8, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 14, color: c.a ? 'var(--accent)' : 'var(--text-3)', marginBottom: 2 }}>{c.emoji}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: c.a ? 'var(--accent)' : 'var(--text-2)' }}>{c.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {['À table', 'Au bureau', 'Debout', 'Devant un écran', 'En extérieur', 'En famille', 'Seul·e'].map((l, i) => (
            <div key={i} style={{ padding: '4px 9px', background: (i === 0 || i === 5) ? 'var(--accent-soft)' : 'var(--bg-surface)', border: `1px solid ${(i === 0 || i === 5) ? 'var(--accent-line)' : 'var(--line)'}`, borderRadius: 6, fontSize: 11, color: (i === 0 || i === 5) ? 'var(--accent)' : 'var(--text-2)', fontWeight: 500, cursor: 'pointer' }}>{l}</div>
          ))}
        </div>
      </PASection>

      <div style={{ marginTop: 14, padding: 12, background: 'linear-gradient(135deg, rgba(196,181,253,0.06), transparent)', border: '1px solid var(--accent-line)', borderRadius: 12, display: 'flex', gap: 10 }}>
        <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600 }}>i</div>
        <div style={{ fontSize: 11.5, color: 'var(--text-2)', lineHeight: 1.5 }}>
          <b style={{ color: 'var(--text-1)' }}>Bon équilibre faim/satiété.</b> Vous avez mangé en répondant à un besoin physique (faim 6) et atteint la satiété sans excès (8/10). Le repas a été rapide (22 min) — essayez de viser 30 min pour mieux ressentir le rassasiement.
        </div>
      </div>
    </div>
  );
}

function MindSlider({ l, pos, v, unit, sub, max = '10', last }) {
  return (
    <div style={{ paddingBottom: last ? 0 : 14, marginBottom: last ? 0 : 14, borderBottom: last ? 'none' : '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-1)' }}>{l}</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 500, color: 'var(--accent)' }}>{v}</span>
          {unit && <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>{unit}</span>}
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-4)', marginLeft: 4 }}>/ {max}</span>
        </div>
      </div>
      <div style={{ position: 'relative', height: 18, marginBottom: 6 }}>
        <div style={{ position: 'absolute', top: 8, left: 0, right: 0, height: 2, background: 'var(--bg-canvas)', borderRadius: 1 }} />
        <div style={{ position: 'absolute', top: 8, left: 0, height: 2, width: `${pos * 100}%`, background: 'var(--accent)', borderRadius: 1 }} />
        <div style={{ position: 'absolute', top: 3, left: `calc(${pos * 100}% - 5px)`, width: 10, height: 12, borderRadius: 3, background: 'var(--accent)', boxShadow: '0 0 0 3px rgba(196,181,253,0.18)' }} />
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <div key={i} style={{ position: 'absolute', top: 7, left: `calc(${t * 100}% - 0.5px)`, width: 1, height: 4, background: 'var(--text-4)', borderRadius: 1, opacity: 0.5 }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        <span>aucun</span>
        <span style={{ color: 'var(--accent)' }}>{sub}</span>
        <span>max {max}{unit ? ` ${unit}` : ''}</span>
      </div>
    </div>
  );
}

// ─── 3. Glycémie prédictive ───────────────────
function ScreenGlycemia({ back }) {
  return (
    <div style={{ padding: '8px 16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 6, marginBottom: 16 }}>
        <button onClick={back} style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Réponse glycémique · prédiction</div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>Courbe estimée</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--warn)', display: 'inline-block' }} />
            Sans capteur · modèle PREDICT
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 14, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pic estimé</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 28, fontWeight: 500, color: 'var(--warn)', letterSpacing: '-0.02em' }}>1.62</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)' }}>g/L · +45 min</span>
            </div>
          </div>
          <PAPill status="warn" dot>Pic modéré</PAPill>
        </div>

        <GlycemiaChart />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, paddingTop: 12, marginTop: 6, borderTop: '1px solid var(--line)' }}>
          {[
            { l: 'iAUC', v: '127', u: 'mmol·min/L', c: 'var(--warn)' },
            { l: 'Pic Δ', v: '+0.71', u: 'g/L' },
            { l: 'T retour', v: '128', u: 'min' },
            { l: 'IG estimé', v: '54', u: 'mod.', c: 'var(--warn)' },
          ].map((m, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.l}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 500, color: m.c || 'var(--text-1)', letterSpacing: '-0.02em', marginTop: 3 }}>{m.v}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-4)', marginTop: 2 }}>{m.u}</div>
            </div>
          ))}
        </div>
      </div>

      <PASection title="Comment aplanir la courbe" code="ordre des aliments">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { o: 1, l: 'Légumes verts en entrée', d: '−18% pic', c: 'var(--ok)' },
            { o: 2, l: 'Protéines + lipides ensuite', d: '−12% pic', c: 'var(--ok)' },
            { o: 3, l: 'Glucides en dernier', d: '−9% pic', c: 'var(--ok)' },
            { o: 4, l: 'Marche 15 min après', d: '−22% pic', c: 'var(--accent)' },
            { o: 5, l: 'Vinaigre (1 c. à s.) au début', d: '−14% pic', c: 'var(--accent-2)' },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 8 }}>
              <span style={{ width: 20, height: 20, borderRadius: 4, background: 'var(--bg-canvas)', border: '1px solid var(--line-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-2)', fontWeight: 600 }}>{t.o}</span>
              <span style={{ flex: 1, fontSize: 12 }}>{t.l}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: t.c, fontWeight: 500 }}>{t.d}</span>
            </div>
          ))}
        </div>
      </PASection>

      <PASection title="Vos patterns glycémiques · 90j" code="apprentissage">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { l: 'Pâtes blanches', v: '+0.85', spark: [50,60,70,80,75,65,55,50,52], c: 'var(--alert)' },
              { l: 'Pain complet', v: '+0.42', spark: [40,45,50,55,52,48,45,42,40], c: 'var(--warn)' },
              { l: 'Avoine + noix', v: '+0.18', spark: [30,32,34,36,35,33,31,30,29], c: 'var(--ok)' },
              { l: 'Quinoa + feta', v: '+0.22', spark: [32,35,38,40,38,35,33,32,31], c: 'var(--ok)' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flex: 1, fontSize: 12, color: 'var(--text-1)' }}>{p.l}</span>
                <PASpark values={p.spark} w={70} h={20} color={p.c} dotLast={false} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: p.c, fontWeight: 500, width: 48, textAlign: 'right' }}>{p.v}</span>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 10, marginTop: 10, borderTop: '1px solid var(--line)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5 }}>
            <b style={{ color: 'var(--text-2)' }}>Avoine + noix</b> est votre meilleur combo. Vous y répondez 4× mieux que pâtes blanches.
          </div>
        </div>
      </PASection>

      <div style={{ marginTop: 10, padding: 12, background: 'var(--bg-canvas)', border: '1px dashed var(--line-strong)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-2-soft)', color: 'var(--accent-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="6" y="3" width="12" height="18" rx="3"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>Connecter un capteur CGM</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>FreeStyle Libre · Dexcom · Apple Health</div>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Lier →</span>
      </div>
    </div>
  );
}

function GlycemiaChart() {
  const points = [
    [0, 0.92], [15, 1.05], [30, 1.40], [45, 1.62], [60, 1.55], [75, 1.40],
    [90, 1.25], [105, 1.15], [120, 1.05], [135, 1.00], [150, 0.96], [180, 0.94],
    [210, 0.93], [240, 0.92],
  ];
  const W = 290, H = 130, xMax = 240, yMin = 0.7, yMax = 1.8;
  const toX = t => (t / xMax) * W;
  const toY = v => H - ((v - yMin) / (yMax - yMin)) * H;
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p[0])},${toY(p[1])}`).join(' ');
  const area = path + ` L${W},${H} L0,${H} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 22}`} style={{ display: 'block' }}>
      <rect x="0" y={toY(1.40)} width={W} height={toY(0.70) - toY(1.40)} fill="rgba(74,222,128,0.06)" />
      <rect x="0" y={toY(1.80)} width={W} height={toY(1.40) - toY(1.80)} fill="rgba(251,191,36,0.05)" />
      {[0.8, 1.0, 1.2, 1.4, 1.6].map(y => (
        <g key={y}>
          <line x1="0" y1={toY(y)} x2={W} y2={toY(y)} stroke="rgba(255,255,255,0.04)" />
          <text x={W - 1} y={toY(y) - 2} fill="var(--text-4)" fontSize="8" fontFamily="var(--mono)" textAnchor="end">{y.toFixed(1)}</text>
        </g>
      ))}
      <line x1="0" y1={toY(1.40)} x2={W} y2={toY(1.40)} stroke="var(--warn)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
      <line x1="0" y1="0" x2="0" y2={H} stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
      <text x="3" y="10" fill="var(--accent)" fontSize="8" fontFamily="var(--mono)">REPAS</text>
      <line x1={toX(45)} y1={toY(1.62)} x2={toX(45)} y2={H} stroke="var(--warn)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
      <path d={area} fill="var(--warn)" fillOpacity="0.10" />
      <path d={path} stroke="var(--warn)" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={toX(45)} cy={toY(1.62)} r="3.5" fill="var(--warn)" />
      <circle cx={toX(45)} cy={toY(1.62)} r="6" fill="none" stroke="var(--warn)" strokeWidth="1" opacity="0.4" />
      {[0, 60, 120, 180, 240].map(t => (
        <text key={t} x={toX(t)} y={H + 14} fill="var(--text-4)" fontSize="8" fontFamily="var(--mono)" textAnchor="middle">+{t}min</text>
      ))}
    </svg>
  );
}

// ─── 4. Diversité végétale ────────────────────
function ScreenPlantDiversity({ back }) {
  const plants = [
    { n: 'Brocoli', k: 'lég', c: 'var(--ok)' }, { n: 'Épinards', k: 'lég', c: 'var(--ok)' },
    { n: 'Courgette', k: 'lég', c: 'var(--ok)' }, { n: 'Carotte', k: 'lég', c: 'var(--ok)' },
    { n: 'Poireau', k: 'lég', c: 'var(--ok)' }, { n: 'Tomate', k: 'lég', c: 'var(--ok)' },
    { n: 'Aubergine', k: 'lég', c: 'var(--ok)' }, { n: 'Pomme', k: 'fruit', c: 'var(--accent)' },
    { n: 'Banane', k: 'fruit', c: 'var(--accent)' }, { n: 'Fraise', k: 'fruit', c: 'var(--accent)' },
    { n: 'Kiwi', k: 'fruit', c: 'var(--accent)' }, { n: 'Lentilles', k: 'lég.', c: 'var(--accent-2)' },
    { n: 'Pois chiches', k: 'lég.', c: 'var(--accent-2)' }, { n: 'Haricots r.', k: 'lég.', c: 'var(--accent-2)' },
    { n: 'Quinoa', k: 'cér', c: 'var(--warn)' }, { n: 'Avoine', k: 'cér', c: 'var(--warn)' },
    { n: 'Sarrasin', k: 'cér', c: 'var(--warn)' }, { n: 'Amande', k: 'olé.', c: 'var(--text-2)' },
    { n: 'Noix', k: 'olé.', c: 'var(--text-2)' }, { n: 'Lin (graines)', k: 'olé.', c: 'var(--text-2)' },
    { n: 'Persil', k: 'aro.', c: 'var(--ok)' }, { n: 'Basilic', k: 'aro.', c: 'var(--ok)' },
    { n: 'Curcuma', k: 'aro.', c: 'var(--warn)' }, { n: 'Ail', k: 'aro.', c: 'var(--ok)' },
  ];

  return (
    <div style={{ padding: '8px 16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 6, marginBottom: 16 }}>
        <button onClick={back} style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Diversité végétale · 7 jours glissants</div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>Microbiote score</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Cible 30 plantes/sem · American Gut Project</div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 16, marginBottom: 12, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 140, height: 140, background: 'radial-gradient(circle, rgba(74,222,128,0.10), transparent 70%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
          <PARing value={24} target={30} size={96} stroke={6} color="var(--ok)">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>24</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', marginTop: 3 }}>/ 30 plantes</div>
          </PARing>
          <div style={{ flex: 1 }}>
            <PAPill status="ok" dot>Excellent</PAPill>
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 8, lineHeight: 1.5 }}>
              <b style={{ color: 'var(--text-1)' }}>+ 6 plantes cette semaine.</b> À ce rythme, vous atteignez la cible mercredi prochain.
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
              <PlantStat l="Semaine record" v="32" />
              <PlantStat l="Streak" v="3 sem" c="var(--accent)" />
            </div>
          </div>
        </div>
      </div>

      <PASection title="Par famille · 7 jours">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
          {[
            { l: 'Légumes', n: 7, t: 10, c: 'var(--ok)' },
            { l: 'Fruits', n: 4, t: 7, c: 'var(--accent)' },
            { l: 'Légumineuses', n: 3, t: 4, c: 'var(--accent-2)' },
            { l: 'Céréales complètes', n: 3, t: 5, c: 'var(--warn)' },
            { l: 'Oléagineux & graines', n: 3, t: 4, c: 'var(--text-2)' },
            { l: 'Herbes & épices', n: 4, t: 6, c: 'var(--ok)' },
          ].map((f, i, arr) => (
            <div key={i} style={{ marginBottom: i < arr.length - 1 ? 10 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: 'var(--text-1)' }}>{f.l}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500, color: f.c }}>{f.n}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-4)' }}>/ {f.t}</span>
                </div>
              </div>
              <PABar value={(f.n / f.t) * 100} target={100} max={100} color={f.c} showTick={false} height={3} />
            </div>
          ))}
        </div>
      </PASection>

      <PASection title="Cette semaine · 24 plantes" code="distinctes">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {plants.map((p, i) => (
              <div key={i} style={{ padding: '3px 8px 3px 4px', background: 'var(--bg-canvas)', border: '1px solid var(--line)', borderRadius: 5, display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-1)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.c, display: 'inline-block' }} />
                {p.n}
              </div>
            ))}
            <div style={{ padding: '3px 8px', background: 'var(--bg-canvas)', border: '1px dashed var(--line-strong)', borderRadius: 5, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>+ 6 à ajouter →</div>
          </div>
        </div>
      </PASection>

      <PASection title="Suggestions pour la semaine" code="non vus en 4 sem">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[
            { n: 'Topinambour', f: 'lég', why: 'prébiotique', c: 'var(--ok)' },
            { n: 'Cresson', f: 'lég', why: 'fer + B9', c: 'var(--ok)' },
            { n: 'Myrtille', f: 'fruit', why: 'polyphénols++', c: 'var(--accent)' },
            { n: 'Sésame', f: 'olé.', why: 'calcium', c: 'var(--text-2)' },
            { n: 'Sarrasin', f: 'cér', why: 'sans gluten', c: 'var(--warn)' },
            { n: 'Cumin', f: 'aro', why: 'digestion', c: 'var(--ok)' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderLeft: `2px solid ${s.c}`, borderRadius: 6, padding: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 12, fontWeight: 500 }}>{s.n}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', textTransform: 'uppercase' }}>{s.f}</span>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: s.c, marginTop: 3 }}>{s.why}</div>
            </div>
          ))}
        </div>
      </PASection>
    </div>
  );
}

function PlantStat({ l, v, c = 'var(--text-1)' }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 500, color: c, letterSpacing: '-0.02em', marginTop: 2 }}>{v}</div>
    </div>
  );
}

// ─── 5. Fenêtre alimentaire ───────────────────
function ScreenFastingWindow({ back }) {
  return (
    <div style={{ padding: '8px 16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 6, marginBottom: 16 }}>
        <button onClick={back} style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Fenêtre alimentaire · TRE</div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>Cadence des repas</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>14:10 actif · 13 / 14 jours conformes</div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>État actuel</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 500, color: 'var(--accent)' }}>06h 18</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)' }}>de jeûne</span>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>
              <span style={{ color: 'var(--ok)' }}>● phase métabolique</span> · prochain repas 08:14
            </div>
          </div>
        </div>

        <FastingClock />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, paddingTop: 14, marginTop: 6, borderTop: '1px solid var(--line)' }}>
          {[
            { l: 'Fenêtre repas', v: '09:30', sub: '08:14 → 17:42' },
            { l: 'Jeûne quotidien', v: '14:30', sub: 'médiane 14j' },
            { l: 'Last meal', v: '17:42', sub: 'hier · J−1' },
          ].map((b, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{b.l}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 500, color: 'var(--text-1)', marginTop: 3 }}>{b.v}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', marginTop: 2 }}>{b.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <PASection title="Protocole">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {[{ l: '12 : 12', sub: 'doux' }, { l: '14 : 10', sub: 'intermédiaire', a: true }, { l: '16 : 8', sub: 'avancé' }].map((p, i) => (
            <div key={i} style={{ padding: 11, textAlign: 'center', background: p.a ? 'var(--accent-soft)' : 'var(--bg-surface)', border: `1px solid ${p.a ? 'var(--accent-line)' : 'var(--line)'}`, borderRadius: 10, cursor: 'pointer' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 500, color: p.a ? 'var(--accent)' : 'var(--text-1)', letterSpacing: '-0.02em' }}>{p.l}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', marginTop: 4, textTransform: 'uppercase' }}>{p.sub}</div>
            </div>
          ))}
        </div>
      </PASection>

      <PASection title="Régularité · 14 jours" code="conformité 93%">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: 3, marginBottom: 8 }}>
            {[14,14,15,14,13,14,14,15,16,14,12,14,14,14].map((h, i) => {
              const ok = h >= 14;
              return (
                <div key={i} style={{ height: 38, borderRadius: 3, background: ok ? 'var(--ok)' : 'var(--warn)', opacity: ok ? 0.45 + (h - 14) * 0.15 : 0.6, position: 'relative' }}>
                  {i === 13 && <div style={{ position: 'absolute', top: -3, left: -3, right: -3, bottom: -3, border: '1.5px solid var(--accent)', borderRadius: 5 }} />}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>
            <span>J−13</span><span>J−7</span><span style={{ color: 'var(--accent)' }}>aujourd'hui</span>
          </div>
        </div>
      </PASection>

      <PASection title="Effets observés · 4 sem" code="corrélés">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { l: 'Glycémie à jeun', v: '−0.08 g/L', c: 'var(--ok)', icon: '▼' },
            { l: 'Score nutritionnel', v: '+ 9 pts', c: 'var(--ok)', icon: '▲' },
            { l: 'Énergie matinale', v: '7.2 → 8.1', c: 'var(--ok)', icon: '▲' },
            { l: 'Faim 17h', v: '+ 1.2 / 10', c: 'var(--warn)', icon: '▲' },
          ].map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--bg-surface)', border: '1px solid var(--line)', borderLeft: `2px solid ${e.c}`, borderRadius: 6 }}>
              <span style={{ flex: 1, fontSize: 12 }}>{e.l}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: e.c, fontWeight: 500 }}>{e.icon} {e.v}</span>
            </div>
          ))}
        </div>
      </PASection>

      <div style={{ marginTop: 10, padding: 11, background: 'var(--warn-soft)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: 8, fontSize: 11, color: 'var(--warn)', lineHeight: 1.5, display: 'flex', gap: 8 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v4M7 9.5v0.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
        <span><b style={{ fontWeight: 600 }}>Contre-indications.</b> <span style={{ color: 'var(--text-2)' }}>Le TRE est déconseillé pendant la grossesse, l'allaitement, en cas de diabète T1, troubles alimentaires actifs, ou chez les &lt;18 ans.</span></span>
      </div>
    </div>
  );
}

function FastingClock() {
  const size = 220, cx = size / 2, cy = size / 2, r = 86;
  const timeToAngle = (h, m = 0) => ((h + m / 60) / 24) * 360 - 90;
  const eatStart = timeToAngle(8, 14), eatEnd = timeToAngle(17, 42), now = timeToAngle(23, 0);
  const arcPath = (start, end, radius) => {
    const a1 = (start * Math.PI) / 180, a2 = (end * Math.PI) / 180;
    const x1 = cx + radius * Math.cos(a1), y1 = cy + radius * Math.sin(a1);
    const x2 = cx + radius * Math.cos(a2), y2 = cy + radius * Math.sin(a2);
    const large = ((end - start + 360) % 360) > 180 ? 1 : 0;
    return `M${x1},${y1} A${radius},${radius} 0 ${large} 1 ${x2},${y2}`;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
      <svg width={size} height={size}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <path d={arcPath(eatStart, eatEnd, r)} stroke="var(--accent)" strokeWidth="10" fill="none" />
        <path d={arcPath(eatEnd, eatStart + 360, r)} stroke="var(--accent-2)" strokeWidth="10" fill="none" opacity="0.35" />
        {Array.from({length: 24}).map((_, i) => {
          const a = (i / 24) * 360 - 90, aRad = (a * Math.PI) / 180;
          const r1 = r + 6, r2 = r + (i % 6 === 0 ? 12 : 9);
          return <line key={i} x1={cx + r1 * Math.cos(aRad)} y1={cy + r1 * Math.sin(aRad)} x2={cx + r2 * Math.cos(aRad)} y2={cy + r2 * Math.sin(aRad)} stroke={i % 6 === 0 ? 'var(--text-2)' : 'var(--text-4)'} strokeWidth="1" />;
        })}
        {[0, 6, 12, 18].map(h => {
          const a = (h / 24) * 360 - 90, aRad = (a * Math.PI) / 180, rr = r + 22;
          return <text key={h} x={cx + rr * Math.cos(aRad)} y={cy + rr * Math.sin(aRad) + 3} fill="var(--text-3)" fontSize="10" fontFamily="var(--mono)" textAnchor="middle">{String(h).padStart(2,'0')}</text>;
        })}
        {(() => {
          const aRad = (now * Math.PI) / 180;
          return <>
            <line x1={cx} y1={cy} x2={cx + (r - 6) * Math.cos(aRad)} y2={cy + (r - 6) * Math.sin(aRad)} stroke="var(--text-1)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx={cx + (r - 6) * Math.cos(aRad)} cy={cy + (r - 6) * Math.sin(aRad)} r="4" fill="var(--text-1)" />
          </>;
        })()}
        <circle cx={cx} cy={cy} r="3" fill="var(--text-1)" />
        <text x={cx} y={cy - 14} fill="var(--text-3)" fontSize="9" fontFamily="var(--mono)" textAnchor="middle">JEÛNE</text>
        <text x={cx} y={cy + 6} fill="var(--accent)" fontSize="18" fontFamily="var(--mono)" textAnchor="middle" fontWeight="500" letterSpacing="-0.5">6:18</text>
        <text x={cx} y={cy + 22} fill="var(--text-4)" fontSize="9" fontFamily="var(--mono)" textAnchor="middle">/ 14:00</text>
      </svg>
    </div>
  );
}

// ─── 6. Corrélations ─────────────────────────
function ScreenCorrelations({ back }) {
  return (
    <div style={{ padding: '8px 16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 6, marginBottom: 16 }}>
        <button onClick={back} style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Corrélations · 90 jours</div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>Patterns détectés</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>148 repas · 90 nuits · 312 ressentis</div>
        </div>
      </div>

      <PASection title="Top corrélations" code="r > 0.4">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <CorrelCard a="Score nutritionnel" op="↗" b="Qualité du sommeil" r="+0.58" sub="Vos meilleures nuits suivent les jours avec score > 75" color="var(--ok)" />
          <CorrelCard a="Sucres libres > 60g" op="↗" b="Sensation de fatigue +3h" r="+0.52" sub="Crash glucidique observé 14× sur 90 jours" color="var(--alert)" />
          <CorrelCard a="Plats ultra-transformés" op="↗" b="Symptômes digestifs" r="+0.41" sub="Ballonnements et inconfort dans les 6h" color="var(--alert)" />
          <CorrelCard a="Légumineuses au dîner" op="↘" b="Réveils nocturnes" r="−0.36" sub="Sommeil 18% plus continu" color="var(--ok)" />
        </div>
      </PASection>

      <PASection title="Aliments × humeur" code="moy. ressenti après">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
          <CorrelMatrix />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 10, marginTop: 8, borderTop: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>FORT IMPACT</span>
            <div style={{ flex: 1, display: 'flex', gap: 1 }}>
              {['rgba(248,113,113,0.85)', 'rgba(248,113,113,0.5)', 'rgba(255,255,255,0.06)', 'rgba(74,222,128,0.5)', 'rgba(74,222,128,0.85)'].map((c, i) => (
                <div key={i} style={{ flex: 1, height: 6, background: c }} />
              ))}
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>POSITIF</span>
          </div>
        </div>
      </PASection>

      <PASection title="Trigger → symptôme" code="latence h">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
          {[
            { trig: 'Produits laitiers', symp: 'Ballonnements', n: 11, lag: '2-4h', conf: 'élevée' },
            { trig: 'Gluten (pain blanc)', symp: 'Fatigue', n: 7, lag: '1-3h', conf: 'modérée' },
            { trig: 'Caféine après 14h', symp: 'Insomnie', n: 4, lag: '8-11h', conf: 'élevée' },
          ].map((c, i, arr) => (
            <div key={i} style={{ marginBottom: i < arr.length - 1 ? 12 : 0, paddingBottom: i < arr.length - 1 ? 12 : 0, borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--alert)', padding: '2px 6px', background: 'var(--alert-soft)', borderRadius: 3 }}>{c.trig}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>→</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--warn)', padding: '2px 6px', background: 'var(--warn-soft)', borderRadius: 3 }}>{c.symp}</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>n = {c.n}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 10, color: 'var(--text-3)' }}>
                <span>Latence <b style={{ color: 'var(--text-2)' }}>{c.lag}</b></span>
                <span>·</span>
                <span>Confiance <b style={{ color: c.conf === 'élevée' ? 'var(--ok)' : 'var(--warn)' }}>{c.conf}</b></span>
              </div>
            </div>
          ))}
        </div>
      </PASection>

      <div style={{ marginTop: 10, padding: 11, background: 'var(--bg-canvas)', border: '1px dashed var(--line-strong)', borderRadius: 8, fontSize: 10.5, color: 'var(--text-3)', lineHeight: 1.5 }}>
        <b style={{ color: 'var(--text-2)', fontWeight: 500 }}>Corrélation ≠ causalité.</b> Ces patterns sont des hypothèses statistiques basées sur vos données. Pour un diagnostic d'intolérance, consultez un professionnel.
      </div>
    </div>
  );
}

function CorrelCard({ a, op, b, r, sub, color }) {
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderLeft: `2px solid ${color}`, borderRadius: 8, padding: '10px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{a}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 14, color, fontWeight: 600 }}>{op}</span>
        <span style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{b}</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color, fontWeight: 500 }}>r {r}</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}

function CorrelMatrix() {
  const foods = ['Légumes verts', 'Fruits frais', 'Poisson gras', 'Pâtes blanches', 'Plats préparés', 'Charcuterie', 'Café (matin)'];
  const moods = ['Énergie', 'Calme', 'Focus', 'Digestion'];
  const matrix = [
    [+2, +1, +1, +2], [+2, +1, +1, +1], [+1, +2, +2, +1],
    [ 0, -1, -1, -1], [-1, -1, -1, -2], [-1, -1,  0, -2], [+2, -1, +2,  0],
  ];
  const color = v => {
    if (v >= 2) return 'rgba(74,222,128,0.85)';
    if (v === 1) return 'rgba(74,222,128,0.5)';
    if (v === 0) return 'rgba(255,255,255,0.06)';
    if (v === -1) return 'rgba(248,113,113,0.5)';
    return 'rgba(248,113,113,0.85)';
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `90px repeat(${moods.length}, 1fr)`, gap: 2 }}>
      <div />
      {moods.map((m, i) => (
        <div key={i} style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center', padding: 4 }}>{m}</div>
      ))}
      {foods.map((f, fi) => (
        <React.Fragment key={fi}>
          <div style={{ fontSize: 10.5, color: 'var(--text-1)', alignSelf: 'center', padding: '4px 0' }}>{f}</div>
          {matrix[fi].map((v, mi) => (
            <div key={mi} style={{ height: 24, background: color(v), borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500, color: Math.abs(v) === 2 ? '#0a0d12' : v === 0 ? 'var(--text-4)' : 'var(--text-1)' }}>{v > 0 ? '+' : ''}{v}</div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── 7. Inflammation & gut ────────────────────
function ScreenInflammation({ back }) {
  return (
    <div style={{ padding: '8px 16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 6, marginBottom: 16 }}>
        <button onClick={back} style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Marqueurs avancés</div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>Inflammation & microbiote</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>scores estimés · 30 jours</div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Dietary Inflammatory Index</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 28, fontWeight: 500, color: 'var(--ok)', letterSpacing: '-0.02em' }}>−1.4</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)' }}>/ −8 → +8</span>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 3 }}>Shivappa et al. 2014</div>
          </div>
          <PAPill status="ok" dot>Anti-inflammatoire</PAPill>
        </div>
        <div style={{ position: 'relative', height: 28, marginBottom: 6 }}>
          <div style={{ position: 'absolute', top: 12, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--ok) 0%, var(--ok) 35%, var(--text-3) 50%, var(--alert) 65%, var(--alert) 100%)', borderRadius: 2 }} />
          <div style={{ position: 'absolute', top: 9, left: '50%', width: 1, height: 10, background: 'rgba(255,255,255,0.5)' }} />
          <div style={{ position: 'absolute', top: 5, left: 'calc(41.25% - 1px)', width: 2, height: 18, background: 'var(--ok)', boxShadow: '0 0 0 3px rgba(74,222,128,0.3)', borderRadius: 1 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>
          <span>−8 anti-infl</span><span>0</span><span>+8 pro-infl</span>
        </div>
      </div>

      <PASection title="Contributeurs · 30 j" code="vos top moteurs">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
          {[
            { l: 'Polyphénols (thé, baies, olives)', v: '−0.42', c: 'var(--ok)' },
            { l: 'Oméga-3 EPA+DHA', v: '−0.31', c: 'var(--ok)' },
            { l: 'Curcuma / gingembre', v: '−0.18', c: 'var(--ok)' },
            { l: 'Fibres totales', v: '−0.24', c: 'var(--ok)' },
            { l: 'Sucres ajoutés', v: '+0.12', c: 'var(--alert)' },
            { l: 'Charcuterie / viande rouge', v: '+0.19', c: 'var(--alert)' },
          ].map((d, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: d.c, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12 }}>{d.l}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: d.c, fontWeight: 500 }}>{d.v}</span>
            </div>
          ))}
        </div>
      </PASection>

      <PASection title="Microbiote estimé" code="proxy diet">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            {[
              { l: 'Diversité', v: '24', sub: 'plantes/sem', c: 'var(--ok)' },
              { l: 'Fibres', v: '24g', sub: 'cible 30g', c: 'var(--warn)' },
              { l: 'Fermentés', v: '6×/sem', sub: 'kéfir · choucroute', c: 'var(--ok)' },
              { l: 'Prébiotiques', v: '3.2g', sub: 'inuline / FOS', c: 'var(--accent)' },
            ].map((m, i) => (
              <div key={i} style={{ padding: 10, background: 'var(--bg-canvas)', border: '1px solid var(--line)', borderRadius: 8 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{m.l}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 500, color: m.c, letterSpacing: '-0.02em' }}>{m.v}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', marginTop: 2 }}>{m.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 12, borderTop: '1px solid var(--line)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Score gut · estimé</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <PARing value={72} target={100} size={56} stroke={4} color="var(--ok)">
                <span style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 500, color: 'var(--ok)' }}>72</span>
              </PARing>
              <div style={{ flex: 1, fontSize: 11, color: 'var(--text-2)', lineHeight: 1.55 }}>
                Bon profil. <b style={{ color: 'var(--text-1)' }}>+ aliments fermentés</b> (kéfir, kimchi, kombucha) pour grimper au-delà de 80.
              </div>
            </div>
          </div>
        </div>
      </PASection>

      <div style={{ marginTop: 10, padding: 12, background: 'var(--bg-canvas)', border: '1px dashed var(--line-strong)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 2v6a3 3 0 003 3v8a3 3 0 003 3 3 3 0 003-3v-8a3 3 0 003-3V2"/><path d="M6 6h12"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }}>Importer biomarqueurs sanguins</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>CRP · IL-6 · pour calibrer le DII</div>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Importer →</span>
      </div>
    </div>
  );
}
