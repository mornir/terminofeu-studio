import React, { useState } from 'react'
import { Stack, Card, TextArea, Button, Label, Box, Heading } from '@sanity/ui'
import sanityClient from 'part:@sanity/base/client'
import userStore from 'part:@sanity/base/user'
import { nanoid } from 'nanoid'

import styles from './Comments.css'

function Comments({ document }) {
  const { displayed } = document

  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  
  async function postText(event) {
    event.preventDefault()
    if (isSending) return

    setIsSending(true)

    const { displayName } = await userStore.getUser('me')

    await sanityClient
      .patch(displayed._id)
      .setIfMissing({ notes: [] })
      .append('notes', [{ _key: nanoid(), author: displayName, text }])
      .commit()
      .catch((error) => {
        console.error('Transaction failed: ', error.message)
      })

    setText('')
    setIsSending(false)
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
            fontSize={2}
            padding={[3, 3, 4]}
            value={text}
            name="text"
            onChange={(event) => setText(event.target.value)}
            placeholder="Kommentar hier schreiben"
            required
          />
          <Button
            fontSize={[2, 2, 3]}
            padding={[3, 3, 4]}
            text="Kommentieren"
            tone="primary"
            type="submit"
            disabled={isSending}
          />
        </Stack>
      </form>
    </div>
  )
}

export default Comments
