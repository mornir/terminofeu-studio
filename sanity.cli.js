import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'terminofeu',
  api: {
    projectId: 'nipfx4rq',
    dataset: 'production',
  },
  reactStrictMode: true,
})
