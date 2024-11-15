import { defineField, defineType } from "sanity";

export default defineType({
    name: 'teamMember',
    title: 'TeamMember',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string'
        }),
        defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: false,
          })
    ]
})