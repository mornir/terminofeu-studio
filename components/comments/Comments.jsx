import React from 'react'
import { Stack, Card, Label, Box, Heading } from '@sanity/ui'

import styles from './Comments.css'

function Comments({ document }) {
  const { displayed } = document

  function checkNotes(notes) {
    if (notes) {
      return (
        <Stack space={[3, 3, 4]} marginBottom={6}>
          <Heading as="h2" size={2}>
            Kommentare
          </Heading>
          {displayed.notes?.map((note) => {
            return (
              <Card padding={[3, 3, 4]} radius={2} shadow={1}>
                <Box marginBottom={3}>
                  <Label size={0}>{note.author}</Label>
                </Box>
                <p class={styles.noteText}>{note.text}</p>
              </Card>
            )
          })}
        </Stack>
      )
    } else {
      return <p className={styles.noComment}>Keine Kommentare</p>
    }
  }

  return (
    <div className={styles.container} lang="de">
      {checkNotes(displayed.notes)}
    </div>
  )
}

export default Comments
