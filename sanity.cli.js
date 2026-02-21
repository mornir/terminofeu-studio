import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'terminofeu',
  api: {
    projectId: 'nipfx4rq',
    dataset: 'production',
  },
  deployment: { autoUpdates: false, appId: '5e74a01e2c727e094610caf4' },
})
