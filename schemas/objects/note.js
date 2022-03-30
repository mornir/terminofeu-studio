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
    },
    prepare({ author, text }) {
      return {
        title: text,
        subtitle: author,
      }
    },
  },
}
