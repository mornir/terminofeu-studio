import defaultResolve from 'part:@sanity/base/document-actions'

import { setEntryTitlesAction } from './workflows/setEntryTitlesAction'

import { helloWorldAction } from './workflows/helloWorldAction'

export default function resolveDocumentActions(props) {
  return [...defaultResolve(props), helloWorldAction]
}
