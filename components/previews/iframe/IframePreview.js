/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './IframePreview.css'
import { assemblePageUrl } from '../frontendUtils'

class IframePreview extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    document: null,
  }

  render() {
    const { options } = this.props
    const { displayed } = this.props.document
    if (!displayed) {
      return (
        <div className={styles.componentWrapper}>
          <p>There is no document to preview</p>
        </div>
      )
    }

    if(displayed._id.startsWith('drafts')) {
      return (
        <div className={styles.componentWrapper}>
          <p>Sie müssen zuerst den Eintrag veröffentlichen, damit sie die Vorschau aktivieren können.</p>
        </div>
      )
    }

    const url = assemblePageUrl(displayed, options)

    if (!url) {
      return (
        <div className={styles.componentWrapper}>
          <p>Hmm. Having problems constructing the web front-end URL.</p>
        </div>
      )
    }

    return (
      <div className={styles.componentWrapper}>
        <div className={styles.iframeContainer}>
          <iframe src={url} frameBorder={'0'} />
        </div>
      </div>
    )
  }
}

export default IframePreview
