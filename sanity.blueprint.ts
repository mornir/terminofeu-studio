import { defineBlueprint, defineDocumentFunction } from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'set-translation',
      event: {
        on: ['create', 'update'],
        filter:
          '_type == "entry" && delta::changedAny((content.de.terms[].designation, content.de.definition))',
      },
    }),
  ],
})
