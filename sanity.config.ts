import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'SmartBuoy',
  title: 'SmartBuoy',
  projectId: 'lovseikl',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})