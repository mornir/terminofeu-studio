export default {
  title: 'Sprache',
  name: 'termLang',
  type: 'object',
  fieldsets: [
    {
      title: 'Bezeichnungen',
      name: 'designation',
      options: {
        columns: 2,
      },
    },
  ],
  fields: [
    {
      type: 'string',
      name: 'preferredTerm',
      title: 'Hauptbegriff',
      fieldset: 'designation',
    },
    {
      type: 'string',
      name: 'abbreviation',
      title: 'Abkürzung',
      fieldset: 'designation',
    },
    {
      type: 'blockContent',
      name: 'definition',
      title: 'Definition',
    },
    {
      type: 'blockContent',
      name: 'source',
      title: 'Quelle',
    },
    {
      type: 'array',
      name: 'variants',
      title: 'Alternative Begriffe',
      of: [{ type: 'variant' }],
    },
  ],
}
