import Axios, { AxiosResponseHeaders } from "axios";

type ResType = {
  data: {
    accessToken: string
    refreshToken: string
  }
  headers: AxiosResponseHeaders
}

export const makeRequest = () => {
  // if (typeof window === 'undefined') {
  //   return axiosServer
  // }
  return axiosClient
}

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export const axiosClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
})

axiosClient.interceptors.response.use(undefined, async (error) => {
  const { url, method, data } = error.config
  const parsedData = JSON.parse(data)

  if (url === '/auth/refresh-tokens' || error.response.status !== 401) {
    return Promise.reject(error);
  }

  const res = await axiosClient.post<null, ResType>('/auth/refresh-tokens')
  const { accessToken } = res.data
  const bearer = `Bearer ${accessToken}`
  axiosClient.defaults.headers.Authorization = bearer

  const retryFailedRequest = await axiosClient[method as Method](url, parsedData)
  return Promise.resolve(retryFailedRequest);
})


