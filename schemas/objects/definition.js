export default {
  type: 'object',
  name: 'definition',
  title: 'Definition',
  options: {
    collapsible: true, // Makes the whole fieldset collapsible
    collapsed: true, // Defines if the fieldset should be collapsed by default or not
  },
  fields: [
    {
      type: 'blockContent',
      name: 'definition',
      title: 'Definition',
      description: 'Die Definition soll so kurz wie möglich und so ausführlich wie nötig sein',
    },
   {
      type: 'blockContent',
      name: 'source',
      title: 'Quelle',
    }, 
  ]
}