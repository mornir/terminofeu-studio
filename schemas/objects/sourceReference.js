import { filter } from '../utils/sourceFn'

export default {
  name: 'sourceReference',
  title: 'source',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: 'reference',
      title: 'Quelle',
      type: 'reference',
      to: [{ type: 'source' }],
      options: {
        filter: filter,
      },
    },
    {
      type: 'string',
      name: 'type',
      title: 'Verweis',
      options: {
        list: [
          { title: 'überarbeitete Quelle', value: 'after' },
          { title: 'wörtlich übernommen', value: 'original' },
        ],
      },
    },
  ],
}
