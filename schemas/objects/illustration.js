import Tabs from 'sanity-plugin-tabs'

import illustrationFn from '../builder/illustrationFn'
import { langs } from '../builder/langs'

export default {
  title: 'Bild',
  name: 'illustration',
  type: 'object',
  fields: [
    {
      type: 'image',
      title: 'Abbildung',
      name: 'image',
    },
    {
      name: 'content',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: langs.map(({ title, code }) => ({ name: code, title })),
      fields: langs.map((lang) => illustrationFn(lang)),
    },
  ],
  preview: {
    select: {
      media: 'image',
      title: 'content.de.title',
    },
  },
}
