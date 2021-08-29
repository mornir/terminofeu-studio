import defaultResolve, {
  PublishAction,
} from 'part:@sanity/base/document-actions'

import { CustomPublishAction } from './workflows/CustomPublishAction'

export default function resolveDocumentActions(props) {
  if (props.type !== 'entry') {
    return defaultResolve(props)
  }

  const actions = defaultResolve(props).map((Action) =>
    // Overwrite default publish action with our custom publish action
    Action === PublishAction ? CustomPublishAction : Action
  )

  return actions
}
