import { useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useToast } from '@sanity/ui'
import { useDocumentOperation } from '@sanity/react-hooks'

export function sendTranslationOrder(props) {
  const { patch, publish } = useDocumentOperation(props.id, props.type)
  const [dialogOpen, setDialogOpen] = useState(false)
  const toast = useToast()
  return {
    label: 'Übersetzungsauftrag',
    icon: AiOutlineSend,
    onHandle: () => {
      setDialogOpen(true)
    },
    dialog: dialogOpen && {
      type: 'confirm',
      onCancel: props.onComplete,
      onConfirm: () => {
        // Set publishedAt to current date and time
        patch.execute([{ set: { translationStatus: 'in_translation' } }])

        // Perform the publish
        publish.execute()

        toast.push({
          title: 'Auftrag wurde erfolgreich verschickt!',
        })

        props.onComplete()
      },
      message: 'Auftrag an VKF-Übersetzungsdienst schicken?',
    },
  }
}
