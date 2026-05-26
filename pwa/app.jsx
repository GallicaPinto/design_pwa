// Plate Analyzer — App router

function App() {
  const [stack, setStack] = React.useState(['welcome']);
  const [proMode] = React.useState(false);
  const [dense] = React.useState(false);

  const current = stack[stack.length - 1];

  function navigate(screen) {
    setStack(prev => [...prev, screen]);
  }

  function back() {
    setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  }

  function goTab(screen) {
    if (screen === 'capture') {
      // push capture on top of the current tab screen so back() returns to it
      const base = stack.filter(s => ['today', 'stats', 'profile'].includes(s));
      setStack([...(base.length ? [base[base.length - 1]] : ['today']), 'capture']);
    } else {
      setStack([screen]);
    }
  }

  const isOnboarding = ['welcome', 'demographics', 'goals', 'permissions'].includes(current);
  const showTabBar = ['today', 'stats', 'profile'].includes(current);
  const showStatusBar = !isOnboarding && current !== 'capture';

  // which tab icon to highlight (capture screen keeps 'capture' highlighted)
  const activeTab = ['today', 'stats', 'profile'].includes(current) ? current : 'capture';

  function renderScreen() {
    switch (current) {
      case 'welcome':        return <ScreenWelcome navigate={navigate} />;
      case 'demographics':   return <ScreenDemographics navigate={navigate} />;
      case 'goals':          return <ScreenGoals navigate={navigate} />;
      case 'permissions':    return <ScreenPermissions navigate={navigate} />;
      case 'today':          return <ScreenToday navigate={navigate} dense={dense} />;
      case 'capture':        return <ScreenCapture navigate={navigate} back={back} />;
      case 'loading':        return <ScreenLoading navigate={navigate} />;
      case 'result':         return <ScreenResult back={back} dense={dense} />;
      case 'stats':          return <ScreenStats navigate={navigate} dense={dense} />;
      case 'profile':        return <ScreenProfile navigate={navigate} proMode={proMode} />;
      case 'patient-detail': return <ScreenPatientDetail back={back} />;
      case 'holistic':       return <ScreenHolistic navigate={navigate} back={back} />;
      case 'journal':        return <ScreenJournalEntry back={back} />;
      case 'mindful':        return <ScreenMindful back={back} />;
      case 'glycemia':       return <ScreenGlycemia back={back} />;
      case 'plants':         return <ScreenPlantDiversity back={back} />;
      case 'fasting':        return <ScreenFastingWindow back={back} />;
      case 'correl':         return <ScreenCorrelations back={back} />;
      case 'inflam':         return <ScreenInflammation back={back} />;
      default:               return <ScreenToday navigate={navigate} dense={dense} />;
    }
  }

  const now = new Date();
  const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

  return (
    <div className="app-shell">
      {showStatusBar && <PAStatusBar time={timeStr} />}

      <div className="screen-scroll" key={current}>
        {renderScreen()}
      </div>

      {showTabBar && (
        <PATabBar active={activeTab} onChange={goTab} />
      )}

      <div className="home-indicator" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
