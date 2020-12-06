import Tabs from 'sanity-plugin-tabs'
import { AiOutlineContainer } from 'react-icons/ai'

import langFn from '../builder/langFn'
import { langs } from '../builder/langs'

export const statusList = [
  { title: 'Entwurf', value: 'draft' },
  { title: 'Im Definitionsprozess', value: 'definition' },
  { title: 'Fachliche Freigabe', value: 'approved' },
  { title: 'Im Übersetzungsprozess', value: 'translation' },
  { title: 'Freigabe durch Kernausschuss', value: 'validated' },
  { title: 'Übernommen in BSV 2026', value: 'in_force' },
]

export default {
  name: 'entry',
  title: 'Eintrag',
  type: 'document',
  icon: AiOutlineContainer,
  fields: [
    ...langs.map(({ title, code }) => {
      return {
        title,
        type: 'string',
        name: code + 'Title',
        hidden: true,
      }
    }),
    {
      type: 'string',
      name: 'status',
      title: 'Bearbeitungsstatus',
      options: {
        list: statusList,
      },
      validation: (Rule) => Rule.required().error('Pflichtfeld'),
    },
    /*     {
      title: 'Verwandte Einträge',
      name: 'relatedEntries',
      type: 'array',
      description: 'Verweis auf einen Ober-, Unter- oder Nebenbegriff',
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: 'reference',
          to: [{ type: 'entry' }],
          options: {
            filter: ({ document }) => {
              return {
                filter: '_id != $id',
                params: {
                  id: getPublishedId(document._id),
                },
              }
            },
          },
        },
      ],
    }, */
    {
      name: 'content',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: langs.map(({ title, code }) => ({ name: code, title })),
      fields: langs.map((lang) => langFn(lang)),
    },
    {
      title: 'Abbildungen',
      name: 'illustrations',
      type: 'array',
      description: 'Zeichnungen, grafische Darstellungen oder Schemata',
      of: [{ type: 'illustration' }],
    },
  ],
  initialValue: {
    status: 'draft',
  },
  preview: {
    select: {
      termDE: 'content.de.terms.0.designation',
      termFR: 'content.fr.terms.0.designation',
    },
    prepare({ termDE, termFR }) {
      return {
        title: termDE,
        subtitle: termFR,
      }
    },
  },
  orderings: [
    {
      title: 'DE A->Z',
      name: 'deAlphabetical',
      by: [{ field: 'deTitle', direction: 'asc' }],
    },
    {
      title: 'FR A->Z',
      name: 'frAlphabetical',
      by: [{ field: 'frTitle', direction: 'asc' }],
    },
  ],
}
