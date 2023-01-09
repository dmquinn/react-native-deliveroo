export default {
  name: 'clothingItem',
  title: 'clothingItem',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of item',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price of the item in EUR',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the item',
    },
  ],
}
