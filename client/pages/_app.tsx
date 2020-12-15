import React from 'react'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

type Props = {
  Component: any
  pageProps: any
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
