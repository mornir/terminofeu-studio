import { langs } from '../builder/langs'

export default {
  name: 'hiddenEntryTitles',
  type: 'object',
  fields: langs.map(({ title, code }) => {
    return {
      title,
      type: 'string',
      name: code,
    }
  }),
}
