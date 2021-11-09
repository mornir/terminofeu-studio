import React, { useEffect, useState } from 'react'

import sanityClient from 'part:@sanity/base/client'
import { statusList } from '../../schemas/data/statusList'
import { translationStatusList } from '../../schemas/data/translationStatusList'
import { Heading, Box } from '@sanity/ui'

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  Cell,
} from 'recharts'

// Sanity uses CSS modules for styling. We import a stylesheet and get an
// object where the keys matches the class names defined in the CSS file and
// the values are a unique, generated class name. This allows you to write CSS
// with only your components in mind without any conflicting class names.
// See https://github.com/css-modules/css-modules for more info.
import styles from './MyTool.css'

const list = statusList
  .map(
    ({ value }) =>
      `"${value}": count(*[_type == "entry" && status == "${value}"])`
  )
  .join(',')

const list2 = translationStatusList
  .map(
    ({ value }) =>
      `"${value}": count(*[_type == "entry" && translationStatus == "${value}"])`
  )
  .join(',')

const query = `
{
   ${list},
   ${list2}
}`

function MyTool() {
  const [data, setData] = useState([])

  const [data2, setData2] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(query)
      .then((counts) => {
        const newData = [
          {
            title: 'BSV 2015',
            Anzahl: counts.draft,
            color: '#EF4444',
          },
          {
            title: 'Entwurf',
            Anzahl: counts.new_draft,
            color: '#F97316',
          },
          {
            title: 'Definition',
            Anzahl: counts.definition,
            color: '#EAB308',
          },
          {
            title: 'Freigabe',
            Anzahl: counts.approved,
            color: '#84CC16',
          },
          {
            title: 'Kernausschuss',
            Anzahl: counts.validated,
            color: '#10B981',
          },
          {
            title: 'BSV 2026',
            Anzahl: counts.in_force,
            color: '#06B6D4',
          },
        ]
        setData(newData)

        const newData2 = [
          {
            title: 'Übersetzung',
            Anzahl: counts.translation,
            color: '#EF4444',
          },
          {
            title: 'Revision',
            Anzahl: counts.review,
            color: '#F97316',
          },
          {
            title: 'Kontrolle',
            Anzahl: counts.validation,
            color: '#EAB308',
          },
          {
            title: 'Freigabe',
            Anzahl: counts.validated,
            color: '#84CC16',
          },
        ]

        setData2(newData2)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className={styles.container}>
      <Box marginBottom={4} marginLeft={5}>
        <Heading as="h2" size={2}>
          Einträgeanzahl je nach Status
        </Heading>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Anzahl">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <Box marginBottom={4} marginLeft={5} marginTop={6}>
        <Heading as="h2" size={2}>
          Stand des Übersetzungsprozesses ins Französisch
        </Heading>
      </Box>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Anzahl">
            {data2.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MyTool
