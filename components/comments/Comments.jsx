import React from 'react'
import { Stack, Card, Label, Box, Heading, Flex } from '@sanity/ui'

import styles from './Comments.css'

function Comments({ document }) {
  function checkComments(comments) {
    if (comments) {
      return (
        <Stack space={[3, 3, 4]} marginBottom={6}>
          <Heading as="h2" size={2}>
            Kommentare
          </Heading>
          <Flex direction="column-reverse">
            {comments.map((comment) => {
              return (
                <Card padding={[3, 3, 4]} radius={2} shadow={1} marginY={2}>
                  <Box marginBottom={3}>
                    <Label size={0}>{comment.author}</Label>
                  </Box>
                  <p class={styles.noteText}>{comment.text}</p>
                </Card>
              )
            })}
          </Flex>
        </Stack>
      )
    } else {
      return <p className={styles.noComment}>Keine Kommentare</p>
    }
  }

  return (
    <div className={styles.container} lang="de">
      {checkComments(document.displayed.notes)}
    </div>
  )
}

export default Comments
