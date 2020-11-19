export default {
  title: 'Definition',
  name: 'definition',
  type: 'object',
  fields: [
    {
      title: 'Definition',
      name: 'definition',
      type: 'blockContent',
    },
    {
      title: 'Quelle',
      name: 'source',
      type: 'string',
    },
    {
      type: 'string',
      name: 'status',
      title: 'Status',
      options: {
        list: [
          { title: 'genormt', value: 'normalized' },
          { title: 'nicht genormt', value: 'unnormalized' },
          { title: 'veraltet', value: 'new' },
          { title: 'abzulehnen', value: 'avoid' },
          { title: 'zulässig', value: 'allowed' },
        ],
      },
    },
  ],
}
