import status from '../builder/termStatus'

export default {
  title: 'Begriffe IT',
  name: 'itTerm',
  type: 'document',
  liveEdit: true,
  fieldsets: [
    {
      name: 'abbreviation',
      title: 'Abkürzung (falls vorhanden)',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      type: 'string',
      name: 'term',
      title: 'Begriff',
      validation: (Rule) => Rule.required().error('Pflichtfeld'),
    },
    {
      type: 'text',
      name: 'sourceTerm',
      title: 'Quelle des Begriffs',
      rows: 5,
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
      type: 'string',
      name: 'abbreviationStatus',
      title: 'Status',
      fieldset: 'abbreviation',
      options: {
        list: status.map(({ deTitle, value }) => ({
          title: deTitle,
          value,
        })),
      },
    },
    {
      title: 'Quelle',
      name: 'abbreviationSource',
      type: 'text',
      rows: 5,
      fieldset: 'abbreviation',
    },
  ],
  preview: {
    select: {
      term: 'term',
      abbreviation: 'abbreviation',
    },
    prepare({ term, abbreviation }) {
      const title = abbreviation ? `${term} (${abbreviation})` : term
      return {
        title,
      }
    },
  },
}
