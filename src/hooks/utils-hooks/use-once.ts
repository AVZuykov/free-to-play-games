import { EffectCallback, useEffect } from 'react'

export const useOnce = (callBack: EffectCallback) => {
  useEffect(callBack, [])
}
