// https://www.sanity.io/docs/structure-builder/how-it-works

import S from '@sanity/desk-tool/structure-builder'

const hiddenDocTypes = (listItem) => !['term'].includes(listItem.getId())

const langs = [
  {
    title: 'Deutsch',
    code: 'de',
  },
  {
    title: 'Französisch',
    code: 'fr',
  },
  {
    title: 'Italienisch',
    code: 'it',
  },
]

export default () =>
  S.list()
    .title('Inhalt')
    .items([
      ...S.documentTypeListItems().filter(hiddenDocTypes),

      S.listItem()
        .title('Begriffe')
        .child(
          S.list()
            .title('Publikationen')
            .items([
              ...langs.map((lang) => {
                return S.listItem()
                  .title(lang.title)
                  .child(
                    S.documentList()
                      .title(lang.title)
                      .filter('_type == "term" && language == $lang')
                      .params({ lang: lang.code })
                  )
              }),
            ])
        ),
    ])
