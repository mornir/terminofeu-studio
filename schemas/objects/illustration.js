export default {
  title: 'Bild',
  name: 'illustration',
  type: 'image',
  options: {
    hotspot: true, // <-- Defaults to false
  },
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Bildlegende',
      validation: (Rule) => Rule.required(),
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'attribution',
      type: 'string',
      title: 'Zuschreibung',
      description: 'Quelle, Urheber, usw.',
      validation: (Rule) => Rule.required(),
      options: {
        isHighlighted: true,
      },
    },
  ],
}
