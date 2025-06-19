import { defineField, defineType } from "sanity";

export default defineType({
    name: 'feature',
    title: 'Feature',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Sub-Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{type: 'block'}]
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
        defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: false,
          })
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
            title: 'title',
            subtitle: 'area'
        }
    }
})