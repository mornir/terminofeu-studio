import React, { useEffect, useState } from 'react'
import { Stack, Box, Heading, Text } from '@sanity/ui'
import { useClient } from 'sanity'
import styles from './Review.css?inline'
import { PortableText } from '@portabletext/react'

function Review({ document, documentId }) {
  const { published, draft } = document

  if (!published) {
    return (
      <Box padding={4}>
        <Text size={2}>Der Eintrag wurde noch nie veröffentlicht.</Text>{' '}
      </Box>
    )
  }

  if (!draft?.content?.fr && !published?.content?.fr) {
    return (
      <Box padding={4}>
        <Text size={2}>Aucun contenu en français.</Text>{' '}
      </Box>
    )
  }

  const comments = published.notes || []

  const isComment = comments.some((comment) => comment.author === 'Jérôme Pott')

  const [definitionSource, setDefinitionSource] = useState({})
  const [noteSource, setNoteSource] = useState({})

  const client = useClient().withConfig({ apiVersion: '2023-01-19' })

  useEffect(() => {
    const query = /* groq */ `*[_id == $id][0] {
      content {
      fr {
        definitionSource {
          type,
          reference->{title, url}
        },
      notesSource {
          type,
          reference->{title, url}
        }
  }
  }
}`

    const params = { id: documentId }

    client
      .fetch(query, params)
      .then((sources) => {
        const definitionSource = sources.content.fr?.definitionSource
        if (definitionSource?.reference?.title) {
          setDefinitionSource(definitionSource)
        }

        const noteSource = sources.content.fr?.notesSource
        if (noteSource?.reference?.title) {
          setNoteSource(noteSource)
        }
      })
      .catch((error) => console.error(error))
  }, [])

  function referenceType(type) {
    if (!type) {
      return ''
    } else if (type === 'original') {
      return 'Définition reprise verbatim de '
    } else if (type === 'after') {
      return 'Définition adaptée de '
    } else {
      return ''
    }
  }

  function renderText(blocks) {
    return blocks ? <PortableText value={blocks} /> : ''
  }

  return (
    <div className={styles.container}>
      <Box padding={4}>
        {isComment ? (
          <Text weight="semibold">
            Jérôme a laissé un commentaire dans l'onglet Kommentare.
          </Text>
        ) : (
          ''
        )}
        <Stack space={3} paddingBottom={6} paddingTop={4}>
          <Heading as="h2" size={6}>
            Veröffentliche Version
          </Heading>

          <Text size={3}>{renderText(published.content.de?.definition)}</Text>

          <Stack space={2}>
            <Text size={3}>{renderText(published.content.fr?.definition)}</Text>
            {definitionSource && (
              <Text size={2} muted>
                {referenceType(definitionSource.type)}
                {definitionSource.reference?.url ? (
                  <a href={definitionSource.reference.url} target="_blank">
                    {definitionSource.reference?.title}
                  </a>
                ) : (
                  <span>{definitionSource.reference?.title}</span>
                )}
              </Text>
            )}
          </Stack>
        </Stack>

        <Stack space={4}>
          <Text size={2}>{renderText(published.content.de?.note)}</Text>
          <Text size={2}>{renderText(published.content.fr?.note)}</Text>
          {noteSource && (
            <Text size={2} muted>
              {referenceType(noteSource.type)}
              {noteSource.reference?.url ? (
                <a href={noteSource.reference.url} target="_blank">
                  {noteSource.reference?.title}
                </a>
              ) : (
                <span>{noteSource.reference?.title}</span>
              )}
            </Text>
          )}
        </Stack>
      </Box>

      {draft && (
        <Box padding={4}>
          <Stack space={3} paddingBottom={6}>
            <Heading as="h2" size={6}>
              Version im Entwurf
            </Heading>

            <Text size={3}>{renderText(draft.content.de?.definition)}</Text>
            <Text size={3}>{renderText(draft.content.fr?.definition)}</Text>
          </Stack>

          <Stack space={4}>
            <Text size={2}>{renderText(draft.content.de?.note)}</Text>
            <Text size={2}>{renderText(draft.content.fr?.note)}</Text>
          </Stack>
        </Box>
      )}
    </div>
  )
}

export default Review
