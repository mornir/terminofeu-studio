import React, { useEffect, useState } from 'react'
import { Stack, Box, Heading, Text } from '@sanity/ui'
import sanityClient from 'part:@sanity/base/client'
import styles from './Review.css'
import { toPlainText } from '../../utils/toPlainText'

function Review({ document, documentId }) {
  const { published, draft } = document

  const [source, setSource] = useState(null)

  const client = sanityClient.withConfig({ apiVersion: '2022-02-02' })

  useEffect(() => {
    const query = `*[_id == $id][0].content.fr.definitionSource {
  type,
  reference->{title, url}
}`

    const params = { id: documentId }

    client
      .fetch(query, params)
      .then((source) => {
        if (source.reference?.title !== 'Traduction AEAI') {
          setSource(source)
        }
      })
      .catch((error) => console.error(error))
  }, [])

  function referenceType(type) {
    if (type === 'original') {
      return 'Définition reprise verbatim de '
    } else if (type === 'after') {
      return 'Définition adaptée de '
    } else {
      return ''
    }
  }

  if (!published) {
    return (
      <Box padding={4}>
        <Text size={2}>Der Eintrag wurde noch nie veröffentlicht.</Text>{' '}
      </Box>
    )
  }

  return (
    <div className={styles.container}>
      <Box padding={4}>
        <Stack space={5} paddingBottom={6}>
          <Heading as="h2" size={6}>
            Veröffentliche Version
          </Heading>

          <Text size={3}>{toPlainText(published.content.de?.definition)}</Text>

          <Stack space={4}>
            <Text size={3}>
              {toPlainText(published.content.fr?.definition)}
            </Text>
            {source && (
              <Text size={2} muted>
                {referenceType(source.type)}
                {source.url ? (
                  <a href={source.url} target="_blank">
                    {source.reference?.title}
                  </a>
                ) : (
                  <span>{source.reference?.title}</span>
                )}
              </Text>
            )}
          </Stack>
        </Stack>

        <Stack space={4}>
          <Text size={2}>{toPlainText(published.content.de?.note)}</Text>
          <Text size={2}>{toPlainText(published.content.fr?.note)}</Text>
        </Stack>
      </Box>

      {draft && (
        <Box padding={4}>
          <Stack space={5} paddingBottom={6}>
            <Heading as="h2" size={6}>
              Version im Entwurf
            </Heading>

            <Text size={3}>{toPlainText(draft.content.de?.definition)}</Text>
            <Text size={3}>{toPlainText(draft.content.fr?.definition)}</Text>
          </Stack>

          <Stack space={4}>
            <Text size={2}>{toPlainText(draft.content.de?.note)}</Text>
            <Text size={2}>{toPlainText(draft.content.fr?.note)}</Text>
          </Stack>
        </Box>
      )}
    </div>
  )
}

export default Review
