import { useEffect, useRef } from 'react'

import { InitializationTarget } from 'overlayscrollbars'
import { OverlayScrollbarsComponentProps, useOverlayScrollbars } from 'overlayscrollbars-react'

import { useCheckDevice } from '@hooks'

interface ScrollbarHookParams {
  scrollOptions?: OverlayScrollbarsComponentProps['options']
  onlyDesktop?: boolean
  deps?: unknown[]
}

export const useScrollbar = ({ scrollOptions, onlyDesktop = false, deps = [] }: ScrollbarHookParams = {}) => {
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const [initialize, instance] = useOverlayScrollbars({
    options: { scrollbars: { autoHide: 'never', theme: 'os-theme-light' }, ...scrollOptions },
  })
  const { isDesktop } = useCheckDevice()

  useEffect(() => {
    if (scrollbarRef.current) {
      if (!isDesktop && onlyDesktop) {
        instance()?.destroy()
      } else {
        initialize(scrollbarRef.current as InitializationTarget)
      }
    }
    return () => {
      instance()?.destroy()
    }
  }, [isDesktop, initialize, ...deps])

  return scrollbarRef
}
