import React, { useEffect, useState } from 'react'
import { Stack, Box, Heading, Text } from '@sanity/ui'
import sanityClient from 'part:@sanity/base/client'
import styles from './Review.css'
import { toPlainText } from '../../utils/toPlainText'

function Review({ document, documentId }) {
  const { published, draft } = document

  const [definitions, setDefinitions] = useState([])

  useEffect(() => {
    const query = `*[_id == $id].content.fr.definitions[] {
          definition,
          source->
      }`

    const params = { id: documentId }

    sanityClient
      .fetch(query, params)
      .then((definitions) => {
        setDefinitions(definitions)
      })
      .catch((error) => console.error(error))
  }, [])

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
          <Text size={3}>{toPlainText(published.content.fr?.definition)}</Text>
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

      <Box padding={4}>
        <Stack space={5} paddingBottom={6}>
          <Heading as="h2" size={7}>
            Definitionen aus bestehenden Regelwerken
          </Heading>

          {definitions.map((def) => (
            <Text key={def._key} size={2} muted>
              {toPlainText(def.definition)}
            </Text>
          ))}
        </Stack>
      </Box>
    </div>
  )
}

export default Review
