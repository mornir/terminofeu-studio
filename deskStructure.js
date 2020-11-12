// https://www.sanity.io/docs/structure-builder/how-it-works

import S from '@sanity/desk-tool/structure-builder'

import { MdVisibility, MdEdit } from 'react-icons/md'

import IframePreview from './components/previews/iframe/IframePreview'

const hiddenDocTypes = (listItem) => !['term'].includes(listItem.getId())

const types = ['term', 'entry']

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Only show the iframe for documents for which a preview makes sense.

  // types.includes(types)
  if (types.includes(schemaType)) {
    return S.document().views([
      S.view.form().icon(MdEdit),
      S.view
        .component(IframePreview)
        .options({ addPreviewParam: true })
        .title('Vorschau')
        .icon(MdVisibility),
    ])
  }
}

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
            .title('Begriffe')
            .items([
              ...langs.map((lang) => {
                return S.listItem()
                  .title(lang.title)
                  .child(
                    S.documentList()
                      .title(lang.title)
                      .filter('_type == "term" && lang== $lang')
                      .params({ lang: lang.code })
                      .initialValueTemplates([
                        S.initialValueTemplateItem('term-' + lang.code),
                      ])
                  )
              }),
            ])
        ),
    ])
