export default {
  title: 'Abkürzung',
  name: 'abbreviation',
  type: 'object',
  fields: [
    {
      title: 'Abkürzung',
      name: 'abbreviation',
      type: 'string',
      description: 'Kurzformen',
    },
    {
      title: 'Quelle',
      name: 'source',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      abbreviation: 'abbreviation',
    },
    prepare({ abbreviation }) {
      const title = `Abkürzung: ${abbreviation}`
      return {
        title,
      }
    },
  },
}
