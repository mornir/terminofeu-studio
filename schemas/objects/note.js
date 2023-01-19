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
      // TODO: ask why this doesn't work
      //initialValue: new Intl.DateTimeFormat('fr-CH').format(new Date()),
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
