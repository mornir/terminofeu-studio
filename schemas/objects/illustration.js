import illustrationFn from '../utils/illustrationFn'
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
      groups: [
        {
          name: 'de',
          title: 'Deutsch',
          default: true,
        },
        {
          name: 'fr',
          title: 'Französisch',
        },
        {
          name: 'it',
          title: 'Italienisch',
        },
      ],
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
