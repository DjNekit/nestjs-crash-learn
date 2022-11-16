import { AxiosResponse } from "axios";
import useSWR from "swr"
import { useRouter } from 'next/router';
import { axiosClient } from "../lib/axios"

interface AuthOptions {
  redirect?: boolean
}

const fetcher = async (url: string) => {
  return axiosClient
    .post(url)
    .then((res: AxiosResponse) => res.data)
}

export function useUser(options?: AuthOptions) {
  const { data, error, mutate } = useSWR('/auth/current-user/', fetcher, {
    shouldRetryOnError: false
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