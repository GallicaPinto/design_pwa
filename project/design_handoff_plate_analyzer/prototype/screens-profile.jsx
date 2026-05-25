// Plate Analyzer — Profile + Pro mode (patient list)

function ScreenProfile({ proMode = false }) {
  return (
    <div style={{ padding: '8px 16px 24px' }}>
      <div style={{ paddingTop: 6, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{proMode ? 'Compte praticien' : 'Compte'}</div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2 }}>Profil</div>
        </div>
        {proMode && <PAPill status="accent" dot>Mode pro</PAPill>}
      </div>

      {/* identity card */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--line)',
        borderRadius: 14, padding: 14, marginBottom: 12,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 13,
          background: 'linear-gradient(135deg, var(--accent-soft), var(--accent-2-soft))',
          border: '1px solid var(--accent-line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--mono)', fontSize: 18, color: 'var(--accent)', fontWeight: 500,
        }}>{proMode ? 'BH' : 'CL'}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{proMode ? 'Dr. Boris Hansel' : 'Camille L.'}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>{proMode ? 'Endocrinologue · AP-HP' : 'camille@example.com'}</div>
        </div>
        <button style={{ padding: '6px 10px', background: 'var(--bg-canvas)', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--text-2)', fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Éditer</button>
      </div>

      {proMode ? <PatientList /> : <PersonalProfile />}

      {/* settings */}
      <PASection title="Paramètres" code="système">
        <SettingsGroup rows={[
          { l: 'Notifications', r: '1 rappel / j', icon: 'bell' },
          { l: 'Apparence', r: 'Sombre · auto', icon: 'sun' },
          { l: 'Unités', r: 'g · kcal', icon: 'unit' },
          { l: 'Langue', r: 'Français', icon: 'lang' },
        ]} />
      </PASection>

      <PASection title="Données" code="RGPD">
        <SettingsGroup rows={[
          { l: 'Export complet (JSON)', r: '148 analyses', icon: 'down' },
          { l: 'Export PDF mensuel', r: 'mai 2026', icon: 'pdf' },
          { l: 'Sources scientifiques', r: '5 références', icon: 'book' },
          { l: 'Politique de confidentialité', r: 'v 1.2', icon: 'lock' },
          { l: 'Supprimer mon compte', r: '', icon: 'trash', danger: true },
        ]} />
      </PASection>

      {/* footer */}
      <div style={{
        marginTop: 12, padding: '14px 12px',
        textAlign: 'center',
        fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)',
        lineHeight: 1.6,
      }}>
        PLATE ANALYZER · v 0.9.2 (build 1487)<br />
        © 2026 · n'est pas un dispositif médical
      </div>
    </div>
  );
}

function PersonalProfile() {
  return (
    <>
      {/* objective */}
      <PASection title="Objectifs" action="Éditer">
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--line)',
          borderRadius: 12, padding: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Objectif pondéral</div>
              <div style={{ fontSize: 15, fontWeight: 500, marginTop: 4 }}>Stabiliser</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cible kcal</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 4, justifyContent: 'flex-end' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 17, fontWeight: 500 }}>2 148</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>kcal / j</span>
              </div>
            </div>
          </div>

          {/* macros pills */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
            {[
              { l: 'Protéines', v: '20%', s: '108g', c: 'var(--accent)' },
              { l: 'Glucides',  v: '45%', s: '241g', c: 'var(--accent-2)' },
              { l: 'Lipides',   v: '35%', s: '83g',  c: 'var(--warn)' },
            ].map((m, i) => (
              <div key={i} style={{
                padding: '8px 6px',
                background: 'var(--bg-canvas)',
                border: '1px solid var(--line)',
                borderRadius: 7, textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase' }}>{m.l}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 500, color: m.c, marginTop: 3 }}>{m.v}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)', marginTop: 2 }}>{m.s}</div>
              </div>
            ))}
          </div>

          {/* concerns */}
          <div style={{ paddingTop: 12, marginTop: 12, borderTop: '1px solid var(--line)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Surveillance & régime</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              <Tag c="var(--alert)" l="Cholestérolémie" s="AGS ≤ 7%" />
              <Tag c="var(--accent-2)" l="Méditerranéen" />
              <Tag c="var(--ok)" l="Sport endurance" s="3×/sem" />
            </div>
          </div>
        </div>
      </PASection>

      {/* demographics */}
      <PASection title="Démographie" code="Mifflin-St Jeor">
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--line)',
          borderRadius: 12, padding: 14,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 12 }}>
            <DemoStat l="Âge" v="34" u="ans" />
            <DemoStat l="Sexe" v="F" />
            <DemoStat l="Taille" v="168" u="cm" />
            <DemoStat l="Poids" v="62.4" u="kg" />
          </div>
          <div style={{ paddingTop: 12, borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <DemoStat l="IMC" v="22.1" u="" status="ok" />
            <DemoStat l="MB" v="1 386" u="kcal" />
            <DemoStat l="Activité" v="×1.55" u="" />
          </div>
        </div>
      </PASection>
    </>
  );
}

function PatientList() {
  const patients = [
    { name: 'M. Bernard, 58 ans', tag: 'HTA · DT2', score: 64, trend: [55,58,60,62,61,64,66,64], status: 'warn', last: 'il y a 2j', count: 47 },
    { name: 'Mme Dupont, 42 ans', tag: 'Surpoids', score: 78, trend: [60,62,68,72,74,76,77,78], status: 'ok', last: 'aujourd\'hui', count: 89 },
    { name: 'M. Laurent, 71 ans', tag: 'Post-AVC · DLP', score: 52, trend: [70,65,60,55,58,50,52,52], status: 'alert', last: 'hier', count: 24 },
    { name: 'Mme Faure, 36 ans', tag: 'Grossesse T2', score: 84, trend: [78,80,82,81,83,84,85,84], status: 'ok', last: 'aujourd\'hui', count: 62 },
  ];

  return (
    <>
      <PASection title="Patients suivis" action="+ Nouveau" code="4 / 4 actifs">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {patients.map((p, i) => {
            const c = p.status === 'ok' ? 'var(--ok)' : p.status === 'warn' ? 'var(--warn)' : 'var(--alert)';
            return (
              <div key={i} style={{
                background: 'var(--bg-surface)', border: '1px solid var(--line)',
                borderRadius: 10, padding: 12,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'var(--bg-raised)', border: '1px solid var(--line)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-2)',
                  flexShrink: 0,
                }}>{p.name.split(' ')[0][0]}{p.name.split(' ')[1][0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{p.tag}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-4)' }}>·</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{p.count} analyses</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <PASpark values={p.trend} w={42} h={20} color={c} dotLast={false} />
                  <div style={{ textAlign: 'right', minWidth: 32 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 500, color: c }}>{p.score}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--text-4)', marginTop: 1 }}>{p.last}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PASection>

      {/* alerts (pro) */}
      <PASection title="Alertes patients" code="3 en cours">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <ProAlert n="M. Laurent" sub="Score −18 pts en 7j. Sel moyen 7.2g/j." status="alert" />
          <ProAlert n="M. Bernard" sub="Glycémie estimée ↑ (sucres+22%). RDV ?" status="warn" />
          <ProAlert n="Mme Dupont" sub="Cap des 80 pts atteint pour la 1ʳᵉ fois." status="ok" />
        </div>
      </PASection>

      {/* practice info */}
      <PASection title="Cabinet" code="paramètres pro">
        <SettingsGroup rows={[
          { l: 'Cabinet', r: 'Hôpital Bichat · Diabéto', icon: 'work' },
          { l: 'RPPS', r: '10 0034 0987', icon: 'id' },
          { l: 'Partage sécurisé', r: 'Liens 7 j · chiffrés', icon: 'lock' },
          { l: 'Modèle CR PDF', r: 'AP-HP · Endocrino', icon: 'pdf' },
        ]} />
      </PASection>
    </>
  );
}

function DemoStat({ l, v, u, status }) {
  const colors = { ok: 'var(--ok)', warn: 'var(--warn)', alert: 'var(--alert)' };
  return (
    <div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{l}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 500, letterSpacing: '-0.02em', color: status ? colors[status] : 'var(--text-1)' }}>{v}</span>
        {u && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{u}</span>}
      </div>
    </div>
  );
}

function Tag({ c, l, s }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 8px',
      background: 'var(--bg-canvas)',
      border: '1px solid var(--line)',
      borderRadius: 5,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: c }} />
      <span style={{ fontSize: 11, color: 'var(--text-1)', fontWeight: 500 }}>{l}</span>
      {s && <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text-3)' }}>{s}</span>}
    </div>
  );
}

function SettingsGroup({ rows }) {
  return (
    <div style={{
      background: 'var(--bg-surface)', border: '1px solid var(--line)',
      borderRadius: 12, overflow: 'hidden',
    }}>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '11px 14px',
          borderBottom: i < rows.length-1 ? '1px solid var(--line)' : 'none',
          color: r.danger ? 'var(--alert)' : 'var(--text-1)',
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 5,
            background: r.danger ? 'var(--alert-soft)' : 'var(--bg-raised)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: r.danger ? 'var(--alert)' : 'var(--text-2)',
            flexShrink: 0,
          }}>
            <SettingIcon name={r.icon} />
          </div>
          <span style={{ flex: 1, fontSize: 13 }}>{r.l}</span>
          {r.r && <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>{r.r}</span>}
          {!r.danger && <svg width="6" height="10" viewBox="0 0 6 10" style={{ flexShrink: 0, opacity: 0.4 }}><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>}
        </div>
      ))}
    </div>
  );
}

function SettingIcon({ name }) {
  const s = { width: 12, height: 12, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 };
  switch (name) {
    case 'bell': return <svg {...s} viewBox="0 0 24 24"><path d="M6 19V11a6 6 0 0112 0v8M3 19h18M10 22h4"/></svg>;
    case 'sun': return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>;
    case 'unit': return <svg {...s} viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h12"/></svg>;
    case 'lang': return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg>;
    case 'down': return <svg {...s} viewBox="0 0 24 24"><path d="M12 4v12M6 14l6 6 6-6M4 22h16"/></svg>;
    case 'pdf': return <svg {...s} viewBox="0 0 24 24"><path d="M6 2h10l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M14 2v6h6"/></svg>;
    case 'book': return <svg {...s} viewBox="0 0 24 24"><path d="M4 4h7a4 4 0 014 4v12H8a4 4 0 01-4-4V4zM20 4h-7a4 4 0 00-4 4v12h7a4 4 0 004-4V4z"/></svg>;
    case 'lock': return <svg {...s} viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="11" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>;
    case 'trash': return <svg {...s} viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13"/></svg>;
    case 'work': return <svg {...s} viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M9 7V4h6v3"/></svg>;
    case 'id': return <svg {...s} viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M14 10h4M14 14h4"/></svg>;
    default: return null;
  }
}

function ProAlert({ n, sub, status }) {
  const colors = { ok: 'var(--ok)', warn: 'var(--warn)', alert: 'var(--alert)' };
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
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-1)', marginBottom: 2 }}>{n}</div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>{sub}</div>
      </div>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: colors[status], textTransform: 'uppercase' }}>→</span>
    </div>
  );
}

Object.assign(window, { ScreenProfile });
