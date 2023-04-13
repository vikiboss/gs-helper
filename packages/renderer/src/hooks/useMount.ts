import { useEffect } from 'react'

/**
 * @from https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useMount/index.ts
 */
const useMount = (func: () => void, callback?: () => void) => {
  useEffect(() => {
    func()

    if (callback) {
      return callback
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useMount
