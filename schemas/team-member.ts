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
            name: 'position',
            title: 'Position',
            type: 'internationalizedArrayString',
        }),
        defineField({
            name: 'description',
            title: 'Description',
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
            title: 'Order',
            name: 'order',
            type: 'number'
        }),
        defineField({
            name: 'socialX',
            title: 'X-Link',
            type: 'string'
        }),
        defineField({
            name: 'socialFacebook',
            title: 'Facebook-Link',
            type: 'string'
        }),
        defineField({
            name: 'socialInstagram',
            title: 'Instagram-Link',
            type: 'string'
        }),
        defineField({
            name: 'socialLinkedIn',
            title: 'LinkedIn-Link',
            type: 'string'
        }),
    ],
    orderings: [
        {
            title: 'Order',
            name: 'orderAsc',
            by: [
                { field: 'order', direction: 'asc' }
            ]
        }
    ]
})