import axios, { AxiosResponse } from "axios";

type ResType = {
  accessToken: string
  refreshToken: string
}

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
})

axiosClient.interceptors.response.use(undefined, async (error) => {
  const { url, method, data } = error.config
  const parsedData = JSON.parse(data)

  if (error.response.status !== 401) {
    return Promise.reject(error);
  }

  const res = await axios.post<null, AxiosResponse<ResType>>('/api/refresh', { withCredentials: true })
  const { accessToken } = res.data

  if (!accessToken) {
    return Promise.reject()
  }
  const bearer = `Bearer ${accessToken}`
  axiosClient.defaults.headers.Authorization = bearer

  const retryFailedRequest = await axiosClient[method as Method](url, parsedData)
  return Promise.resolve(retryFailedRequest);
})


