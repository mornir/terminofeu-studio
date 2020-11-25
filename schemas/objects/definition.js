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
          console.log(parentPath)
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
