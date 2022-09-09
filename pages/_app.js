// このファイルの中に書かれていることが全ページに適用される
import "../styles/globals.css"; // 全ページにglobl.cssに書いたスタイルが適用されます

import Head from "next/head";
import React from 'react'

import { GA_ID, existsGaId } from '../src/lib/gtag'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        {/* Google Analytics */}
        {existsGaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
              }}
            />
          </>
        )}
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default App