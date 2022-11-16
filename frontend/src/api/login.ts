import axios from "axios"

interface Credentials {
  email: string
  password: string
}

export const login = async (credentials: Credentials) => {
  // const res = await axios.post('/api/signin', credentials)
  // console.log(res)
}