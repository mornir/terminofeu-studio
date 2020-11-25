import React from 'react'
import { Link } from 'part:@sanity/base/router'

export default {
  title: 'Begriff',
  name: 'termGroup',
  type: 'object',
  fields: [
    {
      title: 'Benennung',
      name: 'designation',
      type: 'string',
    },
    {
      title: 'Quelle',
      name: 'source',
      type: 'reference',
      description: (
        <span>
          Die Quelle muss vorher <Link href={'/desk/quellen'}>hier</Link>{' '}
          erfasst werden.
        </span>
      ),
      to: [{ type: 'source' }],
      options: {
        filter: ({ document }) => {
          // Always make sure to check for document properties
          // before attempting to use them
          if (!document.lang) {
            return {
              filter: 'lang == $lang',
              params: { lang: 'de' },
            }
          }

          return {
            filter: 'lang == $lang',
            params: {
              lang: document.lang,
            },
          }
        },
      },
    },
  ],
}
