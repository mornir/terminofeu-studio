import { buildLegacyTheme, defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { deDELocale } from '@sanity/locale-de-de'
import { dashboardTool } from '@sanity/dashboard'
import { visionTool } from '@sanity/vision'
import { documentListWidget } from 'sanity-plugin-dashboard-widget-document-list'
import schemas from './schemas/schema'
import { structure, defaultDocumentNode } from './structure'
import { welcomeWidget } from './desktop-widgets/welcome-widget'
import { downloadsList } from './desktop-widgets/downloads-widget'

import EntriesStats from './tools/entries-stats/EntriesStats'
import Miro from './tools/miro/Miro'

const myTheme = buildLegacyTheme({
  '--main-navigation-color': '#c05621',
  '--brand-primary': '#dd6b20',
  '--brand-secondary': '#f6ad55',
})

export default defineConfig({
  title: 'Terminofeu',
  projectId: 'nipfx4rq',
  dataset: 'production',
  releases: {
    enabled: false,
  },
  scheduledPublishing: {
    enabled: false,
  },
  tasks: { enabled: false },
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
      title: 'Einträge',
    }),
    dashboardTool({
      widgets: [
        welcomeWidget,
        downloadsList,
        documentListWidget({
          title: 'Zuletzt bearbeitete Einträge',
          order: '_updatedAt desc',
          limit: 20,
          types: ['entry'],
          showCreateButton: false,
          layout: { width: 'small' },
        }),
        documentListWidget({
          title: 'Zuletzt bearbeitete Quellen',
          order: '_updatedAt desc',
          limit: 20,
          types: ['source'],
          showCreateButton: false,
          layout: { width: 'small' },
        }),
      ],
    }),
    visionTool(),
    deDELocale(),
  ],
  tools: [EntriesStats, Miro],
  schema: {
    types: schemas,
  },
  document: {
    comments: {
      enabled: false,
    },
    productionUrl: async (prev, context) => {
      const { document } = context
      if (document._type === 'entry') {
        return `https://terminofeu.ch/de/entry/${document._id}`
      }
      return prev
    },
  },
  theme: myTheme,
})
