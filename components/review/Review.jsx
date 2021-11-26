import React from 'react'
import { Stack, Card, Box, Heading, Text } from '@sanity/ui'

import styles from './Review.css'
import { toPlainText } from '../../utils/toPlainText'

function Review({ document }) {
  const { published, draft } = document

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
    </div>
  )
}

export default Review
