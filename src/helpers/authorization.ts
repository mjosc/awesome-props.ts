// A helper method providing the authorization header expected
// by axios as the config parameter.
function configureAuthHeader(token: string) {
  return { headers: { Authorization: `Bearer ${token}`}}
}

export {
  configureAuthHeader
}