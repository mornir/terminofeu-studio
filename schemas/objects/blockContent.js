export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [],
      /*  lists: [{ title: 'Bullet', value: 'bullet' }], */
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          /*  { title: 'Underline', value: 'underline' }, */
          { title: 'Strike', value: 'strike-through' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'Interner Link',
            name: 'internalLink',
            type: 'reference',
            to: [{ type: 'entry' }],
            validation: (Rule) =>
              Rule.required().error('Feld darf nicht leer sein'),
            blockEditor: {
              icon: () => '🔗',
            },
          },
          {
            title: 'Externer Link',
            name: 'externalLink',
            type: 'object',
            validation: (Rule) =>
              Rule.required().error('Feld darf nicht leer sein'),
            blockEditor: {
              icon: () => '🌍',
            },
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
  ],
}
