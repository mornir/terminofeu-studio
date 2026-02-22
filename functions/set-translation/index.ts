import { documentEventHandler } from '@sanity/functions'
export const handler = documentEventHandler(async ({ context, event }) => {
  console.log('La fiche allemande a été modifiée!')
})
