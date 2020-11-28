import defaultResolve, {
  PublishAction,
} from 'part:@sanity/base/document-actions'

import { setEntryTitlesAction } from './workflows/setEntryTitlesAction'

export default function resolveDocumentActions(props) {
  return defaultResolve(props).map((Action) =>
    Action === PublishAction ? setEntryTitlesAction : Action
  )
}
