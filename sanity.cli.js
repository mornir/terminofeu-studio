import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your project ID>'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  studioHost: 'terminofeu',
  api: {
    projectId,
    dataset,
  },
  deployment: { autoUpdates: false },
})
