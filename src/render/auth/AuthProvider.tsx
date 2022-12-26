import React from 'react'

import useMount from '../hooks/useMount'
import nativeApi from '../utils/nativeApi'
import AuthContext from './AuthContext'

const { Provider } = AuthContext

type AuthProviderProp = {
  children: React.ReactNode
  isLogin: boolean
}

export default function AuthProvider(props: AuthProviderProp) {
  const { children, isLogin: logged } = props
  const [isLogin, setIsLogin] = React.useState<boolean>(logged)

  const login = () => setIsLogin(true)

  const logout = async (uid?: string, isClear = false) => {
    setIsLogin(false)

    if (isClear) {
      return
    }

    if (uid) {
      nativeApi.deleteUser(uid)
    } else {
      nativeApi.setStoreKey('currentUid', '')
    }
  }

  useMount(() => {
    ;(async () => {
      const uid = await nativeApi.getStoreKey('currentUid')
      const hasUid = Boolean(uid)
      ;(hasUid ? login : logout)()
    })()
  })

  return <Provider value={{ isLogin, login, logout }}>{children}</Provider>
}
