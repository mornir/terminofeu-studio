import status from '../builder/termStatus'

export default {
  title: 'Begriffe DE',
  name: 'deTerm',
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
      title: 'Benennung',
      validation: (Rule) => Rule.required().error('Pflichtfeld'),
    },
    {
      type: 'string',
      name: 'status',
      title: 'Status',
      options: {
        list: status.map(({ deTitle, value }) => ({
          title: deTitle,
          value,
        })),
      },
    },
    {
      type: 'string',
      name: 'sourceTerm',
      title: 'Quelle der Benennung',
    },
    {
      title: 'Anmerkungen (fakultativ)',
      name: 'notice',
      type: 'blockContent',
      description: 'Benennungsbezogenen oder begriffsbezogenen Informationen',
    },
    {
      title: 'Benennung',
      name: 'abbreviation',
      type: 'string',
      fieldset: 'abbreviation',
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
      type: 'string',
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
