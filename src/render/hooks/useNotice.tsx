import React, { useState } from 'react'

import Alert from '../components/Alert'

import type { ReactElement } from 'react'
import type { AlertProp } from '../components/Alert'

export interface AlertOptions {
  autoHide?: boolean
  duration?: number
  message: string
  type?: AlertProp['type']
}

export interface Notice {
  show: (optons: AlertOptions | string) => void
  hide: () => void
  info: (optons: AlertOptions | string) => void
  warning: (optons: AlertOptions | string) => void
  success: (optons: AlertOptions | string) => void
  faild: (optons: AlertOptions | string) => void
  holder: ReactElement<AlertProp, any>
}

const useNotice = (): Notice => {
  const [aMessage, setAMessage] = useState<string>('')
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [aType, setAType] = useState<AlertProp['type']>('info')
  const [visible, setVisible] = useState<boolean>(false)

  const showAlert = (optons: AlertOptions) => {
    const { duration = 3000, type = 'info', message, autoHide = true } = optons

    setAType(type)
    setAMessage(message)
    setVisible(true)

    if (timer) {
      clearTimeout(timer)
    }

    if (!autoHide) {
      return
    }

    setTimer(setTimeout(() => setVisible(false), duration))
  }

  return {
    show (optons: AlertOptions) {
      showAlert(optons)
    },
    hide () {
      setVisible(false)
    },
    info (optons: AlertOptions | string) {
      if (typeof optons === 'string') {
        optons = { message: optons }
      }
      showAlert({ ...optons, type: 'info' })
    },
    warning (optons: AlertOptions | string) {
      if (typeof optons === 'string') {
        optons = { message: optons }
      }
      showAlert({ ...optons, type: 'warning' })
    },
    success (optons: AlertOptions | string) {
      if (typeof optons === 'string') {
        optons = { message: optons }
      }
      showAlert({ ...optons, type: 'success' })
    },
    faild (optons: AlertOptions | string) {
      if (typeof optons === 'string') {
        optons = { message: optons }
      }
      showAlert({ ...optons, type: 'faild' })
    },
    holder: <Alert visible={visible} type={aType} message={aMessage} />
  }
}

export default useNotice
