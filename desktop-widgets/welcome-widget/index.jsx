import React from 'react'

function Welcome() {
  return (
    <div>
      <header>
        <h2>Willkommen zu Terminofeu</h2>
        <h3>Begriffsmanagment für die BSV 2026</h3>
      </header>
      <div>
        <a
          target="_blank"
          href="https://www.notion.so/terminofeu-Handbuch-e13f172c758b418c9e603d482462a58d"
        >
          Handbuch lesen
        </a>
        <span>|</span>
        <a target="_blank" href="https://terminofeu.ch">
          terminofeu.ch öffnen
        </a>
      </div>
    </div>
  )
}

export const welcomeWidget = {
  name: 'welcome-widget',
  component: Welcome,
  layout: { width: 'full' },
}
