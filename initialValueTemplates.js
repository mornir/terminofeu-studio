import T from '@sanity/base/initial-value-template-builder'

export default [
  ...T.defaults(),
  T.template({
    id: 'term-de',
    title: 'Begriff DE',
    schemaType: 'term',
    value: {
      lang: 'de',
    },
  }),
  T.template({
    id: 'term-fr',
    title: 'Begriff FR',
    schemaType: 'term',
    value: {
      lang: 'fr',
    },
  }),
  T.template({
    id: 'term-it',
    title: 'Begriff IT',
    schemaType: 'term',
    value: {
      lang: 'it',
    },
  }),
]