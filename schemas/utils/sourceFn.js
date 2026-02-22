export const filter = ({ document, parentPath }) => {
  // Always make sure to check for document properties
  // before attempting to use them
  if (!parentPath[0] === 'content' && !parentPath[1]) {
    return {
      filter: 'lang == $lang',
      params: { lang: 'de' },
    }
  } else {
    return {
      filter: 'lang == $lang',
      params: {
        lang: parentPath[1],
      },
    }
  }
}
