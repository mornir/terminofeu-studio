import defaultResolve, {
  PublishAction,
} from 'part:@sanity/base/document-actions'

import { setEntryTitlesAction } from './workflows/setEntryTitlesAction'
import { TranslateFlow } from './workflows/TranslateFlow'

export default function resolveDocumentActions(props) {
  if (props.type !== 'entry') {
    return defaultResolve(props)
  }

  const actions = defaultResolve(props).map((Action) =>
    // Overwrite default publish action with our custom publish action
    Action === PublishAction ? setEntryTitlesAction : Action
  )

  actions.push(TranslateFlow)

  return actions
}
