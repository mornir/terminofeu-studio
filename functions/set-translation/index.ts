import { documentEventHandler } from '@sanity/functions'
import { createClient } from '@sanity/client'

export const handler = documentEventHandler(async ({ context, event }) => {
  console.log('La fiche allemande a été modifiée!')

  try {
    await createClient({
      ...context.clientOptions,
      useCdn: false,
      apiVersion: '2026-02-22',
    })
      .patch(event.data._id)
      .setIfMissing({
        translationStatus: 'translation',
      })
      .commit({ dryRun: context.local })
    console.log(
      context.local ? 'Dry run:' : 'Updated:',
      `translationStatus set to translation`
    )
  } catch (error) {
    console.error(error)
  }
})
