const statusList = [
  { title: 'Definition', value: 'main' },
  { title: 'Alternative Definition', value: 'variant' },
]

import { description, filter } from '../builder/sourceData'

export default {
  title: 'Definition',
  name: 'definition',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'status',
      title: 'Status',
      hidden: true,
      options: {
        list: statusList,
      },
    },
    {
      title: 'Quelle',
      name: 'source',
      type: 'reference',
      description: description,
      validation: (Rule) =>
        Rule.required().error('Quelle fehlt bei der Definition'),
      to: [{ type: 'source' }],
      options: {
        filter: filter,
      },
    },
    {
      title: 'Definition',
      name: 'definition',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      blocks: 'definition',
      subtitle: 'source.title',
    },
    prepare({ blocks, subtitle }) {
      const block = (blocks || []).find((block) => block._type === 'block')

      return {
        title: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'Keine Definition',
        subtitle,
      }
    },
  },
}
