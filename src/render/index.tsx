import React from 'react'
import { createRoot } from 'react-dom/client'

import AuthProvider from './auth/AuthProvider'
import WinFrame from './components/WinFrame'
import './index.less'
import AppRouter from './router'
import nativeApi from './utils/nativeApi'

const root = createRoot(document.getElementById('app')!)

const render = async () => {
  const { zhName, version, isBeta } = await nativeApi.getAppInfo()
  const isLogin = Boolean(await nativeApi.getStoreKey('currentUid'))

  root.render(
    <WinFrame title={`${zhName} v${version} ${isBeta ? 'Beta' : ''}`}>
      <AuthProvider isLogin={isLogin}>
        <AppRouter />
      </AuthProvider>
    </WinFrame>
  )
}

render()
