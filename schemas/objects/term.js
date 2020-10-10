export default {
  title: 'Sprache',
  name: 'term',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'preferredTerm',
      title: 'Hauptbegriff',

    },
   {
      type: 'blockContent',
      name: 'definition',
      title: 'Definition',
      description: 'Die Definition soll so kurz wie möglich und so ausführlich wie nötig sein',
    },
  /*    {
      type: 'blockContent',
      name: 'source',
      title: 'Quelle',
    }, */
    {
      type: 'array',
      name: 'additionnalFields',
      title: 'Weitere Felder',
      description: 'Kontext, Anmerkung, Abkürzung, usw.',
      of: [{type: 'context' }, {type: 'notice'}, {type: 'abbreviation'}]
    },

    {
      type: 'array',
      name: 'variants',
      title: 'Alternative Begriffe',
      of: [{ type: 'variant' }],
    },
  ],
}
