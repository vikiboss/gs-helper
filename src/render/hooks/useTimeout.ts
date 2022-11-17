import { useCallback, useEffect, useRef } from 'react'
import useLatest from './useLatest'

/**
 * @from https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useTimeout/index.ts
 */
function useTimeout(fn: () => void, delay: number | undefined) {
  const fnRef = useLatest(fn)
  const timerRef = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    if (typeof delay !== 'number' || delay < 0) {
      return
    }

    timerRef.current = setTimeout(() => {
      fnRef.current()
    }, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay])

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [])

  return clear
}

export default useTimeout
