import { AiOutlineFileSearch } from 'react-icons/ai'

import { langs } from '../data/langs'

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
      title: 'Kurztitel',
      type: 'string',
      validation: (Rule) => Rule.required().error('Feld darf nicht leer sein'),
    },
    {
      name: 'longTitle',
      title: 'Volltitel',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Stand',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      validation: (Rule) => Rule.required().error('Feld darf nicht leer sein'),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Falls vorhanden, sonst leer lassen.',
    },
  ],
  initialValue: {
    lang: 'de',
  },
  preview: {
    select: {
      title: 'title',
      longTitle: 'longTitle',
      date: 'date',
      lang: 'lang',
    },
    prepare({ longTitle, title, date, lang }) {
      const previewTitle = longTitle ? longTitle : title
      if (date) {
        const formattedDate = new Intl.DateTimeFormat('fr-CH').format(
          new Date(date)
        )
        const preText = lang === 'de' ? 'Stand: ' : 'État au '
        return {
          title: previewTitle,
          subtitle: preText + formattedDate,
        }
      } else {
        return {
          title: previewTitle,
          subtitle: null,
        }
      }
    },
  },
}
