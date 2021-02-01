import React from 'react'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import 'tailwindcss/tailwind.css'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import 'index.css'
import 'styles/globals.css'
import { Navbar } from 'components/nav/Navbar'

type Props = {
  Component: any
  pageProps: any
}

const queryClient = new QueryClient()
const stripePromise = loadStripe(
  'pk_test_51I8oOgHriYKyqLYTz2FfWxQCfoxy5ZU7oR3JGXdJoc48f4QHg5TNTjiydtRLDSADyiN7BEHf6bF45cAxjc1IpsKM00UjC6YfvF',
)

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <title>Shop</title>
        </Head>
        <div>
          <Elements stripe={stripePromise}>
            <Navbar />
            <Component {...pageProps} />
          </Elements>
        </div>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
