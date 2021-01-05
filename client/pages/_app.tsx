import React from 'react'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import { Navbar } from 'components/Navbar'

type Props = {
  Component: any
  pageProps: any
}

const queryClient = new QueryClient()

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <div>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
