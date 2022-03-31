
import { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { NextPage } from 'next'
import { ReactElement, ReactNode, useState } from 'react'
import '../styles/globals.css'

const fiveMinutes = 60_000 * 5

export type NextPageWithLayout<T = unknown> = NextPage<T> & {
  getLayout?: (page: ReactElement, pageProps: any) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = (ctx: AppPropsWithLayout) => {
  const { Component, pageProps } = ctx
  const getLayout = Component.getLayout || ((page) => page)

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: fiveMinutes,
        // setting it so that data is always fetched every refetchInterval
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchIntervalInBackground: true,
        refetchOnReconnect: 'always',
        staleTime: 0, // data will always be considered stale
      },
    },
  }))

  return getLayout(
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="top-right" />
      </QueryClientProvider>
    </>,
    pageProps,
  )
}

export default MyApp

