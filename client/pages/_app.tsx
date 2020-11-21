import React from 'react'

type Props = {
  Component: any
  pageProps: any
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
