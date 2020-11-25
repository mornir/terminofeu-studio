import { description, filter } from '../builder/sourceData'

export default {
  title: 'Begriff',
  name: 'termGroup',
  type: 'object',
  fields: [
    {
      title: 'Benennung',
      name: 'designation',
      type: 'string',
      description:
        'Bennungen sind in ihrer Grundform (Nominativ Singular) zu erfassen.',
    },
    {
      title: 'Quelle',
      name: 'source',
      type: 'reference',
      description: description,
      to: [{ type: 'source' }],
      options: {
        filter: filter,
      },
    },
  ],
}
