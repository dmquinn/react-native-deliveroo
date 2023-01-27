export default {
  name: 'warehouse',
  title: 'Warehouse',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Warehouse name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the Warehouse',
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Latitude of the Warehouse',
    },
    {
      name: 'long',
      type: 'number',
      title: 'Longitude of the Warehouse',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Warehouse address',
      validation: (Rule) => Rule.required(),
    },
  ],
}
