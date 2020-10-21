export default {
  title: 'Anmerkung',
  name: 'notice',
  type: 'object',
  fields: [
    {
      title: 'Anmerkung',
      name: 'notice',
      type: 'blockContent',
      description: 'Benennungsbezogenen oder begriffsbezogenen Daten',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Anmerkung',
      }
    },
  },
}
