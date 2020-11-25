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
        title: 'Begriffe',
        of: [{ type: 'term' }],
      },
      {
        title: 'Definition',
        name: 'definitions',
        type: 'array',
        of: [{ type: 'definition' }],
      },
    ],
  }
}
