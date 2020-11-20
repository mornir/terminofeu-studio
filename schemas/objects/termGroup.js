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
      type: 'string',
      name: 'status',
      title: 'Status',
      options: {
        list: [
          { title: 'genehmigt', value: 'allowed' },
          { title: 'zu vermeiden', value: 'avoid' },
          { title: 'nicht standard', value: 'not_standard' },
          { title: 'abgelehnt', value: 'rejected' },
        ],
      },
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
