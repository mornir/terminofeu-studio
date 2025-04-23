import { AiOutlineContainer } from 'react-icons/ai'

import langFn from '../functions/langFn'
import { langs } from '../data/langs'
import { statusList } from '../data/statusList'
import { translationStatusList } from '../data/translationStatusList'
import { ag } from '../data/arbeitsgruppen'

export default {
  name: 'entry',
  title: 'Eintrag',
  type: 'document',
  icon: AiOutlineContainer,
  fieldsets: [
    {
      name: 'admin',
      title: 'Verwaltungsdaten',
      options: {
        columns: 2,
      },
    },
  ],
  fields: [
    {
      type: 'string',
      name: 'status',
      title: 'Bearbeitungsstatus',
      options: {
        list: statusList,
      },
      validation: (Rule) => Rule.required().error('Pflichtfeld'),
      fieldset: 'admin',
    },
    {
      type: 'string',
      name: 'level',
      title: 'Stufe',
      fieldset: 'admin',
      options: {
        list: [
          { title: 'IOTH-Begriff', value: 'IOTH' },
          { title: 'VKF-Begriff', value: 'VKF' },
        ],
      },
    },
    {
      title: 'AG-Zuordnung',
      name: 'assignees',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'admin',
      options: {
        list: ag,
        layout: 'grid',
      },
    },
    {
      title: 'Übersetzungstatus',
      type: 'string',
      name: 'translationStatus',
      hidden: ({ currentUser, document }) => {
        return !['puCcAHT8N', 'pfoCdHT74', 'pNqrbwTtv'].includes(currentUser.id)
      },
      fieldset: 'admin',
      options: {
        list: translationStatusList,
      },
    },
    ...langs.map(({ title, code }) => {
      return {
        title,
        type: 'string',
        name: code + 'Title',
        hidden: true,
      }
    }),
    {
      name: 'content',
      type: 'object',
      title: 'Sprachauswahl',
      groups: [
        {
          name: 'de',
          title: 'Deutsch',
          default: true,
        },
        {
          name: 'fr',
          title: 'Französisch',
        },
        {
          name: 'it',
          title: 'Italienisch',
        },
      ],
      fields: langs.map((lang) => langFn(lang)),
    },
    {
      title: 'Kommentare',
      name: 'notes',
      type: 'array',
      of: [{ type: 'note' }],
      options: {
        sortable: false,
      },
    },
    {
      title: 'Abbildungen',
      name: 'illustrations',
      type: 'array',
      description: 'Zeichnungen, grafische Darstellungen oder Schemata',
      of: [{ type: 'illustration' }],
    },

    {
      name: 'approvals',
      title: 'Soll der Begriff bzw. das Konzept in Entwurf übernommen werden?',
      type: 'array',
      of: [{ type: 'approval' }],
      options: {
        sortable: false,
      },
    },
  ],
  initialValue: {
    status: statusList[1].value,
  },
  preview: {
    select: {
      title: 'content.de.terms.0.designation',
      subtitle: 'content.fr.terms.0.designation',
      description: 'content.it.terms.0.designation',
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
