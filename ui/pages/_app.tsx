import '../styles/globals.css'
import '../styles/fonts.css'
import '@tremor/react/dist/esm/tremor.css';
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { UserContextProvider } from '../contexts/userContext'
import Head from 'next/head'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {

  if (typeof window !== 'undefined') {
    window.addEventListener('touchend', _ => {
      window.scrollTo(0, 0)
    });
  }

  useEffect(() => {
    if ("serviceWorker" in navigator && typeof window !== 'undefined') {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])

  return (
    <div className='select-none'>
      <Head>
        <title>Pocketbase Next.js Template</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="images/manifest/icon-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"></meta>
        <meta name="theme-color" content="#FFFFFF"></meta>
        <meta name="description" content="A Template for Pocketbase with Next.js"></meta>
      </Head>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
      <ToastContainer />
    </div>
  )
}

export default MyApp
