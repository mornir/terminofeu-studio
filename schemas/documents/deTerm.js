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
        list: [
          { title: 'genormt', value: 'genormt' },
          { title: 'nicht genormt', value: 'nicht_genormt' },
          { title: 'veraltet', value: 'old' },
          { title: 'abzulehnen', value: 'abzulehnen' },
          { title: 'zulässig', value: 'zulässig' },
        ],
      },
    },
    {
      type: 'blockContent',
      name: 'sourceTerm',
      title: 'Quelle der Benennung',
    },
    {
      title: 'Anmerkung (fakultativ)',
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
        list: [
          { title: 'genormt', value: 'genormt' },
          { title: 'nicht genormt', value: 'nicht_genormt' },
          { title: 'veraltet', value: 'old' },
          { title: 'abzulehnen', value: 'abzulehnen' },
          { title: 'zulässig', value: 'zulässig' },
        ],
      },
    },
    {
      title: 'Quelle',
      name: 'abbreviationSource',
      type: 'blockContent',
      fieldset: 'abbreviation',
    },
  ],
  preview: {
    select: {
      title: 'term',
    },
  },
}
