export default {
  title: 'Synonym',
  name: 'variant',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'term',
      title: 'Begriff',
    },
    {
      type: 'blockContent',
      name: 'sourceTerm',
      title: 'Quelle des Begriffs',
    },
    {
      type: 'blockContent',
      name: 'notice',
      title: 'Anmerkung',
    },
    {
      type: 'blockContent',
      name: 'sourceNotice',
      title: 'Quelle der Anmerkung',
    },
  ],
}
