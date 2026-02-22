import { defineBlueprint, defineDocumentFunction } from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'set-translation',
      event: {
        on: ['create', 'update'],
        filter:
          '_type == "entry" && status in ["approved", "validated", "in_force"] &&delta::changedAny((content.de.terms, content.de.definition, content.de.note, content.de.examples))',
      },
    }),
  ],
})
