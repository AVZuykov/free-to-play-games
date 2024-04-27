import { AxiosError } from 'axios'

import { useApi } from '@providers'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  const api = useApi()

  async function mutationFn() {
    try {
      console.log(api, 'sdfs')
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.status === 401) {
        console.log(error)
      }
      return Promise.reject('Unauthorized')
    }
  }

  const { mutate, ...rest } = useMutation({
    mutationKey: ['login'],
    mutationFn,
  })

  return { login: mutate, mutate, ...rest }
}
