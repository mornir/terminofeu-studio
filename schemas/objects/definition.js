import { generateStatus } from '../builder/status'

export default {
  title: 'Definition',
  name: 'definition',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'status',
      title: 'Status',
      options: {
        list: generateStatus('definition'),
      },
    },
    {
      title: 'Definition',
      name: 'definition',
      type: 'blockContent',
    },
    {
      title: 'Quelle',
      name: 'source',
      type: 'string',
    },
  ],
  preview: {
    select: {
      blocks: 'definition',
    },
    prepare(value) {
      const block = (value.blocks || []).find(
        (block) => block._type === 'block'
      )
      return {
        title: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'No title',
      }
    },
  },
}
