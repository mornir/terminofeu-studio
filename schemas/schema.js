// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Import documents
import entry from './documents/entry'

// Import objects
import term from './objects/term'
import blockContent from './objects/blockContent'
import variant from './objects/variant'
import context from './objects/context'
import notice from './objects/notice'
import abbreviation from './objects/abbreviation'
import definition from './objects/definition'
import illustration from './objects/illustration'
import lang from './objects/lang'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    blockContent,
    variant,
    context,
    notice,
    definition,
    abbreviation,
    illustration,
    lang,
    term,
    entry,
  ]),
})
