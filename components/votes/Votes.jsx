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
  const [isSending, setIsSending] = useState(false)

  const { displayed, published } = document
  const approvals = displayed.approvals

  useEffect(() => {
    userStore.getUser('me').then((user) => {
      setUsername(user.displayName)
      let approvalObj = approvals.find((app) => app.author === user.displayName)
      if (approvalObj?.approval) {
        setVote(approvalObj.approval)
        setVoteIndex(approvalObj._key)
      }
    })
  }, [])

  async function postVote(event) {
    if (isSending) return
    setIsSending(true)

    const radioValue = event.target.value
    setVote(radioValue)

    const key = nanoid()

    if (voteIndex) {
      console.log('vote already exist!', voteIndex)
      const voteToRemove = `approvals[_key=="${voteIndex}"]`

      await sanityClient
        .patch(displayed._id)
        .unset([voteToRemove])
        .setIfMissing({ approvals: [] })
        .append('approvals', [
          { _key: key, author: username, approval: radioValue },
        ])
        .commit()
        .catch((err) => {
          console.error('Transaction failed: ', err.message)
        })
    } else {
      await sanityClient
        .patch(displayed._id)
        .setIfMissing({ approvals: [] })
        .append('approvals', [
          { _key: key, author: username, approval: radioValue },
        ])
        .commit()
        .catch((err) => {
          console.error('Transaction failed: ', err.message)
        })
    }

    setVoteIndex(key)
    setIsSending(false)
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
            disabled={isSending}
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
            disabled={isSending}
          />
          <label htmlFor="reject" class={styles.radioLabel}>
            Nein
          </label>
        </Flex>
      </Inline>
      <div>
        <ul>
          {approvals.map((approve) => {
            if (!approve.approval) return null
            const vote = approve.approval === 'approve' ? '✅' : '❌'
            return (
              <li>
                {approve.author} {vote}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Votes
