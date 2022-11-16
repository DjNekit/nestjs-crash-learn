import useSWR from "swr"
import { axiosClient, makeRequest } from "../lib/axios"
import { useRouter } from 'next/router';
import { auth } from "../lib/Auth";

interface AuthOptions {
  redirect?: boolean
}

const fetcher = async (...args: any) => {
  return axiosClient
  //@ts-ignore
    .post(...args, { test: 'test' })
    .then((res: any) => res.data)
}

export function useUser(options?: AuthOptions) {
  const { data, error, mutate } = useSWR('/auth/current-user/', fetcher, {
  
  })
  const router = useRouter()

  if (error && options?.redirect) {
    router.push('/signin')
  }

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}