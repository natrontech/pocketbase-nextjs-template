import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PocketBase from 'pocketbase'
import { Toast, ToastType } from '../components/alerts/Toast'
import getConfig from 'next/config'

const { publicRuntimeConfig: config } = getConfig()

export const UserContext = createContext({})

export const useUserContext = () => {
  return useContext(UserContext)
}

type Props = {
  children: ReactNode
}

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [componentLoading, setComponentLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reload, setReload] = useState(false)
  const router = useRouter()
  const pb = new PocketBase(config.ENV_API_URL || 'http://127.0.0.1:8090')

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      if (!pb.authStore.isValid) {
        pb.authStore.clear()
        setUser(null)
        if (!router.pathname.includes('login')) {
          router.push('/login')
        }
      } else {
        await pb
          .collection('users')
          .authRefresh()
          .then(authData => {
            if (authData) {
              setUser(authData.record as unknown)
            } else {
              setUser(null)
              pb.authStore.clear()
            }
          })
          .catch(err => {
            console.log(err)
            pb.authStore.clear()
            setUser(null)
            router.push('/login')
          })
      }
      setLoading(false)
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signInWithEmail = async (username: string, password: string) => {
    setLoading(true)

    await pb.users
      .authViaEmail(username, password)
      .then(data => {
        if (data) {
          setUser(data.user)
          Toast('Logged In', ToastType.success)
        }
      })
      .catch(error => {
        console.log(error)
        setError(error)
        Toast('Login Failed', ToastType.error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const logout = (noalert: boolean | null) => {
    client.authStore.clear()
    setUser(null)
    if (!noalert || noalert === null) {
      Toast('Logged out', ToastType.success)
    }
    router.push('/')
  }

  const contextValue = {
    user,
    loading,
    componentLoading,
    error,
    reload,
    pb,
    setLoading,
    setComponentLoading,
    setReload,
    signInWithEmail,
    logout,
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}
