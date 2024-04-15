import { useRef } from 'react'

function useInitialMount(callback) {
  const isInitialMountRef = useRef(true)

  if (isInitialMountRef.current) {
    isInitialMountRef.current = false
    if (typeof callback === 'function') {
      callback()
    }
  }
}

export default useInitialMount
