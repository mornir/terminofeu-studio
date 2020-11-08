import React from 'react'
import { Link } from 'part:@sanity/base/router'

// Les termes à ajouter ici doivent d'abord être créés ici.

export default ({ title, code }) => {
  return {
    title,
    name: code,
    type: 'object',
    fieldset: code,
    fieldsets: [{ name: 'intern', options: { columns: 2 } }],
    fields: [
      {
        title: 'Eintragstitel',
        name: 'title',
        type: 'string',
        description: '= Hauptbegriff',
        fieldset: 'intern',
      },
      {
        title: 'Titelform',
        name: 'slug',
        type: 'slug',
        fieldset: 'intern',
        description: 'URL gültige Form des Eintragstitel',
        options: {
          source: `content.${code}.title`,
        },
      },
      {
        type: 'array',
        name: 'terms',
        title: 'Begriffe',
        description: (
          <span>
            Begriffe, die hier hinzugefügt werden sollen, müssen zuerst{' '}
            <Link href={`/intent/create/type=${code}Term`} target="_blank">
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
