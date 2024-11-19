import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'
import { documentInternationalization } from '@sanity/document-internationalization'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import {defineField} from 'sanity'

const languages = [{ id: 'en', title: 'English' }, { id: 'de', title: 'Deutsch' }];
const defaultLang = 'en';

export default defineConfig({
  name: 'SmartBuoy',
  title: 'SmartBuoy',
  projectId: 'lovseikl',
  dataset: 'production',
  plugins: [structureTool(), documentInternationalization({
    supportedLanguages: languages,
    schemaTypes: ['feature'],
  }), internationalizedArray({
    languages: languages,
    defaultLanguages: [defaultLang],
    fieldTypes: ['string', defineField({
      name: 'formattedText',
      type: 'array',
      of: [{type: 'block'}]
  })],
  })],
  schema: {
    types: schemaTypes,
  },
  output: 'server'
})