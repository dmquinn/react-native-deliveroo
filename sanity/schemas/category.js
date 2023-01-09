export default {
  name: 'category',
  title: 'Clothing Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image Of Category',
      type: 'image',
    },
  ],
}
