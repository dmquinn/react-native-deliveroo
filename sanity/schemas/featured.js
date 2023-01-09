export default {
  name: 'featured',
  title: 'Featured',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Featured Category name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'clothingItem',
      type: 'array',
      title: 'Clothing Item',
      of: [{type: 'reference', to: [{type: 'clothingItem'}]}],
    },
  ],
}
