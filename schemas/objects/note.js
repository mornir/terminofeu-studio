import reviewers from '../data/reviewers'

export default {
  name: 'note',
  title: 'note',
  type: 'object',
  fields: [
    {
      name: 'author',
      title: 'Verfasser',
      type: 'string',
      options: {
        list: reviewers,
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
