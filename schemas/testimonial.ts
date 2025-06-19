import { defineField, defineType } from "sanity";

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string'
        }),
        defineField({
            name: 'text',
            title: 'Text',
            type: 'internationalizedArrayString',
        }),
        defineField({
            name: 'position',
            title: 'Position',
            type: 'internationalizedArrayString',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                accept: 'image/jpeg'
            }
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
        },
    }
})