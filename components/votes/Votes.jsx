import React, { useState, useEffect } from 'react'
import { Box, Heading, Inline, Radio, Flex } from '@sanity/ui'
import sanityClient from 'part:@sanity/base/client'
import { useDocumentOperation } from '@sanity/react-hooks'
import userStore from 'part:@sanity/base/user'
import { nanoid } from 'nanoid'

import styles from './Votes.css'

function Votes({ document }) {
  const [vote, setVote] = useState('')
  const [voteIndex, setVoteIndex] = useState('')
  const [username, setUsername] = useState('')

  const { displayed, published } = document

  useEffect(() => {
    userStore.getUser('me').then((user) => {
      setUsername(user.displayName)
      let approvalObj = displayed.approvals.find(
        (app) => app.author === user.displayName
      )
      if (approvalObj?.approval) {
        setVote(approvalObj.approval)
        setVoteIndex(approvalObj._key)
      }
    })
  }, [])

  async function postVote(event) {
    const approval = event.target.value
    setVote(approval)

    if (vote) {
      const voteToRemove = `approvals[_key=="${voteIndex}"]`

      await sanityClient
        .patch(displayed._id)
        .unset([voteToRemove])
        .setIfMissing({ approvals: [] })
        .append('approvals', [{ _key: nanoid(), author: username, approval }])
        .commit()
        .catch((err) => {
          console.error('Transaction failed: ', err.message)
        })
    } else {
      await sanityClient
        .patch(displayed._id)
        .setIfMissing({ approvals: [] })
        .append('approvals', [{ _key: nanoid(), author: username, approval }])
        .commit()
        .catch((err) => {
          console.error('Transaction failed: ', err.message)
        })
    }
  }

  return (
    <div className={styles.container} lang="de">
      <Box marginBottom={4}>
        <Heading as="h2" size={1}>
          Soll der Begriff bzw. das Konzept in Entwurf übernommen?
        </Heading>
      </Box>
      <Inline space={6}>
        <Flex align="center">
          <Radio
            checked={vote === 'approve'}
            name="approve"
            value="approve"
            id="approve"
            onChange={postVote}
          />

          <label htmlFor="approve" class={styles.radioLabel}>
            Ja
          </label>
        </Flex>
        <Flex align="center">
          <Radio
            checked={vote === 'reject'}
            name="reject"
            value="reject"
            id="reject"
            onChange={postVote}
          />
          <label htmlFor="reject" class={styles.radioLabel}>
            Nein
          </label>
        </Flex>
      </Inline>
    </div>
  )
}

export default Votes
