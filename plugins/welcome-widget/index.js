import React from 'react'

import styles from './welcome.css'

function Welcome() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Willkommen zu Terminofeu</h2>
        <h3 className={styles.subtitle}>Begriffsmanagment für die BSV 2026</h3>
      </header>
      <div className={styles.content}>
        <a
          className={styles.link}
          target="_blank"
          href="https://www.notion.so/terminofeu-Handbuch-e13f172c758b418c9e603d482462a58d"
        >
          Handbuch lesen
        </a>
        <span className={styles.separator}>|</span>
        <a className={styles.link} target="_blank" href="https://terminofeu.ch">
          terminofeu.ch öffnen
        </a>
      </div>
    </div>
  )
}

export default {
  name: 'welcome',
  component: Welcome,
}
