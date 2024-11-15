import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'
import { documentInternationalization } from '@sanity/document-internationalization'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

const languages = [{ id: 'en', title: 'English' }, { id: 'de', title: 'Deutsch' }];
const defaultLang = 'en';

export default defineConfig({
  name: 'SmartBuoy',
  title: 'SmartBuoy',
  projectId: 'lovseikl',
  dataset: 'production',
  plugins: [structureTool(), documentInternationalization({
    supportedLanguages: languages,
    schemaTypes: ['teamMember'],
  }), internationalizedArray({
    languages: languages,
    defaultLanguages: [defaultLang],
    fieldTypes: ['string'],
  })],
  schema: {
    types: schemaTypes,
  },
  output: 'server'
})