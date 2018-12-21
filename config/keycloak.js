module.exports = {
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    bearerOnly: true,
    serverUrl: 'https://id.brewtools.org/auth',
    realm: 'Brewtools',
    realmPublicKey: process.env.KEYCLOAK_REALM_PUBLIC_KEY
}