import React, { useState } from 'react'
import { Stack, Card, TextArea, Button, Label, Box, Heading } from '@sanity/ui'
import sanityClient from 'part:@sanity/base/client'
import { useDocumentOperation } from '@sanity/react-hooks'
import userStore from 'part:@sanity/base/user'
import { nanoid } from 'nanoid'

import styles from './Comments.css'

function Comments({ document }) {
  const { displayed, published } = document

  const [text, setText] = useState('')

  const { publish } = useDocumentOperation(published._id, 'entry')

  async function postText(event) {
    event.preventDefault()
    const { displayName } = await userStore.getUser('me')

    await sanityClient
      .patch(displayed._id)
      .setIfMissing({ notes: [] })
      .append('notes', [{ _key: nanoid(), author: displayName, text }])
      .commit()
      .catch((err) => {
        console.error('Transaction failed: ', err.message)
      })

    setText('')

    publish.execute()
  }

  return (
    <div className={styles.container} lang="de">
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

      <form onSubmit={postText}>
        <Stack space={[3, 3, 4]} marginBottom={2}>
          <TextArea
            fontSize={[2, 2, 3, 4]}
            padding={[3, 3, 4]}
            value={text}
            name="text"
            onChange={(event) => setText(event.target.value)}
            placeholder="Kommentar hier schreiben"
          />
          <Button
            fontSize={[2, 2, 3]}
            padding={[3, 3, 4]}
            text="Kommentieren"
            tone="primary"
            type="submit"
          />
        </Stack>
      </form>
    </div>
  )
}

export default Comments
