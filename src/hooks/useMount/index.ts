import { useEffect } from 'preact/compat'
import isFunction from '@/utils/isFunction'
/*
 *页面渲染完成时
 */
const useMount = (fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    if (!isFunction(fn)) {
      console.error(`useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`)
    }
  }

  useEffect(() => {
    fn?.()
  }, [])
}

export default useMount
