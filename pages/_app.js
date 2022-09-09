import "../styles/globals.css";
import React from 'react'

import GoogleAnalytics from '../src/components/GoogleAnalytics'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GoogleAnalytics />

      <Component {...pageProps} />
    </>
  )
}

export default App