// import the default document badge resolver
import defaultResolve from 'part:@sanity/base/document-badges'

import { TranslationBadge } from './workflows/TranslationBadge'

export default function resolveDocumentBadges(props) {
  if (props.type !== 'entry') {
    return defaultResolve(props)
  }

  const status = props?.published?.translationStatus

  if (status === 'in_translation') {
    return [...defaultResolve(props), TranslationBadge]
  } else {
    return defaultResolve(props)
  }
}
