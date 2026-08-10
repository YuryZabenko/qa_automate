export const productListSchema = {
  type: 'object',
  properties: {
    responseCode: { type: 'number' },
    products: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          price: { type: 'string' },
          brand: { type: 'string' },
          category: {
            type: 'object',
            properties: {
              usertype: {
                type: 'object',
                properties: {
                  usertype: { type: 'string' },
                },
                required: ['usertype'],
              },
              category: { type: 'string' },
            },
            required: ['usertype', 'category'],
          },
        },
        required: ['id', 'name', 'price', 'brand', 'category'],
      },
    },
  },
  required: ['responseCode', 'products'],
};

export const brandsListSchema = {
  type: 'object',
  properties: {
    responseCode: { type: 'number' },
    brands: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          brand: { type: 'string' },
        },
        required: ['id', 'brand'],
      },
    },
  },
  required: ['responseCode', 'brands'],
};

export const userDetailSchema = {
  type: 'object',
  properties: {
    responseCode: { type: 'number' },
    user: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        title: { type: 'string' },
        birth_day: { type: 'string' },
        birth_month: { type: 'string' },
        birth_year: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        company: { type: 'string' },
        address1: { type: 'string' },
        address2: { type: 'string' },
        country: { type: 'string' },
        state: { type: 'string' },
        city: { type: 'string' },
        zipcode: { type: 'string' },
      },
      required: [
        'id',
        'name',
        'email',
        'title',
        'birth_day',
        'birth_month',
        'birth_year',
        'first_name',
        'last_name',
        'company',
        'address1',
        'address2',
        'country',
        'state',
        'city',
        'zipcode',
      ],
    },
  },
  required: ['responseCode', 'user'],
};
