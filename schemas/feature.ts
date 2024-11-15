import { defineField, defineType } from "sanity";

export default defineType({
    name: 'feature',
    title: 'Feature',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'internationalizedArrayString',
        }),
    ]
})