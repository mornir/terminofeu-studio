import { AiOutlineFileSearch } from 'react-icons/ai'

import { langs } from '../builder/langs'

export default {
  title: 'Quellen',
  name: 'source',
  type: 'document',
  icon: AiOutlineFileSearch,
  liveEdit: false,
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
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
  ],
  initialValue: {
    lang: 'de',
  },
}
