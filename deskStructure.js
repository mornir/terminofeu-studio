// https://www.sanity.io/docs/structure-builder/how-it-works
import userStore from 'part:@sanity/base/user'
import S from '@sanity/desk-tool/structure-builder'
import {
  AiFillEye,
  AiFillEdit,
  AiOutlineContainer,
  AiOutlineApartment,
  AiOutlineUser,
  AiOutlineFileSearch,
  AiFillCheckSquare,
  AiOutlineMessage,
} from 'react-icons/ai'

//import IframePreview from './components/previews/iframe/IframePreview'
import Comments from './components/comments/Comments'
/* import Votes from './components/votes/Votes' */

import { langs } from './schemas/data/langs'
import { statusList } from './schemas/data/statusList'

export const getDefaultDocumentNode = (doc) => {
  if (doc.schemaType === 'entry') {
    return S.document().views([
      S.view.form().icon(AiFillEdit),
      /* S.view.component(Votes).title('Abstimmungen').icon(AiFillCheckSquare), */
      S.view.component(Comments).title('Kommentare').icon(AiOutlineMessage),
      /* S.view
        .component(IframePreview)
        .options({ addPreviewParam: true })
        .title('Vorschau')
        .icon(AiFillEye), */
    ])
  }
}

export default async () => {
  const { displayName } = await userStore.getUser('me')

  return S.list()
    .title('Inhalt')
    .items([
      S.listItem()
        .title(displayName)
        .icon(AiOutlineUser)
        .child(
          S.list()
            .title('Meine Abstimmungen')
            .items([
              S.listItem()
                .title('Ja')
                .id('approve')
                .child(
                  S.documentList()
                    .title('Ja')
                    .filter(
                      '_type == "entry" && approvals[].approval == "approve" && approvals[].author == $name'
                    )
                    .params({ name: displayName })
                    .defaultOrdering([{ field: 'deTitle', direction: 'asc' }])
                ),
              S.listItem()
                .title('Nein')
                .id('reject')
                .child(
                  S.documentList()
                    .title('Nein')
                    .filter(
                      '_type == "entry" && approvals[].approval == "reject" && approvals[].author == $name'
                    )
                    .params({ name: displayName })
                    .defaultOrdering([{ field: 'deTitle', direction: 'asc' }])
                ),
              S.listItem()
                .title('Noch keine Abstimmung')
                .id('no_vote')
                .child(
                  S.documentList()
                    .title('Noch keine Abstimmung')
                    .filter('_type == "entry" && approvals[].author != $name')
                    .params({ name: displayName })
                    .defaultOrdering([{ field: 'deTitle', direction: 'asc' }])
                ),
            ])
        ),
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
      /*      S.listItem()
        .title('Sachgebiete')
        .icon(AiOutlineApartment)
        .child(S.documentTypeList('domain')), */
    ])
}
