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
