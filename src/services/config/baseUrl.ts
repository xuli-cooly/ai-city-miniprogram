import { baseUrlMap } from './apiMap'

const getBaseUrl = (url: string) => {
  const apiBaseUrl = baseUrlMap[process.env.API_ENV]
  return apiBaseUrl + url
}

export default getBaseUrl
