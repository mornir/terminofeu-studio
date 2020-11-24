export default ({ title, code }) => {
  return {
    title,
    name: code,
    type: 'object',
    fieldset: code,
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Titel',
        validation: (Rule) => Rule.required(),
        options: {
          isHighlighted: true,
        },
      },
      {
        name: 'caption',
        type: 'blockContent',
        title: 'Bildlegende',
        options: {
          isHighlighted: true,
        },
      },
    ],
  }
}
