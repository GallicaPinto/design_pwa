// Plate Analyzer — Stats screens (Weekly + Monthly + History)

function ScreenStats({ dense = false }) {
  const [view, setView] = React.useState('weekly');

  const TABS = [
    { id: 'weekly', label: 'Semaine' },
    { id: 'monthly', label: 'Mois' },
    { id: '90j', label: '90j' },
    { id: 'history', label: 'Historique' },
  ];

  return (
    <div>
      {/* segmented control + nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px 10px' }}>
        <div style={{ display: 'flex', gap: 2, padding: 3, background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 8 }}>
          {TABS.map((t, i) => (
            <button key={t.id} onClick={() => setView(t.id)} style={{
              padding: '5px 10px',
              background: view === t.id ? 'var(--bg-raised)' : 'transparent',
              border: 'none', borderRadius: 6,
              color: view === t.id ? 'var(--text-1)' : 'var(--text-3)',
              fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.06em',
              cursor: 'pointer',
            }}>{t.label}</button>
          ))}
        </div>
        {view === 'monthly' || view === '90j' ? (
          <button style={{ padding: '6px 12px', background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 7, color: 'var(--text-2)', fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M7 2v9M3 7l4 4 4-4M2 13h10"/></svg>
            PDF
          </button>
        ) : (
          <button style={{ width: 32, height: 32, borderRadius: 7, background: 'var(--bg-surface)', border: '1px solid var(--line)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 2v10M2 7h10"/></svg>
          </button>
        )}
      </div>

      {view === 'weekly' && <WeeklyContent dense={dense} />}
      {view === 'monthly' && <MonthlyContent dense={dense} label="Mai 2026 · J−12" />}
      {view === '90j' && <MonthlyContent dense={dense} label="Fév – Mai 2026 · 90j" is90j />}
      {view === 'history' && <HistoryContent />}
    </div>
  );
}

// ─── Weekly content ────────────────────────────
function WeeklyContent({ dense }) {
  const days = [
    { d: 'L', n: 6,  kcal: 1820, score: 72 },
    { d: 'M', n: 7,  kcal: 2180, score: 64 },
    { d: 'M', n: 8,  kcal: 1640, score: 88 },
    { d: 'J', n: 9,  kcal: 2030, score: 70 },
    { d: 'V', n: 10, kcal: 2410, score: 52 },
    { d: 'S', n: 11, kcal: 1980, score: 79 },
    { d: 'D', n: 12, kcal: 1487, score: 78, today: true },
  ];

  return (
    <div style={{ padding: '0 16px 24px' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Semaine · S19</div>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2 }}>6 — 12 mai</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>
          <span style={{ color: 'var(--ok)' }}>↑ 6 pts</span> vs S18 · score moyen
        </div>
      </div>

      {/* day bars */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 14, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Score / jour</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>72</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)' }}>moyen</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 100, marginBottom: 8 }}>
          {days.map((d, i) => {
            const h = (d.score / 100) * 100;
            const c = d.today ? 'var(--accent)' : d.score >= 75 ? 'var(--ok)' : d.score >= 60 ? 'var(--accent-2)' : 'var(--warn)';
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', height: h, background: c, borderRadius: 3, position: 'relative', opacity: d.today ? 1 : 0.85 }}>
                  {d.today && (
                    <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--mono)', fontSize: 9, color: c }}>{d.score}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {days.map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 9, color: d.today ? 'var(--accent)' : 'var(--text-3)', fontWeight: d.today ? 600 : 400 }}>{d.d}</div>
          ))}
        </div>
      </div>

      <PASection title="Moyennes hebdomadaires" code="kcal · macros">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', gap: 16 }}>
          <SegmentDonut size={92} segments={[
            { v: 18, c: 'var(--accent)' },
            { v: 48, c: 'var(--accent-2)' },
            { v: 34, c: 'var(--warn)' },
          ]} center={<>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 500, letterSpacing: '-0.02em' }}>1 935</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-3)' }}>kcal / jour</div>
          </>} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <MacroLegend c="var(--accent)" l="Protéines" v="18%" sub="86g" />
            <MacroLegend c="var(--accent-2)" l="Glucides" v="48%" sub="233g" />
            <MacroLegend c="var(--warn)" l="Lipides" v="34%" sub="73g" />
          </div>
        </div>
      </PASection>

      <PASection title="Tendances · 7 jours" action={dense ? 'Réduire' : 'Détail'}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <TrendCard l="Sel" v="4.6" u="g/j" trend="↑ 0.4g" status="warn" data={[3.2, 4.1, 3.8, 4.4, 5.1, 4.8, 4.2]} />
          <TrendCard l="AGS" v="15.2" u="g/j" trend="↓ 1.1g" status="ok" data={[16, 15, 17, 14, 16, 15, 14.7]} />
          <TrendCard l="Fibres" v="22" u="g/j" trend="↓ 8g cible" status="warn" data={[18, 24, 22, 20, 26, 22, 18]} />
          <TrendCard l="NOVA" v="2.1" u="/4" trend="stable" status="ok" data={[2.2, 2.0, 1.8, 2.1, 2.3, 1.9, 2.1]} />
          {dense && <>
            <TrendCard l="ω-6/ω-3" v="5.2" u=":1" trend="↑ 0.4" status="warn" data={[4.8, 5.1, 5.4, 5.0, 6.0, 5.2, 6.4]} />
            <TrendCard l="Sucres" v="38" u="g/j" trend="↓ 4g" status="ok" data={[42, 45, 38, 40, 36, 35, 42]} />
          </>}
        </div>
      </PASection>

      <PASection title="Top aliments" code="fréquence">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '4px 0' }}>
          {[
            { n: 'Yaourt nature', m: '7 / 7 j', nova: 1 },
            { n: 'Pain complet', m: '6 / 7 j', nova: 2 },
            { n: 'Œuf entier', m: '5 / 7 j', nova: 1 },
            { n: 'Pomme', m: '5 / 7 j', nova: 1 },
            { n: 'Café noir', m: '14× cette semaine', nova: 2 },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 14px', borderBottom: i < 4 ? '1px solid var(--line)' : 'none' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-4)', width: 16 }}>{String(i+1).padStart(2,'0')}</span>
              <div style={{ flex: 1, fontSize: 13 }}>{a.n}</div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>{a.m}</span>
              <PANova score={a.nova} compact />
            </div>
          ))}
        </div>
      </PASection>

      <PASection title="Standout" code="meilleur / pire">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <StandoutCard type="best" day="Mer · 08" name="Bowl saumon - quinoa - légumes" score="92" attrs={[['NOVA', '1.2'], ['ω-3', 'top'], ['Hansel', '3/3']]} />
          <StandoutCard type="worst" day="Ven · 10" name="Pizza 4 fromages + soda" score="38" attrs={[['NOVA', '3.8'], ['AGS', '× 2.1'], ['Sel', '× 1.6']]} />
        </div>
      </PASection>

      <PASection title="Alertes scientifiques">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <SciAlert tone="alert" icon="!" title="Aucun poisson gras cette semaine" sub="EPA+DHA <0.1g/j. Recommandation EFSA : 250mg/j." />
          <SciAlert tone="warn" icon="↑" title="Sel > 5g/j à 4 reprises" sub="Sel moyen 4.6 g/j. Limite OMS : 5 g/j strict." />
          <SciAlert tone="ok" icon="✓" title="Diversité alimentaire excellente" sub="34 aliments distincts cette semaine. Cible CIQUAL : 30+." />
        </div>
      </PASection>
    </div>
  );
}

// ─── Monthly content ────────────────────────────
function MonthlyContent({ dense, label, is90j }) {
  return (
    <div style={{ padding: '0 16px 24px' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2 }}>Bilan {is90j ? '90 jours' : 'mensuel'}</div>
      </div>

      {/* composite score hero */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 16, padding: 16, marginBottom: 12, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, background: 'radial-gradient(circle, rgba(125,211,252,0.10), transparent 70%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
          <PARing value={74} target={100} size={104} stroke={6} color="var(--accent-2)">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 30, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>74</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-3)', marginTop: 3, letterSpacing: '0.08em' }}>SCORE / 100</div>
          </PARing>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>vs mois précédent</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 500, color: 'var(--ok)' }}>+ 9 pts</span>
              <span style={{ fontSize: 11, color: 'var(--text-3)' }}>de 65 à 74</span>
            </div>
            <div style={{ height: 32, position: 'relative', borderTop: '1px solid var(--line)', paddingTop: 8 }}>
              <PASpark values={[55,60,58,62,65,63,67,70,68,72,71,74]} w={170} h={28} color="var(--accent-2)" />
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, paddingTop: 14, marginTop: 14, borderTop: '1px solid var(--line)' }}>
          {[
            { l: 'NOVA', v: '1.9', sub: 'agrégé', c: 'var(--ok)' },
            { l: 'Hansel', v: '2.4', sub: '/ 3', c: 'var(--accent)' },
            { l: 'OMS / PNNS', v: '6 / 8', sub: 'cibles ok', c: 'var(--accent-2)' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{s.l}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 500, color: s.c, letterSpacing: '-0.02em' }}>{s.v}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{s.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* heatmap */}
      <PASection title="Cumul · 30 jours" code="score / jour">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 10 }}>
            {['L','M','M','J','V','S','D'].map((d, i) => (
              <div key={i} style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', textAlign: 'center' }}>{d}</div>
            ))}
            {Array.from({length: 30}).map((_, i) => {
              const score = [55,72,68,75,82,64,79, 71,80,65,77,52,88,70, 74,68,82,76,71,69,73, 78,72,84,77,80,76,78, 74,78][i];
              const c = score >= 80 ? 'var(--ok)' : score >= 65 ? 'var(--accent-2)' : score >= 50 ? 'var(--warn)' : 'var(--alert)';
              return (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 4, background: c, opacity: 0.18 + (score / 100) * 0.85, position: 'relative', border: i === 29 ? '1.5px solid var(--accent)' : 'none' }}>
                  <div style={{ position: 'absolute', top: 2, left: 3, fontFamily: 'var(--mono)', fontSize: 8, color: 'rgba(0,0,0,0.5)', fontWeight: 600 }}>{i+1}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 10, borderTop: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>SCORE</span>
            <div style={{ flex: 1, display: 'flex', gap: 2 }}>
              {[0.2, 0.4, 0.6, 0.8, 1].map((o, i) => (
                <div key={i} style={{ flex: 1, height: 8, borderRadius: 2, background: 'var(--accent-2)', opacity: o }} />
              ))}
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>0 → 100</span>
          </div>
        </div>
      </PASection>

      <PASection title="Indicateurs clés · 30 j">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <BigTrendCard l="kcal / jour" v="1 928" prev="1 875" sub="+ 53" up data={[1900,1850,1980,2050,1920,1880,1990,2040,1960,2080,1920,1880]} c="var(--accent)" />
          <BigTrendCard l="Sel" v="4.4 g" prev="5.1 g" sub="− 0.7 g" data={[5.4,5.2,5.0,4.9,4.6,4.4,4.7,4.5,4.3,4.4,4.2,4.4]} c="var(--ok)" />
          <BigTrendCard l="ω-6 / ω-3" v="5.2:1" prev="6.8:1" sub="− 1.6" data={[7.0,6.5,6.2,5.8,5.5,5.4,5.0,5.1,4.9,5.2,5.0,5.2]} c="var(--accent-2)" />
          <BigTrendCard l="Fibres" v="24 g" prev="19 g" sub="+ 5 g" up data={[18,20,22,21,24,23,25,22,24,25,26,24]} c="var(--ok)" />
        </div>
      </PASection>

      <PASection title="Objectifs · mai" code="6 / 8">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '4px 0' }}>
          {[
            { l: 'Score moyen > 70', ok: true, m: '74 atteint · 27 / 31 j' },
            { l: 'Sel < 5 g / jour', ok: true, m: '24 / 31 j ok' },
            { l: 'NOVA agrégé < 2.5', ok: true, m: '1.9 moyen' },
            { l: 'Fibres ≥ 25 g / jour', ok: false, m: '24 g moyen · 14 / 31 j' },
            { l: 'Poisson gras 2× / sem', ok: false, m: '6 fois en 4 sem' },
            { l: 'Diversité 25 aliments / sem', ok: true, m: '32 moyen' },
          ].map((o, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px', borderBottom: i < 5 ? '1px solid var(--line)' : 'none' }}>
              <div style={{
                width: 14, height: 14, borderRadius: 3,
                background: o.ok ? 'var(--ok-soft)' : 'var(--alert-soft)',
                border: `1px solid ${o.ok ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: o.ok ? 'var(--ok)' : 'var(--alert)', fontFamily: 'var(--mono)', fontSize: 9,
              }}>{o.ok ? '✓' : '×'}</div>
              <div style={{ flex: 1, fontSize: 12 }}>{o.l}</div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>{o.m}</span>
            </div>
          ))}
        </div>
      </PASection>

      <PASection title="Recommandations" code="patterns détectés">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <SciAlert tone="ok" icon="→" title="Continuer le poisson le mercredi" sub="Vos 3 meilleurs scores du mois incluent saumon ou sardine." />
          <SciAlert tone="warn" icon="→" title="Réduire le sel du dîner" sub="Médiane sel 19h-22h : 2.4 g (vs 1.5 g cible). Évitez plats préparés." />
          <SciAlert tone="warn" icon="→" title="Diversifier les ω-3" sub="Source actuelle : huile de colza seule. Ajouter noix ou graines de lin." />
        </div>
      </PASection>
    </div>
  );
}

// ─── History content ───────────────────────────
function HistoryContent() {
  const items = [
    { d: 'Lun. 12 mai', i: [
      { t: '16:22', n: 'Pomme + amandes', k: 228, nova: 1 },
      { t: '12:48', n: 'Salade quinoa-feta', k: 628, nova: 2 },
      { t: '08:14', n: 'Tartines avocat + œuf', k: 412, nova: 2 },
    ]},
    { d: 'Dim. 11 mai', i: [
      { t: '20:08', n: 'Pâtes carbonara maison', k: 720, nova: 2 },
      { t: '13:02', n: 'Risotto champignons', k: 540, nova: 2 },
      { t: '09:30', n: 'Granola maison + fruits rouges', k: 386, nova: 2 },
    ]},
    { d: 'Sam. 10 mai', i: [
      { t: '19:55', n: 'Pizza 4 fromages', k: 880, nova: 4 },
      { t: '12:30', n: 'Sandwich poulet crudités', k: 510, nova: 3 },
    ]},
  ];

  return (
    <div style={{ padding: '0 16px 24px' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Historique</div>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2 }}>148 analyses</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>depuis le 02 fév. 2026</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 10, marginBottom: 14 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--text-3)" strokeWidth="1.5"><circle cx="6" cy="6" r="4"/><path d="M9 9l3 3"/></svg>
        <span style={{ flex: 1, fontSize: 12, color: 'var(--text-3)' }}>Rechercher un aliment, un score, une date</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', padding: '2px 5px', background: 'var(--bg-canvas)', borderRadius: 3 }}>⌘K</span>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflow: 'hidden' }}>
        {['Tout', 'NOVA ≤ 2', 'Hansel 3/3', 'Sel ↑', '7 j'].map((c, i) => (
          <div key={c} style={{
            padding: '5px 10px',
            background: i === 0 ? 'var(--accent-soft)' : 'var(--bg-surface)',
            border: `1px solid ${i === 0 ? 'var(--accent-line)' : 'var(--line)'}`,
            color: i === 0 ? 'var(--accent)' : 'var(--text-2)',
            fontFamily: 'var(--mono)', fontSize: 10, borderRadius: 6,
            whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.04em',
            cursor: 'pointer',
          }}>{c}</div>
        ))}
      </div>

      {items.map((day, di) => (
        <div key={di} style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 4px 8px', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            <span>{day.d}</span>
            <span style={{ color: 'var(--text-4)' }}>{day.i.length} repas · {day.i.reduce((s,x) => s+x.k, 0)} kcal</span>
          </div>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
            {day.i.map((m, mi) => (
              <div key={mi} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderBottom: mi < day.i.length-1 ? '1px solid var(--line)' : 'none' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', width: 38 }}>{m.t}</span>
                <div style={{ flex: 1, minWidth: 0, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.n}</div>
                <PANova score={m.nova} compact />
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-1)', width: 50, textAlign: 'right' }}>{m.k}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Sub-components ────────────────────────────

function SegmentDonut({ size = 80, segments, center }) {
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {segments.map((s, i) => {
          const len = (s.v / 100) * c;
          const el = (
            <circle key={i} cx={size/2} cy={size/2} r={r} fill="none"
              stroke={s.c} strokeWidth={8}
              strokeDasharray={`${len} ${c}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {center}
      </div>
    </div>
  );
}

function MacroLegend({ c, l, v, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 8, height: 8, borderRadius: 2, background: c, flexShrink: 0 }} />
      <div style={{ flex: 1, fontSize: 12, color: 'var(--text-1)' }}>{l}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500 }}>{v}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>{sub}</span>
      </div>
    </div>
  );
}

function TrendCard({ l, v, u, trend, status, data }) {
  const colors = { ok: 'var(--ok)', warn: 'var(--warn)', alert: 'var(--alert)' };
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 10, padding: 11 }}>
      <span style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 500 }}>{l}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, margin: '6px 0' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 17, fontWeight: 500, color: colors[status], letterSpacing: '-0.02em' }}>{v}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{u}</span>
      </div>
      <PASpark values={data} w={140} h={20} color={colors[status]} />
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', marginTop: 4 }}>{trend}</div>
    </div>
  );
}

function BigTrendCard({ l, v, prev, sub, up, data, c }) {
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderRadius: 10, padding: 12 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 4, marginBottom: 8 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>{v}</span>
      </div>
      <PASpark values={data} w={148} h={28} color={c} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 6 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>M−1: {prev}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: c }}>{up ? '↑' : '↓'} {sub}</span>
      </div>
    </div>
  );
}

function StandoutCard({ type, day, name, score, attrs }) {
  const isBest = type === 'best';
  const c = isBest ? 'var(--ok)' : 'var(--alert)';
  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', borderLeft: `2px solid ${c}`, borderRadius: 8, padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: c, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{isBest ? '★ Meilleur' : '↓ Pire'}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 500, color: c }}>{score}</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.3, marginBottom: 4, height: 32, overflow: 'hidden' }}>{name}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', marginBottom: 8 }}>{day}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, paddingTop: 8, borderTop: '1px solid var(--line)' }}>
        {attrs.map((a, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 9 }}>
            <span style={{ color: 'var(--text-3)' }}>{a[0]}</span>
            <span style={{ color: 'var(--text-1)' }}>{a[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SciAlert({ tone, icon, title, sub }) {
  const colors = { ok: 'var(--ok)', warn: 'var(--warn)', alert: 'var(--alert)' };
  const bg = tone === 'ok' ? 'var(--ok-soft)' : tone === 'warn' ? 'var(--warn-soft)' : 'var(--alert-soft)';
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px',
      background: 'var(--bg-surface)', border: '1px solid var(--line)',
      borderLeft: `2px solid ${colors[tone]}`, borderRadius: 6,
    }}>
      <div style={{ width: 18, height: 18, borderRadius: 4, background: bg, color: colors[tone], display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>{sub}</div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenStats });
