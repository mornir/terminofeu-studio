import React from 'react'
import styles from './styles.css'
import { List, Item } from 'part:@sanity/components/lists/default'
import { Select } from '@sanity/ui'
import { RiFileExcel2Line } from 'react-icons/ri'

function DownloadsList() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Download Center</h2>
      </header>
      <div className={styles.content}>
        <Select fontSize={[1, 1, 2, 3]} padding={[2, 2, 3]} space={[2, 2, 3]}>
          <option>Alle Begriffe</option>
          <option>Im Definitionsprozess</option>
        </Select>
        <List className={styles.list}>
          <Item>
            <a className={styles.link}>
              <RiFileExcel2Line size={'2em'} />
              Excel (.xlsx)
            </a>
          </Item>
        </List>
      </div>
    </div>
  )
}

export default {
  name: 'downloads-list',
  component: DownloadsList,
}
