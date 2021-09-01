// https://www.sanity.io/docs/structure-builder/how-it-works
import userStore from 'part:@sanity/base/user'
import S from '@sanity/desk-tool/structure-builder'
import {
  AiFillEye,
  AiFillEdit,
  AiOutlineContainer,
  AiOutlineFileSearch,
  AiOutlineMessage,
} from 'react-icons/ai'

import IframePreview from './components/previews/iframe/IframePreview'
import Comments from './components/comments/Comments'
import DocumentsPane from 'sanity-plugin-documents-pane'

import { langs } from './schemas/data/langs'
import { statusList } from './schemas/data/statusList'

export const getDefaultDocumentNode = (doc) => {
  if (doc.schemaType === 'entry') {
    return S.document().views([
      S.view.form().icon(AiFillEdit),
      S.view
        .component(IframePreview)
        .options({ addPreviewParam: true })
        .title('Eintrag anzeigen')
        .icon(AiFillEye),
      S.view.component(Comments).title('Kommentare').icon(AiOutlineMessage),
    ])
  }

  if (doc.schemaType === 'source') {
    return S.document().views([
      S.view.form().icon(AiFillEdit),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id)]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('Einträge'),
    ])
  }
}

export default async () => {
  const { id } = await userStore.getUser('me')

  const translators = ['puCcAHT8N', 'pfoCdHT74']
  const experts = [...translators, 'pNqrbwTtv']

  const translationsItems = [
    S.listItem()
      .title('Traductions')
      .child(
        S.documentList()
          .id('translations')
          .title('Traductions')
          .filter('_type == "entry" && translationStatus == "translation"')
          .defaultOrdering([{ field: 'deTitle', direction: 'asc' }])
      ),
    S.listItem()
      .title('Révisions')
      .child(
        S.documentList()
          .id('revisions')
          .title('Révisions')
          .filter('_type == "entry" && translationStatus == "review"')
          .defaultOrdering([{ field: 'deTitle', direction: 'asc' }])
      ),
  ]

  const expertsItems = [
    S.listItem()
      .title('Vérifications')
      .child(
        S.documentList()
          .id('controls')
          .title('Vérifications')
          .filter('_type == "entry" && translationStatus == "validation"')
          .defaultOrdering([{ field: 'deTitle', direction: 'asc' }])
      ),
  ]

  return S.list()
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
      ...(translators.includes(id) ? translationsItems : []),
      ...(experts.includes(id) ? expertsItems : []),
    ])
}
