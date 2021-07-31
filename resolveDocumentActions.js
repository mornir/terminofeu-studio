import defaultResolve, {
  PublishAction,
} from 'part:@sanity/base/document-actions'

import { setEntryTitlesAction } from './workflows/setEntryTitlesAction'
import { sendTranslationOrder } from './workflows/sendTranslationOrder'

export default function resolveDocumentActions(props) {
  if (props.type !== 'entry') {
    return defaultResolve(props)
  }

  return [
    ...defaultResolve(props).map((Action) =>
      // Overwrite default publish action with our custom publish action
      Action === PublishAction ? setEntryTitlesAction : Action
    ),
    // Add new custom action
    sendTranslationOrder,
  ]
}
