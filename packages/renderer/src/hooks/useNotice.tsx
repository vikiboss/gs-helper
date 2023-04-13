import React, { useState } from 'react'

import Alert from '@/components/Alert'

import type { AlertProp } from '@/components/Alert'
import type { ReactElement } from 'react'

export interface AlertOptions {
  autoHide?: boolean
  duration?: number
  message: string
  type?: AlertProp['type']
}

export interface Notice {
  failed: (options: AlertOptions | string) => void
  info: (options: AlertOptions | string) => void
  show: (options: AlertOptions | string) => void
  success: (options: AlertOptions | string) => void
  warning: (options: AlertOptions | string) => void
  hide: () => void
  holder: ReactElement<AlertProp, any>
}

const useNotice = (): Notice => {
  const [aMessage, setAMessage] = useState<string>('')
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [aType, setAType] = useState<AlertProp['type']>('info')
  const [visible, setVisible] = useState<boolean>(false)

  const showAlert = (options: AlertOptions) => {
    const { duration = 3000, type = 'info', message, autoHide = true } = options

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
    show(options: AlertOptions) {
      showAlert(options)
    },
    hide() {
      setVisible(false)
    },
    info(options: AlertOptions | string) {
      if (typeof options === 'string') {
        options = { message: options }
      }
      showAlert({ ...options, type: 'info' })
    },
    warning(options: AlertOptions | string) {
      if (typeof options === 'string') {
        options = { message: options }
      }
      showAlert({ ...options, type: 'warning' })
    },
    success(options: AlertOptions | string) {
      if (typeof options === 'string') {
        options = { message: options }
      }
      showAlert({ ...options, type: 'success' })
    },
    failed(options: AlertOptions | string) {
      if (typeof options === 'string') {
        options = { message: options }
      }
      showAlert({ ...options, type: 'failed' })
    },
    holder: <Alert visible={visible} type={aType} message={aMessage} />
  }
}

export default useNotice
