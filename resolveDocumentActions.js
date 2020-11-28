import defaultResolve from 'part:@sanity/base/document-actions'

import { setEntryTitlesAction } from './workflows/setEntryTitlesAction'

export default function resolveDocumentActions(props) {
  return [...defaultResolve(props), setEntryTitlesAction]
}
