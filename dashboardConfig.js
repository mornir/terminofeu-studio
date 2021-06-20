export default {
  widgets: [
    {
      name: 'welcome',
      layout: {
        width: 'full',
        height: 'small',
      },
    },
    {
      name: 'downloads-list',
      layout: {
        width: 'small',
        height: 'small',
      },
    },
    {
      name: 'document-list',
      options: {
        title: 'Zuletzt bearbeitete Einträge',
        order: '_updatedAt desc',
        limit: 5,
        types: ['entry'],
      },
      layout: {
        width: 'small',
        height: 'small',
      },
    },
    {
      name: 'document-list',
      options: {
        title: 'Zuletzt bearbeitete Quellen',
        order: '_updatedAt desc',
        limit: 5,
        types: ['source'],
      },
    },
  ],
}
