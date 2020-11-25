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
        title: 'Hauptbegriff und alternative Begriffe',
        of: [{ type: 'term' }],
      },
      {
        title: 'Definition',
        name: 'definitions',
        type: 'array',
        description:
          'Unterscheiden sich die oben umschriebenen Begriffe stark voneinander, sind mehrere Einträge zu erstellen.',
        of: [{ type: 'definition' }],
      },
    ],
  }
}
