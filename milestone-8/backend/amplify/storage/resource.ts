import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'AnvelosDrive',
  access: (allow) => ({
    'public/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
    'private/${cognitoIdentityId}/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
    ]
  })
});
