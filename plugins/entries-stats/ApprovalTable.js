import React, { useEffect, useState, useMemo } from 'react'
import { useTable } from 'react-table'
import sanityClient from 'part:@sanity/base/client'
import styles from './ApprovalTable.css'
import { IntentLink } from 'part:@sanity/base/router'
import { getPublishedId } from 'part:@sanity/base/util/draft-utils'

const query = /* groq */ `*[_type == "entry"][0...10] {
  _id,
  "entry": deTitle,
  "approvalsCount": count(approvals[approval == "approve"]),
}`

export default function ApprovalTable() {
  const columns = useMemo(
    () => [
      {
        Header: 'Eintrag',
        accessor: 'entry',
      },
      {
        Header: 'Ja',
        accessor: 'approvalsCount',
      },
    ],
    []
  )

  const [data, setData] = useState([])

  useEffect(() => {
    sanityClient.fetch(query).then(setData).catch(console.error)
  }, [])

  const tableInstance = useTable({ columns, data })
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
  return (
    <div className={styles.container}>
      <div className={styles.tableWrap}>
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render('Header')
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row)
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        console.log(cell)
                        return (
                          <td {...cell.getCellProps()}>
                            <IntentLink
                              intent="edit"
                              params={{
                                type: 'entry',
                                id: getPublishedId(cell.row.original._id),
                              }}
                            >
                              {cell.render('Cell')}
                            </IntentLink>
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
