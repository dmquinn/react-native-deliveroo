export default {
  name: 'item',
  title: 'Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of item',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'brand',
      type: 'string',
      title: 'Name of brand',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price of the item in EUR',
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Enter a Rating from (1-5 stars)',
      validation: (Rule) =>
        Rule.required().min(1).max(5).error('Please enter a value between 1 and 5'),
    },
    {
      name: 'quantity',
      type: 'number',
      title: 'Enter a Quantity in Stock from (0-1000)',
      validation: (Rule) =>
        Rule.required().min(0).max(1000).error('Please enter a value between 1 and 1000'),
    },
    {
      name: 'type',
      title: 'Category',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'promotion',
      title: 'Promotion',
      type: 'reference',
      to: [{type: 'promotions'}],
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the Item',
    },
  ],
}
