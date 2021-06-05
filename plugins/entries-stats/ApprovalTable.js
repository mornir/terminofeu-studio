import React, { useEffect, useState, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import sanityClient from 'part:@sanity/base/client'
import styles from './ApprovalTable.css'
import { IntentLink } from 'part:@sanity/base/router'
import { getPublishedId } from 'part:@sanity/base/util/draft-utils'

const query = /* groq */ `*[_type == "entry" && !(_id in path('drafts.**'))] {
  _id,
  "entry": deTitle,
  "approvalsCount": count(approvals[approval == "approve"]),
  "rejectsCount": count(approvals[approval == "reject"])
}`

export default function ApprovalTable() {
  const columns = useMemo(
    () => [
      {
        Header: 'Eintrag',
        accessor: 'entry',
      },
      {
        Header: '✅',
        accessor: 'approvalsCount',
      },
      {
        Header: '❌',
        accessor: 'rejectsCount',
      },
    ],
    []
  )

  const [data, setData] = useState([])

  useEffect(() => {
    sanityClient.fetch(query).then(setData).catch(console.error)
  }, [])

  const tableInstance = useTable({ columns, data }, useSortBy)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
  return (
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
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {
                        // Render the header
                        column.render('Header')
                      }
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ' ↕ '}
                      </span>
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

              // Check if divergence in votes
              const voteTypes = row.cells
                .map((c) => c.value)
                .filter(Number)
                .filter(Boolean).length

              return (
                // Apply the row props
                <tr
                  {...row.getRowProps()}
                  className={voteTypes > 1 && styles.divergence}
                >
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Display first column values (entries) as links
                      if (cell.column.id !== 'entry') {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        )
                      } else {
                        return (
                          <td {...cell.getCellProps()}>
                            <IntentLink
                              intent="edit"
                              params={{
                                type: 'entry',
                                id: getPublishedId(cell.row.original._id),
                              }}
                              className={styles.link}
                            >
                              {cell.render('Cell')}
                            </IntentLink>
                          </td>
                        )
                      }
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
