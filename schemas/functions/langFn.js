// import { description } from './sourceFn'

export default ({ title, code }) => {
  return {
    title,
    name: code,
    type: 'object',
    fieldset: code,
    fields: [
      {
        type: 'array',
        name: 'terms',
        title: 'Benennung',
        of: [{ type: 'term' }],
      },
      {
        name: 'definition',
        title: 'Definition BSV 2026',
        type: 'blockContent',
      },
      {
        name: 'definitionSource',
        title: 'Quelle der Definition',
        type: 'sourceReference',
        description:
          'Sind mehrere Quellen vorhanden, ist die zuverlässigste aufzuführen.',
      },

      {
        name: 'note',
        title: 'Anmerkung',
        type: 'noteRedactor',
      },
      {
        name: 'notesSource',
        title: 'Quelle der Anmerkung',
        type: 'sourceReference',
        description:
          'Sind mehrere Quellen vorhanden, ist die zuverlässigste aufzuführen.',
      },
      {
        title: 'Definitionen aus bestehenden Regelwerken',
        name: 'definitions',
        type: 'array',
        of: [{ type: 'definition' }],
        options: {
          sortable: false,
        },
      },
    ],
  }
}
