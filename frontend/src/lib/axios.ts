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

export const makeRequest = () => {
  if (typeof window === 'undefined') {
    return axiosServer
  }
  return axiosClient
}

export const axiosClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/json',
  // }
})
export const axiosServer = Axios.create({
  baseURL: process.env.API,
  withCredentials: true
})

const refreshAuthLogic = async (failedRequest: any) => {
  const tokenRefreshResponse = await axiosClient.post<null, ResType>('/api/refresh')
  
  if (axiosClient.defaults.headers.setCookie) {
    delete axiosClient.defaults.headers.setCookie
  }

  const { accessToken } = tokenRefreshResponse.data
  const bearer = `Bearer ${accessToken}`
  axiosClient.defaults.headers.Authorization = bearer

  const refreshCookieString = tokenRefreshResponse.headers['set-cookie']?.[0] as string
  const responseCookie = setCookie.parse(refreshCookieString)[0]

  axiosClient.defaults.headers.setCookie = tokenRefreshResponse.headers['set-cookie']!
  axiosClient.defaults.headers.cookie = cookie.serialize(
    responseCookie.name,
    responseCookie.value,
  )

  failedRequest.response.config.headers.Authorization = bearer
  return Promise.resolve()
}

createAuthRefreshInterceptor(axiosClient, refreshAuthLogic)
createAuthRefreshInterceptor(axiosServer, refreshAuthLogic)
