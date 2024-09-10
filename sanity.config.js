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
import { CustomPublishAction } from './workflows/CustomPublishAction'

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
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
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
  tools: (defaultTools, context) => {
    const isAdmin = context.currentUser.roles.find(
      ({ name }) => name === 'administrator'
    )

    const tools = [...defaultTools, EntriesStats, Miro]

    if (isAdmin) {
      return tools
    }
    return tools.filter((tool) => tool.name !== 'vision')
  },
  schema: {
    types: schemas,
  },
  document: {
    comments: {
      enabled: false,
    },
    actions: (originalActions, context) => {
      // Only add the action for documents of type "movie"
      if (context.schemaType === 'entry') {
        // Replace the built-in publish action with my own
        return originalActions.map((originalAction) =>
          originalAction.action === 'publish'
            ? CustomPublishAction
            : originalAction
        )
      }

      return originalActions
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
