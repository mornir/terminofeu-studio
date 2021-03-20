import Tabs from 'sanity-plugin-tabs'
import { AiOutlineContainer } from 'react-icons/ai'

import langFn from '../builder/langFn'
import { langs } from '../builder/langs'

import { statusList } from '../data/statusList'

export default {
  name: 'entry',
  title: 'Eintrag',
  type: 'document',
  icon: AiOutlineContainer,
  fieldsets: [
    {
      name: 'draftVotes',
      title: 'Soll der Begriff in Entwurf übernommen?',
      options: { collapsible: true, collapsed: false },
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
    },
    {
      name: 'approvals',
      title: 'Abstimmungen',
      type: 'array',
      of: [{ type: 'approval' }],
      fieldset: 'draftVotes',
      options: {
        sortable: false,
      },
    },
    {
      title: 'Bemerkungen',
      name: 'notes',
      type: 'array',
      of: [{ type: 'note' }],
      fieldset: 'draftVotes',
      options: {
        sortable: false,
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
      inputComponent: Tabs,
      fieldsets: langs.map(({ title, code }) => ({ name: code, title })),
      fields: langs.map((lang) => langFn(lang)),
      options: {
        // setting layout to object will group the tab content in an object fieldset border.
        // ... Useful for when your tab is in between other fields inside a document.
        layout: 'object',
      },
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
    status: statusList[0].value,
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
