export const assemblePageUrl = (document, options) => {
  const rootURL = 'https://terminofeu.ch/de/'
  const { _id, _type } = document
  /*  const addPreviewParam = options?.addPreviewParam */

  if (!_id) {
    return ''
  }

  let url = ''
  if (_type === 'entry') {
    url = rootURL + 'entry/' + _id
  }

  if (_type == 'term') {
    url = rootURL + 'term/' + _id
  }

  /* if (addPreviewParam) {
    url += '/?preview=true'
  } */

  return url
}

const defaults = { nonTextBehavior: 'remove' }

export function toPlainText(blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts)
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`
      }

      return block.children.map((child) => child.text).join('')
    })
    .join('\n\n')
}
