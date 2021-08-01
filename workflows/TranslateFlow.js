import { useState } from 'react'
import { useToast } from '@sanity/ui'
import { useDocumentOperation } from '@sanity/react-hooks'

export function TranslateFlow(props) {
  const { patch, publish } = useDocumentOperation(props.id, props.type)
  const [dialogOpen, setDialogOpen] = useState(false)
  const toast = useToast()
  let action = {
    value: 'in_translation',
    message: 'Auftrag an VKF-Übersetzungsdienst schicken?',
    label: 'Übersetzung beauftragen',
    toast: 'Auftrag wurde verschickt!',
  }

  const status = props?.published.translationStatus

  if (status === 'in_translation') {
    action = {
      value: 'in_review',
      label: 'Übersetzung überprüfen',
      message: 'Übersetzung zur Kontrolle melden?',
      toast: 'Übersetzung zur Kontrolle gemeldet!',
    }
  }

  if (status === 'in_review') {
    action = {
      value: 'reviewed',
      label: 'Übersetzung freigeben',
      message: 'Übersetzung freigeben?',
      toast: 'Übersetzung wurde freigegeben!',
    }
  }

  return {
    label: action.label,
    onHandle: () => {
      setDialogOpen(true)
    },
    dialog: dialogOpen && {
      type: 'confirm',
      onCancel: props.onComplete,
      message: action.message,
      onConfirm: async () => {
        // Set publishedAt to current date and time
        patch.execute([{ set: { translationStatus: action.value } }])

        // Perform the publish
        publish.execute()

        toast.push({
          status: 'success',
          title: action.toast,
        })

        props.onComplete()
      },
    },
  }
}
