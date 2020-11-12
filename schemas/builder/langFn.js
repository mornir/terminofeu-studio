import React from 'react'
import { Link } from 'part:@sanity/base/router'

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
            <Link
              href={`/intent/create/template=term-${code};type=term`}
              target="_blank"
            >
              hier erfasst werden
            </Link>
          </span>
        ),
        of: [
          {
            type: 'reference',
            to: [{ type: 'term' }],
            options: {
              filter: `lang == $lang && count(*[references(^._id)]) == 0`,
              filterParams: { lang: code },
            },
          },
        ],
      },
      {
        type: 'blockContent',
        name: 'definition',
        title: 'Definition(en)',
      },
      {
        title: 'Abbildungen',
        name: 'illustrations',
        type: 'array',
        description: 'Zeichnungen, grafische Darstellungen oder Schemata',
        of: [{ type: 'illustration' }],
      },
    ],
  }
}
