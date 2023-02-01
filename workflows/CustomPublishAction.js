import { useState, useEffect } from 'react'
import { useDocumentOperation } from 'sanity'
import isEqual from 'lodash.isequal'

import { langs } from '../schemas/data/langs'

export function CustomPublishAction(props) {
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

      // Create { set: deTitle: term + abbreviation } patch for every language
      const patches = langs
        .map(({ code }) => {
          const term = props.draft?.content[code]?.terms?.[0]?.designation
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

      function getTranslationStatus(oldStatus, newStatus) {
        // When entries are moved from "Im Definitionsprozess" to "Fachliche Freigabe", set the translation status to "Eintrag wird ins FR übersetzt"
        if (newStatus === 'approved' && oldStatus === 'definition') {
          return 'translation'
        }

        // When entries are moved from "Fachliche Freigabe" back to "Im Definitionsprozess", set the translation status back to "Warten auf DE"
        if (newStatus === 'definition' && oldStatus === 'approved') {
          return 'fr_wait'
        }

        // When changes are made while the admin status is set to either "Fachliche Freigabe", "Freigabe durch Kernausschuss", or "Übernommen in BSV 2026", set the translation status back to "Im Definitionsprozess"
        if (['approved', 'validated', 'in_force'].includes(newStatus)) {
          const areVersionsEqual = isEqual(
            props.draft.content.de,
            props.published.content.de
          )

          if (!areVersionsEqual) {
            return 'translation'
          }
        }
        return null
      }

      if (props.published?.status && props.draft?.status) {
        const newTranslationStatus = getTranslationStatus(
          props.published.status,
          props.draft.status
        )

        if (newTranslationStatus) {
          patch.execute([{ set: { translationStatus: newTranslationStatus } }])
        }
      }

      // Perform the publish
      publish.execute()

      // Signal that the action is completed
      props.onComplete()
    },
  }
}
