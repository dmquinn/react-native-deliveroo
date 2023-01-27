export default {
  name: 'promotions',
  title: 'Promotions',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'promotion name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image Of Promotion',
      type: 'image',
    },
    {
      name: 'category',
      type: 'array',
      title: 'Category',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    },
  ],
}
