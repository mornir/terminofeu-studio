export default {
  title: 'Kontext',
  name: 'context',
  type: 'object',
  fields: [
    {
      title: 'Beispielsatz (für Übersetzer)',
      name: 'context',
      type: 'text',
      description: 'Typische fachsprachliche Verwendung einer Benennung',
    },
    {
      title: 'Quelle',
      name: 'source',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      context: 'context',
    },
    prepare({ context }) {
      const title = `Kontext: ${context}`
      return {
        title,
      }
    },
  },
}
