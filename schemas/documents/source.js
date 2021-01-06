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
      name: 'date',
      title: 'Stand',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
        calendarTodayLabel: 'Today',
      },
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
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare({ title, date }) {
      if (date) {
        const formattedDate = new Intl.DateTimeFormat('de-CH').format(
          new Date(date)
        )
        return {
          title,
          subtitle: `Stand: ${formattedDate}`,
        }
      } else {
        return {
          title,
          subtitle: null,
        }
      }
    },
  },
}
