import { AiOutlineFileText } from 'react-icons/ai'

import { generateStatus } from '../builder/status'

export default {
  title: 'Begriffe',
  name: 'term',
  type: 'object',
  icon: AiOutlineFileText,
  fieldsets: [
    {
      name: 'abbreviation',
      title: 'Abkürzung (falls vorhanden)',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      type: 'string',
      name: 'status',
      title: 'Status',
      options: {
        list: generateStatus(),
      },
    },
    {
      title: 'Begriff',
      name: 'term',
      type: 'termGroup',
    },
    {
      title: 'Abkürzung',
      name: 'abbreviation',
      fieldset: 'abbreviation',
      type: 'termGroup',
    },
  ],
  preview: {
    select: {
      term: 'term.designation',
      abbreviation: 'abbreviation.designation',
      status: 'status',
    },
    prepare({ status, term, abbreviation }) {
      const statusTitle = status
        ? generateStatus().find((s) => s.value === status).title
        : 'ohne Status'

      const title =
        `[${statusTitle}] ` +
        (abbreviation ? `${term} (${abbreviation})` : term)
      return {
        title,
      }
    },
  },
}
