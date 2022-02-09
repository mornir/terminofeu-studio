import Tabs from 'sanity-plugin-tabs'

import illustrationFn from '../functions/illustrationFn'
import { langs } from '../data/langs'

export default {
  title: 'Bild',
  name: 'illustration',
  type: 'object',
  fields: [
    {
      title: 'Quelle der Abbildung',
      name: 'source',
      type: 'reference',
      validation: (Rule) =>
        Rule.required().error('Quelle fehlt bei der Abbildung'),
      to: [{ type: 'source' }],
    },
    {
      type: 'image',
      title: 'Abbildung',
      name: 'image',
      description: 'Sprachneutrale Abbildung mit Nummerierung',
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
    prepare({ title, media }) {
      return {
        media,
        title,
      }
    },
  },
}
