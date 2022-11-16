import axios from "axios"
import { axiosClient } from "../lib/axios"

interface Credentials {
  email: string
  password: string
}

export const login = async (credentials: Credentials) => {
  const res = await axios.post('/api/signin', credentials)
  const { accessToken } = res.data
  const bearer = `Bearer ${accessToken}`
  axiosClient.defaults.headers.Authorization = bearer
}