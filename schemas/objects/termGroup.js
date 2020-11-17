export default {
  title: 'Begriff',
  name: 'termGroup',
  type: 'object',
  fields: [
    {
      title: 'Benennung',
      name: 'designation',
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
    {
      title: 'Quelle',
      name: 'source',
      type: 'string',
      type: 'reference',
      to: [{ type: 'source' }],
      options: {
        filter: ({ document }) => {
          // Always make sure to check for document properties
          // before attempting to use them
          if (!document.lang) {
            return {
              filter: 'lang == $lang',
              params: { lang: 'de' },
            }
          }

          return {
            filter: 'lang == $lang',
            params: {
              lang: document.lang,
            },
          }
        },
      },
    },
    {
      title: 'Anmerkungen (fakultativ)',
      name: 'notice',
      type: 'blockContent',
      description: 'Benennungsbezogenen oder begriffsbezogenen Informationen',
    },
  ],
}
