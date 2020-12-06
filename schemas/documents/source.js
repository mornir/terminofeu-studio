import { AiOutlineFileSearch } from 'react-icons/ai'

import { langs } from '../builder/langs'

export default {
  title: 'Quelle',
  name: 'source',
  type: 'document',
  icon: AiOutlineFileSearch,
  fields: [
    {
      title: 'Sprache',
      name: 'lang',
      type: 'string',
      validation: (Rule) => Rule.required().error('Feld darf nicht leer sein'),
      options: {
        list: langs.map(({ title, code }) => ({ value: code, title })),
      },
    },
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required().error('Feld darf nicht leer sein'),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
  ],
  initialValue: {
    lang: 'de',
  },
}
