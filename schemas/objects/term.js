export default {
  title: 'Sprache',
  name: 'term',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'preferredTerm',
      title: 'Hauptbegriff',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'array',
      name: 'additionnalFields',
      title: 'Weitere Felder',
      description: 'Definition, Anmerkung, Abkürzung, usw.',
      of: [
        { type: 'definition' },
        { type: 'abbreviation' },
        { type: 'context' },
        { type: 'notice' },
      ],
    },
    {
      type: 'array',
      name: 'variants',
      title: 'Alternative Begriffe',
      of: [{ type: 'variant' }],
    },
  ],
}
