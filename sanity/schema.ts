import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import category from './schemas/category'
import overview from './schemas/overview'
import resource from './schemas/resource'
import question from './schemas/question'
import quote from './schemas/quote'
import pictoImage from './schemas/pictoImage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [overview, resource, question, quote, category, pictoImage, blockContent],
}
