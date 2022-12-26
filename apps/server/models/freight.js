module.exports = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { type: 'string' },
    weight: { type: 'number' },
    destination: { type: 'string' },
    phoneNumber: { type: 'string' },
    email: { type: 'string' },
  },
  required: ['name', 'type', 'weight', 'destination', 'phoneNumber', 'email'],
};
