// THIS SHOULD BE RENAMED LANG
export default {
  title: 'Sprache',
  name: 'lang',
  type: 'object',
  fields: [
    {
      type: 'reference',
      name: 'preferredTerm',
      title: 'Hauptbegriff',
      to: [{ type: 'term' }],
    },
    {
      type: 'array',
      name: 'terms',
      title: 'Alternative Begriffe',
      of: [
        {
          type: 'reference',
          to: [{ type: 'term' }],
        },
      ],
    },
    {
      type: 'blockContent',
      name: 'definition',
      title: 'Definition(en)',
      description:
        'Die Definition soll so kurz wie möglich und so ausführlich wie nötig sein.',
    },
    {
      title: 'Abbildungen',
      name: 'illustrations',
      type: 'array',
      description: 'Zeichnungen, grafische Darstellungen oder Schemata',
      of: [{ type: 'illustration' }],
    },
  ],
}
