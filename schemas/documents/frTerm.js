export default {
  title: 'Termes FR',
  name: 'frTerm',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      type: 'string',
      name: 'term',
      title: 'Dénomination',
      validation: (Rule) => Rule.required().error('Pflichtfeld'),
    },
    {
      type: 'blockContent',
      name: 'sourceTerm',
      title: 'Source de la dénomination',
    },
    {
      type: 'string',
      name: 'status',
      title: 'Status',
      options: {
        list: [
          { title: 'Hauptbegriff', value: 'hauptbegriff' },
          { title: 'genormt', value: 'genormt' },
          { title: 'nicht genormt', value: 'nicht_genormt' },
          { title: 'veraltet', value: 'neu' },
          { title: 'abzulehnen', value: 'abzulehnen' },
          { title: 'zulässig', value: 'zulässig' },
        ],
      },
    },
    {
      type: 'array',
      name: 'additionnalFields',
      title: 'Autres champs',
      description: 'Anmerkung, Abkürzung, usw.',
      of: [{ type: 'abbreviation' }, { type: 'notice' }],
    },
  ],
  preview: {
    select: {
      title: 'term',
    },
  },
}
