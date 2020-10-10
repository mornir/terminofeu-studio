export default {
  title: 'Bild',
  name: 'image',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      type: 'asse',
      name: 'term',
      title: 'Begriff',
    },
    {
      type: 'blockContent',
      name: 'source',
      title: 'Quelle',
    },
  ],
}
