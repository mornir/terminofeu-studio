import React from 'react'
import { Link } from 'part:@sanity/base/router'

// Les termes à ajouter ici doivent d'abord être créés ici.

export default ({ title, code }) => {
  return {
    title,
    name: code,
    type: 'object',
    fieldset: code,
    fields: [
      {
        type: 'array',
        name: 'terms',
        title: 'Begriffe',
        description: (
          <span>
            Begriffe, die hier hinzugefügt werden sollen, müssen zuerst{' '}
            <Link href={`/intent/create/type=deTerm;template=${code}Term`}>
              hier erfasst werden
            </Link>
          </span>
        ),
        of: [
          {
            type: 'reference',
            to: [{ type: `${code}Term` }],
            options: {
              filter: `count(*[references(^._id)]) == 0`,
            },
          },
        ],
      },
    ],
  }
}
