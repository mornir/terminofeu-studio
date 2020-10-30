// THIS SHOULD BE RENAMED LANG
export default {
  title: 'Sprache',
  name: 'lang',
  type: 'object',
  fields: [
    {
      type: 'array',
      name: 'terms',
      title: 'Begriffe',
      of: [{ type: 'term' }],
    },
    {
      type: 'array',
      name: 'definitions',
      title: 'Definitions',
      of: [{ type: 'definition' }],
    },
  ],
}
