import React from 'react'
import PropTypes from 'prop-types'

import styles from './welcome.css'

class Welcome extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Willkomen zu terminofeu</h2>
          <h3>Begriffsmanagment für die BSV 2026</h3>
        </header>
        <div className={styles.content}>
          <a
            rel="noopener nofollow"
            target="_blank"
            href="https://www.notion.so/terminofeu-Handbuch-e13f172c758b418c9e603d482462a58d"
          >
            Handbuch lesen
          </a>
        </div>
      </div>
    )
  }
}

export default {
  name: 'welcome',
  component: Welcome,
}
