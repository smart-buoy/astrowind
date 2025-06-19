import { defineField, defineType } from "sanity";

export default defineType({
    name: 'highlight',
    title: 'Highlight',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string'
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'internationalizedArrayString',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'internationalizedArrayString',
        }),
        defineField({
            name: 'area',
            title: 'Area',
            type: 'string',
            initialValue: 'skipper',
            options: {
                list: [
                    {title: 'Skipper', value: 'skipper'},
                    {title: 'Operator', value: 'operator'},
                ]
            }
        }),
        defineField({
            title: 'Order',
            name: 'order',
            type: 'number'
          }),
    ],
    orderings: [
        {
            title: 'Order',
            name: 'orderAsc',
            by: [
              {field: 'order', direction: 'asc'}
            ]
          } 
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'area'
        }
    }
})