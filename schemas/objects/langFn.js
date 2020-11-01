// *[_type == 'deTerm' && count(*[references(^._id)])
export default ({ title, code }) => {
  return {
    title,
    name: code,
    type: 'object',
    fieldset: code,
    fields: [
      {
        type: 'array',
        name: 'terms',
        title: 'Begriffe',
        of: [
          {
            type: 'reference',
            to: [{ type: `${code}Term` }],
          },
        ],
      },
    ],
  }
}
