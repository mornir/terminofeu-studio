import { AiOutlineFileText } from 'react-icons/ai'

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
    },
    prepare({ term, abbreviation }) {
      const title = abbreviation ? `${term} (${abbreviation})` : term
      return {
        title,
      }
    },
  },
}
