import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul className="list-disc">
        <li
          className="text-primary hover:text-primary-dark cursor-pointer"
        >
          <a href="/_/">PocketBase Login</a>
        </li>
        <li
          className="text-primary hover:text-primary-dark cursor-pointer"
        >
          <Link href="/info">Info</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
