import { buildLegacyTheme, defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { dashboardTool } from '@sanity/dashboard'
import { visionTool } from '@sanity/vision'
import { documentListWidget } from 'sanity-plugin-dashboard-widget-document-list'
import schemas from './schemas/schema'
import { structure, defaultDocumentNode } from './deskStructure'
import { welcomeWidget } from './plugins/welcome-widget'
import { downloadsList } from './plugins/downloads-widget'

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
    deskTool({
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
  ],
  tools: (prev, context) => {
    const isAdmin = context.currentUser.roles.find(
      ({ name }) => name === 'administrator'
    )
    if (isAdmin) {
      return prev
    }
    return prev.filter((tool) => tool.name !== 'vision')
  },
  schema: {
    types: schemas,
  },
  theme: myTheme,
})
