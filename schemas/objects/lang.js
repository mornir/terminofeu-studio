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
          options: {
            filter: ({ document }) => {
              console.log({ document })
              // Always make document to check for document properties
              // before attempting to use them
              if (!document.releaseYear) {
                return {
                  filter: 'role == $role',
                  params: { role: 'director' },
                }
              }

              return {
                filter: 'role == $role && birthYear >= $minYear',
                params: {
                  role: 'director',
                  minYear: document.releaseYear,
                },
              }
            },
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
