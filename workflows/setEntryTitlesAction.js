import { useState, useEffect } from 'react'
import { useDocumentOperation } from '@sanity/react-hooks'
import isEqual from 'lodash.isequal'

import { langs } from '../schemas/data/langs'

export function setEntryTitlesAction(props) {
  if (props.type !== 'entry') {
    return null
  }

  const { patch, publish } = useDocumentOperation(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false)
    }
  }, [props.draft])

  return {
    disabled: publish.disabled,
    label: isPublishing ? 'Wird veröffentlicht…' : 'Veröffentlichen',
    onHandle: () => {
      // This will update the button text
      setIsPublishing(true)

      console.log(props)

      // Create { set: deTitle: term + abbreviation } patch for every language
      const patches = langs
        .map(({ code }) => {
          const term = props.draft.content[code]?.terms?.[0]?.designation
          if (!term) {
            return null
          }
          const abbreviation =
            props.draft.content[code]?.terms?.[0]?.abbreviation

          const titleObject = {}
          const key = code + 'Title'
          const title = term + (abbreviation ? ` ${abbreviation}` : '')

          titleObject[key] = title

          return { set: titleObject }
        })
        .filter((langPatch) => langPatch !== null)

      patch.execute(patches)

      if (props.draft && props.published) {
        console.log('draft', props.draft)
        console.log('published', props.published)

        const shouldRequestTranslation = isEqual(
          props.draft.content.de,
          props.published.content.de
        )

        if (shouldRequestTranslation) {
          // TODO: Send email

          patch.execute([{ set: { translationStatus: 'in_translation' } }])
          console.log('SEND EMAIL TO UD!')
        }
      }

      // Perform the publish
      publish.execute()

      // Signal that the action is completed
      props.onComplete()
    },
  }
}
