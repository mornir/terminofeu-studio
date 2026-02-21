function Welcome() {
  return (
    <div style={{ padding: '1rem' }}>
      <header>
        <h1>Terminofeu</h1>
        <h2>Begriffsmanagment für die BSV 2026</h2>
      </header>
    </div>
  )
}

export const welcomeWidget = {
  name: 'welcome-widget',
  component: Welcome,
  layout: { width: 'full' },
}
