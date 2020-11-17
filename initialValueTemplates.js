import T from '@sanity/base/initial-value-template-builder'

import { langs } from './schemas/builder/langs'

export default [
  T.template({
    id: 'entry',
    title: 'Eintrag',
    schemaType: 'entry',
    value: {
      status: 'draft',
    },
  }),
  ...langs.map(({ code }) =>
    T.template({
      id: `term-${code}`,
      title: `Begriff ${code.toUpperCase()}`,
      schemaType: 'term',
      value: {
        lang: code,
      },
    })
  ),
  ...langs.map(({ code }) =>
    T.template({
      id: `source-${code}`,
      title: `Quelle ${code.toUpperCase()}`,
      schemaType: 'source',
      value: {
        lang: code,
      },
    })
  ),
]
