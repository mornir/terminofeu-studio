// https://www.sanity.io/docs/structure-builder/how-it-works

import S from '@sanity/desk-tool/structure-builder'

import { MdVisibility, MdEdit } from 'react-icons/md'

import IframePreview from './components/previews/iframe/IframePreview'

import { langs } from './schemas/builder/langs'

/* const hiddenDocTypes = (listItem) => !['term', 'entry'].includes(listItem.getId()) */

import { statusList } from './schemas/documents/entry'

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

export default () =>
  S.list()
    .title('Inhalt')
    .items([
      S.listItem()
        .title('Einträge')
        .child(
          S.list()
            .title('Einträge')
            .items([
              S.listItem()
                .title('Alle Einträge')
                .child(
                  S.documentList().title('Alle').filter('_type == "entry"')
                ),
              S.divider(),
              ...statusList.map((status) => {
                return S.listItem()
                  .title(status.title)
                  .child(
                    S.documentList()
                      .title(status.title)
                      .filter('_type == "entry" && status == $status')
                      .params({ status: status.value })
                  )
              }),
            ])
        ),
      S.listItem()
        .title('Quellen')
        .child(
          S.list()
            .title('Quellen')
            .items([
              ...langs.map((lang) => {
                return S.listItem()
                  .title(lang.title)
                  .child(
                    S.documentList()
                      .title(lang.title)
                      .filter('_type == "source" && lang == $lang')
                      .params({ lang: lang.code })
                  )
              }),
            ])
        ),
    ])
