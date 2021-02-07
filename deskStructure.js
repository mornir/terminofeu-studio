// https://www.sanity.io/docs/structure-builder/how-it-works

import S from '@sanity/desk-tool/structure-builder'
import {
  AiFillEye,
  AiFillEdit,
  AiOutlineContainer,
  AiOutlineApartment,
  AiOutlineFileSearch,
} from 'react-icons/ai'

import IframePreview from './components/previews/iframe/IframePreview'
import { langs } from './schemas/builder/langs'
import { statusList } from './schemas/data/statusList'

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Only show the iframe for documents for which a preview makes sense.

  // types.includes(types)
  if (schemaType === 'entry') {
    return S.document().views([
      S.view.form().icon(AiFillEdit),
      S.view
        .component(IframePreview)
        .options({ addPreviewParam: true })
        .title('Vorschau')
        .icon(AiFillEye),
    ])
  }
}

export default () =>
  S.list()
    .title('Inhalt')
    .items([
      S.listItem()
        .title('Einträge')
        .icon(AiOutlineContainer)
        .child(S.documentTypeList('entry')),
      S.listItem()
        .title('Einträge nach Status')
        .child(
          S.list()
            .title('Einträge nach Status')
            .items([
              S.divider(),
              ...statusList.map((status) => {
                return S.listItem()
                  .title(status.title)
                  .child(
                    S.documentList()
                      .title(status.title)
                      .filter('_type == "entry" && status == $status')
                      .params({ status: status.value })
                      .defaultOrdering([{ field: 'deTitle', direction: 'asc' }])
                  )
              }),
            ])
        ),
      S.listItem()
        .title('Quellen')
        .icon(AiOutlineFileSearch)
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
      /*      S.listItem()
        .title('Sachgebiete')
        .icon(AiOutlineApartment)
        .child(S.documentTypeList('domain')), */
    ])
