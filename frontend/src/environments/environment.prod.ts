export const environment = {
  production: true,
  msalConfig: {
    auth: {
      clientId: '',
      clientSecret: '',
      tenantId: '',
      redirectUri: 'http://localhost:4200'
    }
  },
  msalRequest: {
    scopes: [
      'user.read'
    ]
  }

};