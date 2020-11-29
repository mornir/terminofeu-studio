import defaultResolve, {
  PublishAction,
} from 'part:@sanity/base/document-actions'

import { setEntryTitlesAction } from './workflows/setEntryTitlesAction'

export default function resolveDocumentActions(props) {
  if (props.type !== 'entry') {
    return defaultResolve(props)
  }

  return defaultResolve(props).map((Action) =>
    Action === PublishAction ? setEntryTitlesAction : Action
  )
}
