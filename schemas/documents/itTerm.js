export default {
  title: 'Begriffe IT',
  name: 'itTerm',
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
      title: 'Begriff',
      name: 'term',
      type: 'term',
    },
    {
      title: 'Abkürzung',
      name: 'abbreviation',
      fieldset: 'abbreviation',
      type: 'term',
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
