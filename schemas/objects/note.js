import { BiCommentDetail } from 'react-icons/bi'
import userStore from 'part:@sanity/base/user'

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
      initialValue: async () => {
        const user = await userStore.getUser('me')
        return user.displayName ?? ''
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
