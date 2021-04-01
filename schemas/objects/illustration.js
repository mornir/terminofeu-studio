import Tabs from 'sanity-plugin-tabs'

import illustrationFn from '../functions/illustrationFn'
import { langs } from '../data/langs'
import { generateStatus } from '../functions/statusFn'
import { description } from '../functions/sourceFn'

export default {
  title: 'Bild',
  name: 'illustration',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'status',
      title: 'Status',
      options: {
        list: generateStatus('abbildung'),
      },
    },
    {
      title: 'Quelle der Abbildung',
      name: 'source',
      type: 'reference',
      description: description,
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
      status: 'status',
    },
    prepare({ status, title, media }) {
      const subtitle = status
        ? generateStatus('abbildung').find((s) => s.value === status).title
        : 'kein Status'

      return {
        media,
        title,
        subtitle,
      }
    },
  },
}
