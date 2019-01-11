function configureAuthHeader(token: string) {
  return { headers: { Authorization: `Bearer ${token}`}}
}

export {
  configureAuthHeader
}