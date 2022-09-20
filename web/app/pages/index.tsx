import type { NextPage } from 'next'
import getConfig from 'next/config';
import Link from 'next/link'
import Login from '../components/landingpage/Login';

const { publicRuntimeConfig: config } = getConfig();

const Home: NextPage = () => {
  const pb_admin_url = config.ENV_API_URL + '/_/';

  return (
    <div
      className="h-screen"
    >
      {/* <h1>Home</h1>
      <ul className="list-disc">
        <li
          className="text-primary hover:text-primary-dark cursor-pointer"
        >
          <a href={pb_admin_url}>PocketBase Login</a>
        </li>
        <li
          className="text-primary hover:text-primary-dark cursor-pointer"
        >
          <Link href="/info">Info</Link>
        </li>
      </ul> */}
      <Login />
    </div>
  )
}

export default Home
