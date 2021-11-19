export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const setToken = (token) => {
  window.localStorage.setItem('token', token)
}

export const removeToken = () => {
  window.localStorage.removeItem('token')
}

export const getPayload = () => {
  const token = getToken()
  if (!token) return
  const splitToken = token.split('.')
  return JSON.parse(atob(splitToken[1]))
}

export const getUserId = () => {
  const payload = getPayload()
  return payload && payload.sub
}