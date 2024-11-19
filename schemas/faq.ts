import { defineField, defineType } from "sanity";

export default defineType({
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string'
        }),
        defineField({
            name: 'question',
            title: 'Question',
            type: 'internationalizedArrayString',
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
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
    ]
})