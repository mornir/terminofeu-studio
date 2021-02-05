// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Import documents
import entry from './documents/entry'
import source from './documents/source'
/* import domain from './documents/domain' */

// Import objects
import blockContent from './objects/blockContent'
import term from './objects/term'
import illustration from './objects/illustration'
import definition from './objects/definition'
import note from './objects/note'
import approval from './objects/approval'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    blockContent,
    illustration,
    approval,
    note,
    definition,
    source,
    term,
    /*  domain, */
    entry,
  ]),
})
