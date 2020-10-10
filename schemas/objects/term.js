export default {
  title: 'Sprache',
  name: 'term',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'preferredTerm',
      title: 'Hauptbegriff',
      validation: Rule => Rule.required(),
    },
    {
      type: 'array',
      name: 'additionnalFields',
      title: 'Weitere Felder',
      description: 'Kontext, Anmerkung, Abkürzung, usw.',
      of: [{type: 'context' }, {type: 'notice'}, {type: 'abbreviation'}]
    },
    {
      type: 'definition',
      name: 'definition',
    },
    {
        type: 'array',
        name: 'variants',
        title: 'Alternative Begriffe',
        of: [{ type: 'variant' }],
      },
    ],
}
