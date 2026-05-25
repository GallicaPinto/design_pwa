// Plate Analyzer — main app: phone frame + screen selector + tweaks

const { useState, useEffect } = React;

const SCREENS = [
  { group: 'Onboarding', code: '00', items: [
    { id: 'welcome',      label: 'Bienvenue',       sub: '01/04', Component: ScreenWelcome,      bg: 'canvas', notes: 'Premier contact · branding et promesse scientifique.' },
    { id: 'demographics', label: 'Caractéristiques',sub: '02/04', Component: ScreenDemographics, bg: 'canvas', notes: 'Démographie pour ajuster les seuils. Calcul Mifflin-St Jeor en direct.' },
    { id: 'goals',        label: 'Objectifs',        sub: '03/04', Component: ScreenGoals,        bg: 'canvas', notes: 'Objectif pondéral + surveillance pathologique. Cibles adaptées.' },
    { id: 'permissions',  label: 'Autorisations',    sub: '04/04', Component: ScreenPermissions,  bg: 'canvas', notes: 'Permissions in-context. Sources scientifiques listées.' },
  ]},
  { group: 'Quotidien', code: '01', items: [
    { id: 'today',   label: "Aujourd'hui",    sub: 'dashboard',  Component: ScreenToday,   tab: 'today',   notes: 'Composite score · kcal + macros · indicateurs vs PNNS · repas · alertes contextuelles.' },
    { id: 'capture', label: 'Capturer',       sub: 'viseur',     Component: ScreenCapture, tab: 'capture', noStatusBar: true, noTabBar: true, notes: 'Plein écran caméra · cadrage assisté · conseils contextuels.' },
    { id: 'loading', label: 'Analyse',        sub: 'pipeline',   Component: ScreenLoading, noStatusBar: true, noTabBar: true, notes: 'Étapes scientifiques visibles : vision → CIQUAL → chooser → scoring.' },
    { id: 'result',  label: 'Résultat',       sub: 'détail',     Component: ScreenResult,  notes: 'Aliments éditables · NOVA · indicateurs OMS · ω-6/ω-3 · règles Hansel.' },
  ]},
  { group: 'Stats & historique', code: '02', items: [
    { id: 'weekly',  label: 'Récap semaine', sub: 'S19',         Component: ScreenWeekly,  tab: 'stats', notes: 'Mini-graphes 7 jours · moyennes · top aliments · standout · alertes.' },
    { id: 'monthly', label: 'Récap mois',    sub: 'mai 2026',    Component: ScreenMonthly, tab: 'stats', notes: 'Score composite · heatmap 30j · trends · objectifs · recos.' },
    { id: 'history', label: 'Historique',    sub: '148 analyses', Component: ScreenHistory, tab: 'stats', notes: 'Liste filtrée par jour · recherche · filtres par score / nutriment.' },
  ]},
  { group: 'Compte', code: '03', items: [
    { id: 'profile', label: 'Profil',  sub: 'grand public', Component: ScreenProfile, tab: 'profile', notes: 'Objectifs + démographie + paramètres + RGPD.' },
  ]},
  { group: 'Mode pro · cabinet', code: '04', items: [
    { id: 'pro',          label: 'Liste patients',    sub: '4 actifs',      Component: ScreenProfile,         tab: 'profile', proMode: true, notes: 'Accès racine du praticien : ses patients, alertes longitudinales, paramètres cabinet.' },
    { id: 'patient',      label: 'Détail patient',    sub: 'M. Bernard',    Component: ScreenPatientDetail,                 notes: 'Contexte clinique (biomarqueurs + traitements), score 30j, signaux à seuils, derniers repas annotés, objectifs prescrits par pathologie.' },
    { id: 'compare',      label: 'Comparaison',       sub: 'avant / après', Component: ScreenPatientCompare,                notes: 'Compare 2 périodes autour d’une intervention : delta score, tableau 8 indicateurs, courbes superposées, synthèse IA à valider.' },
    { id: 'notes',        label: 'Notes cliniques',   sub: '8 entrées',     Component: ScreenClinicalNotes,                 notes: 'Timeline d’annotations tagées (intervention / observation / éducation / objectif) avec liens vers analyses + objectifs prescrits.' },
    { id: 'pdf',          label: 'Compte-rendu PDF',  sub: 'preview',       Component: ScreenPDFReport,                     notes: 'Aperçu du CR généré (modèle AP-HP) + sélecteur de sections à inclure.' },
    { id: 'share',        label: 'Partage sécurisé',  sub: '1 actif',       Component: ScreenSecureShare,                   notes: 'Génération de liens chiffrés (AES-256), QR, PIN, consentement RGPD, historique.' },
  ]},
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "default",
  "accent": "lavender",
  "proMode": false
}/*EDITMODE-END*/;

const ACCENTS = {
  lavender: { primary: '#c4b5fd', secondary: '#7dd3fc' },
  cyan:     { primary: '#7dd3fc', secondary: '#c4b5fd' },
  emerald:  { primary: '#86efac', secondary: '#fcd34d' },
  amber:    { primary: '#fcd34d', secondary: '#fdba74' },
};

function applyAccent(name) {
  const a = ACCENTS[name] || ACCENTS.lavender;
  const r = document.documentElement.style;
  r.setProperty('--accent', a.primary);
  r.setProperty('--accent-2', a.secondary);
  // recompute soft / line from primary
  const hex2rgb = (h) => {
    const x = h.replace('#','');
    return [parseInt(x.substr(0,2),16), parseInt(x.substr(2,2),16), parseInt(x.substr(4,2),16)];
  };
  const [r1,g1,b1] = hex2rgb(a.primary);
  const [r2,g2,b2] = hex2rgb(a.secondary);
  r.setProperty('--accent-soft', `rgba(${r1},${g1},${b1},0.14)`);
  r.setProperty('--accent-line', `rgba(${r1},${g1},${b1},0.32)`);
  r.setProperty('--accent-2-soft', `rgba(${r2},${g2},${b2},0.14)`);
  r.setProperty('--accent-2-line', `rgba(${r2},${g2},${b2},0.32)`);
}

function App() {
  const [activeId, setActiveId] = useState('today');
  const [t, setTweak] = (typeof useTweaks !== 'undefined' ? useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}]);

  useEffect(() => { applyAccent(t.accent); }, [t.accent]);

  // flatten
  const flat = SCREENS.flatMap(g => g.items);
  const active = flat.find(s => s.id === activeId) || flat[0];
  const Comp = active.Component;
  const dense = t.density === 'detail';
  const proMode = active.proMode || (active.id === 'profile' && t.proMode);

  const idx = flat.findIndex(s => s.id === activeId);
  const total = flat.length;

  return (
    <>
      <div className="bg-grid" />
      <div className="page">
        {/* ── left rail ─────────────────── */}
        <div className="rail">
          <div className="rail-brand">
            <div className="rail-brand-mark" />
            <div>
              <div className="rail-brand-name">Plate Analyzer</div>
              <div className="rail-brand-sub">CIQUAL · NOVA · OMS</div>
            </div>
          </div>
          {SCREENS.map(g => (
            <div key={g.code} className="rail-group">
              <div className="rail-group-head">
                <span>{g.group}</span>
                <span>· {g.code}</span>
              </div>
              {g.items.map(it => (
                <div key={it.id}
                  className={`rail-item ${activeId === it.id ? 'active' : ''}`}
                  onClick={() => setActiveId(it.id)}>
                  <span className="rail-item-num">{String(flat.findIndex(x => x.id === it.id) + 1).padStart(2, '0')}</span>
                  <span className="rail-item-name">{it.label}</span>
                  <span className="rail-item-meta">{it.sub}</span>
                </div>
              ))}
            </div>
          ))}

          <div style={{ paddingTop: 16, borderTop: '1px solid var(--line)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.55 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Pipeline cible</div>
            Photo → Vision IA → Match CIQUAL → LLM Chooser → Scoring → Postgres. Latence cible 10-12 s.
          </div>
        </div>

        {/* ── center stage ──────────────── */}
        <div className="stage">
          <div className="stage-header">
            <div>
              <div className="stage-subtitle">{active.sub}</div>
              <div className="stage-title">{active.label}</div>
            </div>
            <div className="stage-meta">
              <div className="stage-meta-num">{String(idx + 1).padStart(2, '0')} <span style={{ color: 'var(--text-3)' }}>/ {String(total).padStart(2, '0')}</span></div>
              <div style={{ marginTop: 2, fontSize: 10 }}>écran</div>
            </div>
          </div>

          <div className="phone-mount" data-screen-label={`${String(idx + 1).padStart(2, '0')} ${active.label}`}>
            <div className="phone-mount-base" />
            <PAPhone
              statusBar={!active.noStatusBar}
              tabBar={active.noTabBar ? null : (active.tab ? <PATabBar active={active.tab} onChange={(id) => {
                const map = { today: 'today', capture: 'capture', stats: 'weekly', profile: t.proMode ? 'pro' : 'profile' };
                if (map[id]) setActiveId(map[id]);
              }} /> : (active.id === 'pro' || active.id === 'patient' || active.id === 'compare' || active.id === 'notes' || active.id === 'pdf' || active.id === 'share' ? <PATabBar active="profile" onChange={(id) => {
                const map = { today: 'today', capture: 'capture', stats: 'weekly', profile: 'pro' };
                if (map[id]) setActiveId(map[id]);
              }} /> : null))}
              bg={active.bg === 'canvas' ? 'var(--bg-canvas)' : 'var(--bg-canvas)'}
            >
              <Comp dense={dense} proMode={proMode} />
            </PAPhone>
          </div>
        </div>

        {/* ── right rail ────────────────── */}
        <div className="spec">
          <div className="spec-card">
            <div className="spec-card-head">
              <span>Cet écran</span>
              <span style={{ color: 'var(--text-4)' }}>{active.id.toUpperCase()}</span>
            </div>
            <div className="spec-note">{active.notes}</div>
          </div>

          <div className="spec-card">
            <div className="spec-card-head">
              <span>Spec</span>
              <span style={{ color: 'var(--text-4)' }}>iPhone 14 Pro</span>
            </div>
            <div className="spec-row"><span className="spec-key">Frame</span><span className="spec-val">390 × 844</span></div>
            <div className="spec-row"><span className="spec-key">Safe area</span><span className="spec-val">44 / 34 px</span></div>
            <div className="spec-row"><span className="spec-key">Touch min</span><span className="spec-val">44 × 44</span></div>
            <div className="spec-row"><span className="spec-key">Grille</span><span className="spec-val">4 pt</span></div>
            <div className="spec-row"><span className="spec-key">Type</span><span className="spec-val">Inter · Plex Mono</span></div>
          </div>

          <div className="spec-card">
            <div className="spec-card-head">
              <span>Tokens</span>
              <span style={{ color: 'var(--text-4)' }}>core</span>
            </div>
            <Swatch c="var(--accent)" n="accent" code={t.accent === 'lavender' ? '#c4b5fd' : t.accent === 'cyan' ? '#7dd3fc' : t.accent === 'emerald' ? '#86efac' : '#fcd34d'} />
            <Swatch c="var(--accent-2)" n="accent-2" code={t.accent === 'lavender' ? '#7dd3fc' : t.accent === 'cyan' ? '#c4b5fd' : t.accent === 'emerald' ? '#fcd34d' : '#fdba74'} />
            <Swatch c="var(--ok)" n="status / ok" code="#4ade80" />
            <Swatch c="var(--warn)" n="status / warn" code="#fbbf24" />
            <Swatch c="var(--alert)" n="status / alert" code="#f87171" />
            <Swatch c="var(--bg-canvas)" n="bg / canvas" code="#0b0e13" />
          </div>

          <div className="spec-card">
            <div className="spec-card-head">
              <span>Densité dataviz</span>
              <span style={{ color: 'var(--text-4)' }}>local</span>
            </div>
            <div className="density-toggle">
              <button className={t.density === 'default' ? 'active' : ''} onClick={() => setTweak('density', 'default')}>Sobre</button>
              <button className={t.density === 'detail' ? 'active' : ''} onClick={() => setTweak('density', 'detail')}>Détail</button>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 10, lineHeight: 1.5 }}>
              Bascule entre les <b style={{ color: 'var(--text-1)' }}>6 indicateurs essentiels</b> et la grille complète (39 nutriments visibles).
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Swatch({ c, n, code }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', borderBottom: '1px solid var(--line)' }}>
      <div style={{ width: 14, height: 14, borderRadius: 4, background: c, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }} />
      <span style={{ flex: 1, fontSize: 11, color: 'var(--text-2)' }}>{n}</span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>{code}</span>
    </div>
  );
}

// Tweaks panel
function PATweaks() {
  if (typeof TweaksPanel === 'undefined') return null;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Apparence">
        <TweakRadio label="Densité"
          value={t.density}
          options={[{value: 'default', label: 'Sobre'}, {value: 'detail', label: 'Détail'}]}
          onChange={(v) => setTweak('density', v)} />
        <TweakSelect label="Accent"
          value={t.accent}
          options={[
            { value: 'lavender', label: 'Lavande + cyan' },
            { value: 'cyan', label: 'Cyan + lavande' },
            { value: 'emerald', label: 'Vert + ambre' },
            { value: 'amber', label: 'Ambre + orange' },
          ]}
          onChange={(v) => setTweak('accent', v)} />
      </TweakSection>
      <TweakSection label="Variante de compte">
        <TweakToggle label="Mode pro (praticien)" value={t.proMode} onChange={(v) => setTweak('proMode', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<><App /><PATweaks /></>);
