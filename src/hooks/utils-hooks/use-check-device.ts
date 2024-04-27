import { useLayoutEffect, useState } from 'react'

const queries = ['(max-width: 999.7px)', '(min-width: 1000px)']

interface DeviceType {
  isMobile: boolean
  isDesktop: boolean
}

export const useCheckDevice = (): DeviceType => {
  const mediaQueryLists = queries.map((query) => matchMedia(query))

  const getValues = () => mediaQueryLists.map((list) => list.matches)

  const [values, setValues] = useState(getValues)

  useLayoutEffect(() => {
    const handler = () => setValues(getValues)

    mediaQueryLists.forEach((list) => list.addEventListener('change', handler))

    return () => mediaQueryLists.forEach((list) => list.removeEventListener('change', handler))
  }, [])

  return ['isMobile', 'isDesktop'].reduce(
    (acc, screen, index) => ({
      ...acc,
      [screen]: values[index],
    }),
    {} as DeviceType
  )
}
