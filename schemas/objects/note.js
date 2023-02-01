import { BiCommentDetail } from 'react-icons/bi'

export default {
  name: 'note',
  title: 'note',
  type: 'object',
  icon: BiCommentDetail,
  fields: [
    {
      name: 'author',
      title: 'Verfasser',
      type: 'string',
      initialValue: (value, { currentUser }) => {
        return currentUser.name ?? ''
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Datum',
      name: 'publishedDate',
      type: 'date',
      initialValue: new Date().toISOString().split('T')[0],
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
    },
    {
      name: 'text',
      title: 'Kommentar',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      author: 'author',
      text: 'text',
      date: 'publishedDate',
    },
    prepare({ author, text, date }) {
      const subtitle = date
        ? `${author} am ${new Intl.DateTimeFormat('fr-CH').format(
            new Date(date)
          )}`
        : author

      return {
        title: text,
        subtitle,
      }
    },
  },
}
