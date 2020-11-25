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
      type: 'reference',
      to: [{ type: 'source' }],
      options: {
        filter: ({ document, parentPath }) => {
          // Always make sure to check for document properties
          // before attempting to use them
          if (!parentPath[0] === 'content' && !parentPath[1]) {
            return {
              filter: 'lang == $lang',
              params: { lang: 'de' },
            }
          } else {
            return {
              filter: 'lang == $lang',
              params: {
                lang: parentPath[1],
              },
            }
          }
        },
      },
    },
  ],
  preview: {
    select: {
      blocks: 'definition',
      status: 'status',
    },
    prepare({ blocks, status }) {
      const block = (blocks || []).find((block) => block._type === 'block')

      const subtitle = status
        ? generateStatus('definition').find((s) => s.value === status).title
        : 'kein Status'

      return {
        title: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'No title',
        subtitle,
      }
    },
  },
}
