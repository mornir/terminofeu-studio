import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your project ID>'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const appId = process.env.SANITY_STUDIO_APP_ID || '<your app ID>'

export default defineCliConfig({
  studioHost: 'terminofeu',
  api: {
    projectId: 'nipfx4rq',
    dataset,
  },
  deployment: { autoUpdates: false, appId },
})
