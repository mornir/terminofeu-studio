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
