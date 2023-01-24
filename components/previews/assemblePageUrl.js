export const assemblePageUrl = (document) => {
  const rootURL = 'https://terminofeu.ch/de/'
  const { _id, _type } = document

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

  return url
}
