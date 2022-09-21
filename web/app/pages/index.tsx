import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Login from '../components/landingpage/Login';
import { useUserContext } from '../contexts/userContext';

const Home: NextPage = () => {

  const {user, loading}: any = useUserContext();
  const router = useRouter();

  if (user && !loading) {
    router.push('/info');
  }

  return (
    <div
      className="h-screen"
    >
      <Login />
    </div>
  )
}

export default Home
