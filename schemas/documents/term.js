import { langs } from '../builder/langs'

export default {
  title: 'Begriffe',
  name: 'term',
  type: 'document',
  liveEdit: true,
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
      title: 'Sprache',
      name: 'lang',
      type: 'string',
      options: {
        list: langs.map(({ title, code }) => ({ value: code, title })),
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
  initialValue: {
    lang: 'de',
  },
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
