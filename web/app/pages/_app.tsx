import '../styles/globals.css'
import '../styles/fonts.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { UserContextProvider } from '../contexts/userContext'
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </UserContextProvider>
  )
}

export default MyApp
