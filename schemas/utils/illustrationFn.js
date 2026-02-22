export default ({ title, code }) => {
  return {
    title,
    name: code,
    type: 'object',
    group: code,
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Titel',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'caption',
        type: 'blockContent',
        title: 'Bildlegende',
      },
    ],
  }
}
