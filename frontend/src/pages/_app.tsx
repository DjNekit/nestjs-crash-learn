import { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const defaultPage = (page: ReactElement) => page
  const getLayout = Component.getLayout ?? defaultPage;
  
  return (
    <ChakraProvider>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}
