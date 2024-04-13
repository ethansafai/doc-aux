import { useRef } from 'react'

function useInitialMount(callback) {
  const isInitialMountRef = useRef(true)

  if (isInitialMountRef.current) {
    isInitialMountRef.current = false
    callback()
  }
}

export default useInitialMount
