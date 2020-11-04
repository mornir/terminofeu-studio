export default {
  title: 'Sprache',
  name: 'lang',
  type: 'object',
  fields: [
    {
      type: 'array',
      name: 'alternativeTerms',
      title: 'Begriffe',
      of: [
        {
          type: 'reference',
          to: [{ type: 'deTerm' }],
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
