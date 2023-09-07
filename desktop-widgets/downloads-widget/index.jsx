import React, { useState } from 'react'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { useClient } from 'sanity'
import { DashboardWidgetContainer } from '@sanity/dashboard'
import { Stack, Text, Card } from '@sanity/ui'
import { RiFileExcel2Line } from 'react-icons/ri'
import { mkConfig, generateCsv, download } from 'export-to-csv'
const csvConfig = mkConfig({ useKeysAsHeaders: true })

import { statusList } from '../../schemas/data/statusList'
import { formatJSON } from './format-json/format-json'

// Function to convert Sanity rich text to plain text
const defaults = { nonTextBehavior: 'remove' }
function toPlainText(blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts)
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`
      }

      return block.children.map((child) => child.text).join('')
    })
    .join('\n\n')
}

function DownloadsList() {
  // Options for the select input
  const [options, setOptions] = useState(['definition'])
  const sanityClient = useClient({ apiVersion: '2023-01-19' })

  async function saveAsExcel() {
    try {
      // Prevent the generation of the xlsx if no option is selected
      if (options.length === 0) return

      const selectedStatus = options.map((s) => `"${s}"`).join(', ')

      const query = /* groq */ `*[_type == 'entry' && status in [${selectedStatus}]] {status, deTitle, 'definition': content.de.definition, 'note': content.de.note} | order(deTitle desc)`

      const entries = await sanityClient.fetch(query)

      const workbook = new ExcelJS.Workbook()
      workbook.creator = 'VKF'
      const fileName = 'Terminofeu_Export.xlsx'
      const worksheet = workbook.addWorksheet('Deutsch')
      worksheet.columns = [
        { header: 'Begriff', key: 'term', width: 32 },
        { header: 'Definition', key: 'definition', width: 62 },
        { header: 'Anmerkung', key: 'note', width: 62 },
        { header: 'Status', key: 'status', width: 28 },
      ]

      entries.forEach((entry) => {
        const note = entry.note ? toPlainText(entry.note) : ''
        const definition = entry.definition ? toPlainText(entry.definition) : ''
        const status = statusList.find(
          (item) => item.value === entry.status
        ).title
        worksheet.addRow({
          status,
          term: entry.deTitle,
          definition,
          note,
        })
      })

      const buffer = await workbook.xlsx.writeBuffer()

      saveAs(new Blob([buffer]), fileName)
    } catch (error) {
      console.error(error)
    }
  }

  async function saveAsCsv() {
    try {
      // Prevent the generation of the list if no option is selected
      if (options.length === 0) return
      const selectedStatus = options.map((s) => `"${s}"`).join(', ')
      const query = /* groq */ `*[_type == 'entry' && status in [${selectedStatus}]] {
                content {
                  de {
                    terms[] {
                        designation,
                        abbreviation
                    } 
                  },
                fr {
                    terms[] {
                        designation,
                        abbreviation
                    } 
                  }
                }
              }`

      const entries = await sanityClient.fetch(query)

      const formattedJSON = formatJSON(entries)

      const csvConfig = mkConfig({
        useKeysAsHeaders: true,
        columnHeaders: ['termDE', 'termFR'],
        showColumnHeaders: false,
        filename: `${formattedJSON.length}_Begriffe-${
          new Date().toISOString().split('T')[0]
        }`,
      })

      const csv = generateCsv(csvConfig)(formattedJSON)
      download(csvConfig)(csv)
    } catch (error) {
      console.error(error)
    }
  }

  function updateSelectedOptions(e) {
    // selectedOptions is array-like (HTMLCollection)
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setOptions(selectedOptions)
  }

  return (
    <DashboardWidgetContainer header={'Download Center'}>
      <div>
        <Stack padding={[2, 2, 3]} space={2}>
          <Text size={1}>
            Für Mehrfachauswahl: <br></br>
            <kbd>Ctrl</kbd> gedrückt halten
          </Text>

          <select multiple onChange={updateSelectedOptions} value={options}>
            {statusList.map(({ title, value }) => (
              <option value={value} key={value}>
                {title}
              </option>
            ))}
          </select>
        </Stack>
        <Card>
          <Stack space={2}>
            <button type="button" onClick={saveAsExcel}>
              <RiFileExcel2Line size={'2em'} />
              Excel (.xlsx)
            </button>
            <button type="button" onClick={saveAsCsv}>
              DeepL (.csv)
            </button>
          </Stack>
        </Card>
      </div>
    </DashboardWidgetContainer>
  )
}

export const downloadsList = {
  name: 'downloads-list',
  component: DownloadsList,
  layout: { width: 'small' },
}
