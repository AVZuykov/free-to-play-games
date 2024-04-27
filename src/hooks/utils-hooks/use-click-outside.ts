import { useEffect } from 'react'

export const useClickOutside = (element: HTMLElement | null, callback: () => void) => {
  const handleClick = (evt: MouseEvent) => {
    if (element && !element.contains(evt.target as HTMLElement)) {
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}
