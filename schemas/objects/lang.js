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
      name: 'alternativeTerms',
      title: 'Alternative Begriffe',
      of: [
        {
          type: 'reference',
          to: [{ type: 'term' }],
          options: {
            filter: 'language == $lang',
            filterParams: { lang: 'fr' },
          },
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
