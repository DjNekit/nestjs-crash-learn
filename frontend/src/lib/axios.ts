import Axios, { AxiosResponseHeaders } from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import * as cookie from 'cookie'
import * as setCookie from 'set-cookie-parser'

type ResType = {
  data: {
    accessToken: string
    refreshToken: string
  }
  headers: AxiosResponseHeaders
}

export const axiosInstance = Axios.create({
  baseURL: '/',
  withCredentials: true
})

const refreshAuthLogic = async (failedRequest: any) => {
  const tokenRefreshResponse = await axiosInstance.post<null, ResType>('/api/refresh')
  
  if (axiosInstance.defaults.headers.setCookie) {
    delete axiosInstance.defaults.headers.setCookie
  }

  const { accessToken } = tokenRefreshResponse.data
  const bearer = `Bearer ${accessToken}`
  axiosInstance.defaults.headers.Authorization = bearer

  const refreshCookieString = tokenRefreshResponse.headers['set-cookie']?.[0] as string
  const responseCookie = setCookie.parse(refreshCookieString)[0]

  axiosInstance.defaults.headers.setCookie = tokenRefreshResponse.headers['set-cookie']!
  axiosInstance.defaults.headers.cookie = cookie.serialize(
    responseCookie.name,
    responseCookie.value,
  )

  failedRequest.response.config.headers.Authorization = bearer
  return Promise.resolve()
}

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic)
