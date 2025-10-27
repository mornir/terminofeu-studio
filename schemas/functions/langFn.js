export default ({ title, code }) => {
  return {
    title,
    name: code,
    type: 'object',
    group: code,
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
      },
      {
        name: 'note',
        title: 'Anmerkungen',
        type: 'noteRedactor',
      },
      {
        name: 'notesSource',
        title: 'Quelle der Anmerkung',
        type: 'sourceReference',
      },
      {
        name: 'examples',
        title: 'Beispiele',
        type: 'noteRedactor',
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
