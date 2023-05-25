import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import category from './schemas/category'
import overview from './schemas/overview'
import resource from './schemas/resource'
import question from './schemas/question'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [overview, resource, question, category, blockContent],
}
